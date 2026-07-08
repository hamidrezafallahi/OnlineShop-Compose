using Domain.Enums;
using OnlineShop.Domain.Entities;
using OnlineShop.Domain.Interfaces;

namespace Domain.Interfaces
{
    public interface IRateRepository : IRepository<Rate>
    {
        Task<AverageRateReadModel> GetAverageRateAsync(
            EnumTargetType targetType,
            int targetId
        );
        
    }
}
