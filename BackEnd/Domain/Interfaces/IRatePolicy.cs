

using Domain.Enums;

namespace Domain.Interfaces
{
    public interface IRatePolicy
    {
        bool CanRate(int userId, EnumTargetType target);
    }
}
