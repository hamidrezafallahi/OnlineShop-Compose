using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace Api.Controllers
{
    [ApiController]
    public abstract class BaseController : ControllerBase
    {

        protected int CurrentUserId
        {
            get
            {
                var userIdClaim = User.FindFirstValue(ClaimTypes.NameIdentifier);
                return userIdClaim != null ? int.Parse(userIdClaim) : 0;
            }
        }
    }
}
