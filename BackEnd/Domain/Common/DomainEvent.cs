namespace OnlineShop.Domain.Common;

/// <summary>
/// Base interface for all domain events.
/// Domain events capture side effects that should occur after a domain operation.
/// This is a core DDD pattern - without it we resort to scattering business logic
/// across application services instead of keeping it in the domain.
/// </summary>
public interface IDomainEvent
{
    public DateTime OccurredOn { get; }
}

/// <summary>
/// Base record for domain events. Using records ensures value-based equality.
/// </summary>
public abstract record DomainEvent : IDomainEvent
{
    public DateTime OccurredOn { get; init; } = DateTime.UtcNow;
}