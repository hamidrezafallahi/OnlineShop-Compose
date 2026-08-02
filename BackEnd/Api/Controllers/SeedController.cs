using Application.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize(Roles = "SuperAdmin,Admin")]
public class SeedController(ISampleSeedService seedService) : ControllerBase
{
    [HttpGet]
    public async Task<IActionResult> GetStatus(CancellationToken cancellationToken)
    {
        var status = await seedService.GetStatusAsync(cancellationToken);
        return Ok(new { isSuccess = true, data = status });
    }

    [HttpPost("sample")]
    public async Task<IActionResult> ApplySample(
        [FromQuery] bool clean = false,
        CancellationToken cancellationToken = default)
    {
        var result = await seedService.ApplyAsync(clean, cancellationToken);
        if (!result.Success)
            return BadRequest(new { isSuccess = false, error = result.Message, data = result });

        return Ok(new { isSuccess = true, data = result });
    }
}
