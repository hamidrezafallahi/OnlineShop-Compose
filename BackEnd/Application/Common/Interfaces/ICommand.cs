using Common;
using MediatR;

namespace Application.Common.Interfaces;

/// <summary>
/// Marker interface for CQRS commands (write operations).
/// Commands return ServiceResult to standardize API responses.
/// </summary>
public interface ICommand<TResponse> : IRequest<ServiceResult<TResponse>> where TResponse : class
{
}

/// <summary>
/// Void command - for operations that don't return data.
/// </summary>
public interface ICommand : IRequest<ServiceResponse>
{
}

/// <summary>
/// Marker interface for CQRS queries (read operations).
/// </summary>
public interface IQuery<TResponse> : IRequest<ServiceResult<TResponse>> where TResponse : class
{
}