# Apply sample SQL seeds to PostgreSQL with one command.
#
# Usage:
#   .\database\seed.ps1
#   .\database\seed.ps1 -Clean
#
# Optional env:
#   $env:COMPOSE_FILE = "docker-compose.dev.yml"
#   $env:POSTGRES_SERVICE = "postgres"
#   $env:POSTGRES_DB = "OnlineShopDb"
#   $env:POSTGRES_USER = "postgres"

param(
  [switch]$Clean
)

$ErrorActionPreference = "Stop"

$RootDir = Split-Path -Parent $PSScriptRoot
if (-not $RootDir) {
  $RootDir = (Resolve-Path (Join-Path $PSScriptRoot "..")).Path
}

$SeedsDir = Join-Path $RootDir "database\seeds"
$ComposeFile = if ($env:COMPOSE_FILE) { $env:COMPOSE_FILE } else { "docker-compose.dev.yml" }
$PostgresService = if ($env:POSTGRES_SERVICE) { $env:POSTGRES_SERVICE } else { "postgres" }
$PostgresDb = if ($env:POSTGRES_DB) { $env:POSTGRES_DB } else { "OnlineShopDb" }
$PostgresUser = if ($env:POSTGRES_USER) { $env:POSTGRES_USER } else { "postgres" }

function Invoke-SeedFile {
  param([Parameter(Mandatory = $true)][string]$FilePath)

  $name = Split-Path -Leaf $FilePath
  Write-Host "==> Applying $name"

  # Preserve UTF-8 (including Persian text) when piping into psql.
  $bytes = [System.IO.File]::ReadAllBytes($FilePath)
  $psi = New-Object System.Diagnostics.ProcessStartInfo
  $psi.FileName = "docker"
  $psi.Arguments = "compose -f `"$ComposeFile`" exec -T $PostgresService psql -v ON_ERROR_STOP=1 -U $PostgresUser -d $PostgresDb"
  $psi.WorkingDirectory = $RootDir
  $psi.RedirectStandardInput = $true
  $psi.RedirectStandardOutput = $true
  $psi.RedirectStandardError = $true
  $psi.UseShellExecute = $false
  $psi.CreateNoWindow = $true

  $process = New-Object System.Diagnostics.Process
  $process.StartInfo = $psi
  [void]$process.Start()

  $process.StandardInput.BaseStream.Write($bytes, 0, $bytes.Length)
  $process.StandardInput.Close()

  $stdout = $process.StandardOutput.ReadToEnd()
  $stderr = $process.StandardError.ReadToEnd()
  $process.WaitForExit()

  if ($stdout) { Write-Host $stdout.TrimEnd() }
  if ($stderr) { Write-Host $stderr.TrimEnd() }

  if ($process.ExitCode -ne 0) {
    throw "psql failed for $name (exit $($process.ExitCode))"
  }
}

Push-Location $RootDir
try {
  if ($Clean) {
    Invoke-SeedFile -FilePath (Join-Path $SeedsDir "00_truncate_sample_data.sql")
  }

  $files = Get-ChildItem -Path $SeedsDir -Filter "*.sql" |
    Where-Object { $_.Name -match '^\d{2}_' -and $_.Name -ne '00_truncate_sample_data.sql' } |
    Sort-Object Name

  if (-not $files -or $files.Count -eq 0) {
    throw "No seed files found in $SeedsDir"
  }

  foreach ($file in $files) {
    Invoke-SeedFile -FilePath $file.FullName
  }

  Write-Host "Sample data seeded successfully."
}
finally {
  Pop-Location
}
