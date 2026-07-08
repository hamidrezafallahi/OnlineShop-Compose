using System.Linq.Expressions;

namespace Application.Interfaces
{
    public interface IBackgroundJobService
    {
        string Schedule<T>(Expression<Func<T, Task>> methodCall, TimeSpan delay);
    }

}
