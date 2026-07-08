using Application.Interfaces;
using Hangfire;
using System.Linq.Expressions;

namespace OnlineShop.Infrastructure.Services
{
    public class HangfireBackgroundJobService : IBackgroundJobService
    {
        public string Schedule<T>(Expression<Func<T, Task>> methodCall, TimeSpan delay)
        {
            return BackgroundJob.Schedule(methodCall, delay);
        }
    }
}
