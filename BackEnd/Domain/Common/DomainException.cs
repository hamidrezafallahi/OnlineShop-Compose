namespace OnlineShop.Domain.Common;

/// <summary>
/// Base exception for domain rule violations.
/// Distinguished from system exceptions for proper error handling.
/// </summary>
public class DomainException : Exception
{
    public string Code { get; }

    public DomainException(string message, string code = "DOMAIN_ERROR")
        : base(message)
    {
        Code = code;
    }

    public DomainException(string message, Exception inner, string code = "DOMAIN_ERROR")
        : base(message, inner)
    {
        Code = code;
    }
}