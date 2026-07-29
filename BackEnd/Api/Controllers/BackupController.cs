using Api.Controllers;
using Application.Commands;
using Application.Dtos;
using Application.Interfaces;
using Application.Queries;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
[Authorize(Roles = "SuperAdmin,Admin")]
public class BackupController : BaseController
{
    private readonly IMediator _mediator;
    private readonly IBackupService _backupService;

    public BackupController(IMediator mediator, IBackupService backupService)
    {
        _mediator = mediator;
        _backupService = backupService;
    }

    [HttpGet]
    public async Task<ActionResult<BackupListDto>> GetAll(CancellationToken cancellationToken)
    {
        var result = await _mediator.Send(new GetBackupsQuery(), cancellationToken);
        if (!result.IsSuccess)
            return BadRequest(result);

        return Ok(result);
    }

    [HttpPost]
    public async Task<ActionResult<BackupFileDto>> Create(CancellationToken cancellationToken)
    {
        var result = await _mediator.Send(new CreateBackupCommand(), cancellationToken);
        if (!result.IsSuccess)
            return BadRequest(result);

        return Ok(result);
    }

    [HttpGet("{fileName}/download")]
    public async Task<IActionResult> Download(string fileName, CancellationToken cancellationToken)
    {
        var file = await _backupService.OpenDownloadAsync(fileName, cancellationToken);
        if (file is null)
            return NotFound();

        return File(file.Value.Stream, file.Value.ContentType, file.Value.FileName);
    }

    [HttpDelete("{fileName}")]
    public async Task<ActionResult<BackupFileDto>> Delete(string fileName, CancellationToken cancellationToken)
    {
        var result = await _mediator.Send(new DeleteBackupCommand { FileName = fileName }, cancellationToken);
        if (!result.IsSuccess)
        {
            if (string.Equals(result.Error, "Backup file not found", StringComparison.OrdinalIgnoreCase))
                return NotFound(result);

            return BadRequest(result);
        }

        return Ok(result);
    }
}
