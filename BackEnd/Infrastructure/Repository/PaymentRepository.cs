using Microsoft.EntityFrameworkCore;
using OnlineShop.Domain.Entities;
using OnlineShop.Domain.Interfaces;
using OnlineShop.Infrastructure.Persistence;

namespace OnlineShop.Infrastructure.Repositories
{
    public class PaymentRepository : Repository<Payment>, IPaymentRepository
    {
        public PaymentRepository(AppDbContext context) : base(context)
        {
        }

        public async Task<List<Payment>> GetByOrderIdAsync(int orderId)
        {
            return await _context.Set<Payment>()
                                 .Where(p => p.OrderId == orderId && !p.IsDeleted)
                                 .ToListAsync();
        }

        public async Task<Payment?> GetByTransactionIdAsync(string transactionId)
        {
            return await _context.Set<Payment>()
                                 .FirstOrDefaultAsync(p => p.TransactionId == transactionId && !p.IsDeleted);
        }
    }
}
