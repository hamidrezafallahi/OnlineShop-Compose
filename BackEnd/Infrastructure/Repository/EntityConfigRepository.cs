using Microsoft.EntityFrameworkCore;
using OnlineShop.Domain.Entities;
using OnlineShop.Domain.Interfaces;
using OnlineShop.Infrastructure.Persistence;

namespace OnlineShop.Infrastructure.Repositories
{
    public class EntityConfigRepository : Repository<EntityConfig>, IEntityConfigRepository
    {
        private readonly AppDbContext _context;

        public EntityConfigRepository(AppDbContext context) : base(context)
        {
            _context = context;
        }

        /// <summary>
        /// گرفتن EntityConfig براساس EntityName (case-insensitive).
        /// PostgreSQL string compare is case-sensitive; callers may pass Categories vs categories.
        /// </summary>
        public async Task<EntityConfig?> GetByEntityNameAsync(string entityName)
        {
            if (string.IsNullOrWhiteSpace(entityName))
                return null;

            var key = entityName.Trim().ToLowerInvariant();
            return await Query(e => e.EntityName.ToLower() == key)
                         .FirstOrDefaultAsync();
        }
 

        
        public async Task<FormReadModel?> GetFormByUrlAsync()
        {
            return await Query(e => e.IsActive)
                .Select(z => new FormReadModel
                {
                    EntityName = z.EntityName,
                    EnglishDisplayName = z.EnglishDisplayName,
                    PersianDisplayName = z.PersianDisplayName,
                    EndPoint = z.EndPoint,
                    EntityIconBase64 = z.EntityIconBase64,
                    FormFieldsJson = z.FormFieldsJson
                })
                .FirstOrDefaultAsync();
        }











    }
}
