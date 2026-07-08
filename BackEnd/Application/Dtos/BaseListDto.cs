using Application.Dtos;

public class BaseListDto
{
    public bool? ByConfig { get; set; } = false;
    public string? Q { get; set; }
    public bool? OnlyActives { get; set; } = true;
    public int? pageSize { get; set; } = 10;
    public int? page { get; set; } = 1;

}
public class ListDto<T>
{
    public List<T> Records { get; set; } = new List<T>();
    public string? ColumnsJson { get; set; }
    public string? ActionsJson { get; set; }
    public int TotalCount { get; set; }
    public int PageNumber { get; set; }
    public int PageSize { get; set; }
    public int TotalPages => (int)Math.Ceiling((double)TotalCount / PageSize);
}
public class IdDto
{
    public int? Id { get; set; }
}
public class SlugDto
{
    public string? Slug { get; set; }
}
public class SelectOptionDto
{
    public int Id { get; set; }
    public string PersianLabel { get; set; } = string.Empty;
    public string EnglishLabel { get; set; } = string.Empty;

}
public class ActiveCommand
{
    public int Id { get; set; }
    public bool IsActive { get; set; }
}