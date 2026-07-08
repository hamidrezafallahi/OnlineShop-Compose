using Microsoft.EntityFrameworkCore;
using OnlineShop.Domain.Entities;
using OnlineShop.Domain.Interfaces;
using OnlineShop.Infrastructure.Persistence;
using System.Linq.Expressions;

namespace OnlineShop.Infrastructure.Repositories
{
    public class Repository<T> : IRepository<T> where T : BaseEntity
    {
        protected readonly AppDbContext _context;
        protected readonly DbSet<T> _dbSet;

        public Repository(AppDbContext context)
        {
            _context = context;
            _dbSet = context.Set<T>();
        }
        public  IQueryable<T> Query(Expression<Func<T, bool>>? predicate = null)
        {
            var query = _dbSet.AsQueryable();

            query = query.Where(z => !z.IsDeleted);
            if (predicate != null)
                query = query.Where(predicate);

            return query;

        }


        public  async Task<T?> GetByIdAsync(int id)
        {
            var query = Query(e => EF.Property<int>(e, "Id") == id);
            return await query.FirstOrDefaultAsync();
        }
        public  async Task<List<T>> GetAllAsync(Expression<Func<T, bool>>? predicate = null)
        {
            return await Query(predicate).ToListAsync();
        }

        public async Task AddAsync(T entity)  
        {
            await _dbSet.AddAsync(entity);
         }

        public async Task UpdateAsync(T entity)  // ✅ بدون Save  
        {
            _dbSet.Update(entity);
            // SaveChanges حذف شد!
        }
        public async Task<bool> DeleteAsync(int id)
        {
            var entity = await GetByIdAsync(id);
            if (entity == null)
                return false;

            _dbSet.Remove(entity);
            var result = await _context.SaveChangesAsync();
            return result > 0;
        }

        public   Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
        {
            return _context.SaveChangesAsync(cancellationToken);
        }
        public async Task<List<int>> GetAllIds()
        {
            return await Query(t => !t.IsDeleted && t.IsActive).AsNoTracking()
                                .Select(p => p.Id)
                                .ToListAsync();
        }
    }
}
