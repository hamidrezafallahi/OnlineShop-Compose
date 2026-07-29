namespace Application.Dtos
{
    public class BackupFileDto
    {
        public string FileName { get; set; } = string.Empty;
        public long SizeBytes { get; set; }
        public DateTime CreatedAtUtc { get; set; }
    }

    public class BackupListDto
    {
        public List<BackupFileDto> Items { get; set; } = new();
        public int TotalCount { get; set; }
    }
}
