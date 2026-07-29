using System.Diagnostics;
using System.Globalization;
using System.Text;
using System.Text.RegularExpressions;
using Application.Dtos;
using Application.Interfaces;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;

namespace OnlineShop.Infrastructure.Services
{
    public class PostgresBackupService : IBackupService
    {
        private static readonly Regex SafeFileNameRegex = new(
            @"^backup_\d{8}_\d{6}\.sql$",
            RegexOptions.Compiled | RegexOptions.CultureInvariant);

        private readonly string _connectionString;
        private readonly string _backupDirectory;
        private readonly string _pgDumpPath;
        private readonly ILogger<PostgresBackupService> _logger;

        public PostgresBackupService(
            IConfiguration configuration,
            ILogger<PostgresBackupService> logger)
        {
            _logger = logger;
            _connectionString = configuration.GetConnectionString("DefaultConnection")
                ?? throw new InvalidOperationException("Connection string 'DefaultConnection' is missing.");

            var configuredDir = configuration["Backup:Directory"];
            _backupDirectory = string.IsNullOrWhiteSpace(configuredDir)
                ? Path.Combine(AppContext.BaseDirectory, "backups")
                : Path.GetFullPath(configuredDir);

            _pgDumpPath = configuration["Backup:PgDumpPath"] ?? "pg_dump";

            Directory.CreateDirectory(_backupDirectory);
        }

        public async Task<BackupFileDto> CreateAsync(CancellationToken cancellationToken = default)
        {
            var settings = ParseConnectionString(_connectionString);
            var fileName = $"backup_{DateTime.UtcNow:yyyyMMdd_HHmmss}.sql";
            var filePath = Path.Combine(_backupDirectory, fileName);

            var args = new StringBuilder();
            args.Append($"--host={EscapeArg(settings.Host)} ");
            args.Append($"--port={settings.Port} ");
            args.Append($"--username={EscapeArg(settings.Username)} ");
            args.Append($"--dbname={EscapeArg(settings.Database)} ");
            args.Append("--format=plain ");
            args.Append("--no-owner ");
            args.Append("--no-acl ");
            args.Append($"--file={EscapeArg(filePath)}");

            var startInfo = new ProcessStartInfo
            {
                FileName = _pgDumpPath,
                Arguments = args.ToString(),
                RedirectStandardError = true,
                RedirectStandardOutput = true,
                UseShellExecute = false,
                CreateNoWindow = true,
            };
            startInfo.Environment["PGPASSWORD"] = settings.Password;

            using var process = new Process { StartInfo = startInfo };

            try
            {
                if (!process.Start())
                    throw new InvalidOperationException("Failed to start pg_dump process.");
            }
            catch (Exception ex) when (ex is not InvalidOperationException)
            {
                throw new InvalidOperationException(
                    "pg_dump was not found. Install PostgreSQL client tools or set Backup:PgDumpPath.",
                    ex);
            }

            var stderrTask = process.StandardError.ReadToEndAsync(cancellationToken);
            var stdoutTask = process.StandardOutput.ReadToEndAsync(cancellationToken);

            await process.WaitForExitAsync(cancellationToken);
            var stderr = await stderrTask;
            _ = await stdoutTask;

            if (process.ExitCode != 0)
            {
                if (File.Exists(filePath))
                    File.Delete(filePath);

                _logger.LogError("pg_dump failed with exit code {ExitCode}: {Error}", process.ExitCode, stderr);
                throw new InvalidOperationException(
                    string.IsNullOrWhiteSpace(stderr)
                        ? $"pg_dump failed with exit code {process.ExitCode}."
                        : stderr.Trim());
            }

            var info = new FileInfo(filePath);
            return new BackupFileDto
            {
                FileName = fileName,
                SizeBytes = info.Length,
                CreatedAtUtc = info.CreationTimeUtc,
            };
        }

        public Task<IReadOnlyList<BackupFileDto>> ListAsync(CancellationToken cancellationToken = default)
        {
            cancellationToken.ThrowIfCancellationRequested();

            var items = Directory.EnumerateFiles(_backupDirectory, "backup_*.sql")
                .Select(path => new FileInfo(path))
                .Where(info => SafeFileNameRegex.IsMatch(info.Name))
                .OrderByDescending(info => info.CreationTimeUtc)
                .Select(info => new BackupFileDto
                {
                    FileName = info.Name,
                    SizeBytes = info.Length,
                    CreatedAtUtc = info.CreationTimeUtc,
                })
                .ToList();

            return Task.FromResult<IReadOnlyList<BackupFileDto>>(items);
        }

        public Task<(Stream Stream, string ContentType, string FileName)?> OpenDownloadAsync(
            string fileName,
            CancellationToken cancellationToken = default)
        {
            cancellationToken.ThrowIfCancellationRequested();

            if (!TryResolveSafePath(fileName, out var filePath) || !File.Exists(filePath))
                return Task.FromResult<(Stream, string, string)?>(null);

            Stream stream = new FileStream(
                filePath,
                FileMode.Open,
                FileAccess.Read,
                FileShare.Read,
                bufferSize: 81920,
                options: FileOptions.Asynchronous | FileOptions.SequentialScan);

            return Task.FromResult<(Stream, string, string)?>(
                (stream, "application/sql", Path.GetFileName(filePath)));
        }

        public Task<bool> DeleteAsync(string fileName, CancellationToken cancellationToken = default)
        {
            cancellationToken.ThrowIfCancellationRequested();

            if (!TryResolveSafePath(fileName, out var filePath) || !File.Exists(filePath))
                return Task.FromResult(false);

            File.Delete(filePath);
            return Task.FromResult(true);
        }

        private bool TryResolveSafePath(string fileName, out string filePath)
        {
            filePath = string.Empty;
            if (string.IsNullOrWhiteSpace(fileName))
                return false;

            var name = Path.GetFileName(fileName);
            if (!SafeFileNameRegex.IsMatch(name))
                return false;

            filePath = Path.Combine(_backupDirectory, name);
            var fullPath = Path.GetFullPath(filePath);
            var fullDir = Path.GetFullPath(_backupDirectory)
                .TrimEnd(Path.DirectorySeparatorChar, Path.AltDirectorySeparatorChar)
                + Path.DirectorySeparatorChar;

            return fullPath.StartsWith(fullDir, StringComparison.OrdinalIgnoreCase)
                || string.Equals(Path.GetDirectoryName(fullPath), Path.GetFullPath(_backupDirectory), StringComparison.OrdinalIgnoreCase);
        }

        private static ConnectionSettings ParseConnectionString(string connectionString)
        {
            var parts = connectionString
                .Split(';', StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries)
                .Select(part => part.Split('=', 2, StringSplitOptions.TrimEntries))
                .Where(pair => pair.Length == 2)
                .ToDictionary(pair => pair[0], pair => pair[1], StringComparer.OrdinalIgnoreCase);

            string GetRequired(params string[] keys)
            {
                foreach (var key in keys)
                {
                    if (parts.TryGetValue(key, out var value) && !string.IsNullOrWhiteSpace(value))
                        return value;
                }

                throw new InvalidOperationException(
                    $"Connection string is missing required key: {string.Join('/', keys)}");
            }

            var portText = parts.TryGetValue("Port", out var portValue) ? portValue : "5432";
            if (!int.TryParse(portText, NumberStyles.Integer, CultureInfo.InvariantCulture, out var port))
                port = 5432;

            return new ConnectionSettings(
                GetRequired("Host", "Server"),
                port,
                GetRequired("Database"),
                GetRequired("Username", "User Id", "UserID"),
                GetRequired("Password"));
        }

        private static string EscapeArg(string value)
        {
            if (string.IsNullOrEmpty(value))
                return "\"\"";

            if (value.Any(char.IsWhiteSpace) || value.Contains('"'))
                return $"\"{value.Replace("\"", "\\\"")}\"";

            return value;
        }

        private sealed record ConnectionSettings(
            string Host,
            int Port,
            string Database,
            string Username,
            string Password);
    }
}
