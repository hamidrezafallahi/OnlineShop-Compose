// Infrastructure/Repositories/RateRepository.cs
using Domain.Enums;
using Domain.Interfaces;
using Microsoft.EntityFrameworkCore;
using OnlineShop.Domain.Entities;
using OnlineShop.Infrastructure.Persistence;

namespace OnlineShop.Infrastructure.Repositories
{
    public class RateRepository : Repository<Rate>, IRateRepository
    {
        public RateRepository(AppDbContext context) : base(context) { }
        

        public async Task<AverageRateReadModel> GetAverageRateAsync(
            EnumTargetType targetType,
            int targetId)
        {
            var query = Query(r =>
                r.TargetType == targetType &&
                r.TargetId == targetId
            );

            var count = await query.CountAsync();

            if (count == 0)
            {
                return new AverageRateReadModel
                {
                    TargetId = targetId,
                    Average = 0,
                    Count = 0
                };
            }

            var average = await query
                .AverageAsync(r => r.Value.Value);

            return new AverageRateReadModel
            {
                TargetId = targetId,
                Average = Math.Round(average, 2),
                Count = count
            };
        }
    }
}
