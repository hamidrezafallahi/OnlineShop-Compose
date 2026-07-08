namespace Application.Dtos
{
    public class RefreshTokenDto
    {
        public string Token { get; set; } = string.Empty;
        public string AccessToken { get; set; } = string.Empty;
        public DateTime AccessTokenExpiryDate { get; set; }
        public DateTime ExpiryDate { get; set; }
        public bool IsRevoked { get; set; }
        public string? ReplacedByToken { get; set; }
        public string CreatedByIp { get; set; } = string.Empty;
        public string? CreatedByUserAgent { get; set; }
        public int UserId { get; set; }
    }
}
