using Api.Controllers;
using Application.Commands;
using Application.Dtos;
using Application.Queries;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class CategoriesController : BaseController
{
    private readonly IMediator _mediator;

    public CategoriesController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<CategoryDto>>> GetAll([FromQuery] GetAllCategoriesQuery query)
    {
        var result = await _mediator.Send(query);
        if (!result.IsSuccess && result.Error == "Unauthorized") return Unauthorized(result);

        return Ok(result);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<CategoryDto>> GetById(int id)
    {
        var result = await _mediator.Send(new GetCategoryByIdQuery { Id = id });
        if (!result.IsSuccess && result.Error == "Unauthorized") return Unauthorized(result);

        return Ok(result);
    }
    [HttpGet("getids")]
    public async Task<ActionResult<IEnumerable<IdDto>>> GetAllCategoriesIds()
    {
        var result = await _mediator.Send(new GetAllCategoriesIdQuery());
        if (!result.IsSuccess && result.Error == "Unauthorized") return Unauthorized(result);

        return Ok(result);
    }
    [HttpGet("selectOption")]
    public async Task<ActionResult<ListDto<SelectOptionDto>>> GetParent4selectOption([FromQuery] GetParent4selectOptionQuery query)
    {
        var result = await _mediator.Send(query);
        if (!result.IsSuccess && result.Error == "Unauthorized") return Unauthorized(result);

        return Ok(result);
    }

    [HttpPost]
    [Authorize(Roles = "SuperAdmin,Admin,ContentEditor")]

    public async Task<ActionResult<IdDto>> Create([FromForm] CreateCategoryCommand command)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);
        var result = await _mediator.Send(command);
        if (!result.IsSuccess && result.Error == "Unauthorized")
            return Unauthorized(result);
        return Ok(result);
    }
  

    [HttpPut]
    [Authorize(Roles = "SuperAdmin,Admin,ContentEditor")]

    public async Task<ActionResult<IdDto>> UpdateCategory([FromForm] UpdateCategoryCommand command)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        var result = await _mediator.Send(command);
        if (!result.IsSuccess && result.Error == "Unauthorized")
            return Unauthorized(result);
        return Ok(result);
    }
    [HttpPut("active")]
    [Authorize(Roles = "SuperAdmin,Admin,ContentEditor")]

    public async Task<ActionResult<IdDto>> Active([FromBody] ActiveCategoryCommand command)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        var result = await _mediator.Send(command);
        if (!result.IsSuccess && result.Error == "Unauthorized")
            return Unauthorized(result);
        return Ok(result);
    }


    [HttpDelete("{id}")]
    [Authorize(Roles = "SuperAdmin,Admin,ContentEditor")]

    public async Task<ActionResult<IdDto>> Delete(int id)
    {
        var command = new DeleteCategoryCommand { Id = id};
        var result = await _mediator.Send(command);
        if (!result.IsSuccess && result.Error == "Unauthorized")
            return Unauthorized(result);
        return Ok(result);
    }

}
