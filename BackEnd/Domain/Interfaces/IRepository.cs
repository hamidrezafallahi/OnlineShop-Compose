using System.Linq.Expressions;

namespace OnlineShop.Domain.Interfaces
{
    public interface IRepository<T> where T : class
    {
        Task<T?> GetByIdAsync(int id);
        Task<List<T>> GetAllAsync(Expression<Func<T,bool>>? predicate = null);
        IQueryable<T> Query(Expression<Func<T, bool>>? predicate = null);
        Task  AddAsync(T entity);
        Task  UpdateAsync(T entity);
        Task<bool> DeleteAsync(int id);
        Task<int> SaveChangesAsync(CancellationToken cancellationToken = default);
        Task<List<int>> GetAllIds();

    }
}
