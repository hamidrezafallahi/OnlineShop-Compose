using OnlineShop.Domain.Entities;

namespace OnlineShop.Domain.Interfaces
{
    public interface IEntityConfigRepository : IRepository<EntityConfig>
    {
        /// <summary>
        /// گرفتن EntityConfig براساس EntityName
        /// </summary>
        Task<EntityConfig?> GetByEntityNameAsync(string entityName);
         Task<FormReadModel> GetFormByUrlAsync();

    }
}
