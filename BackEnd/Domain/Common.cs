public class JsonDefinition
{
    public string Header { get; set; } = default!;
    public string Accessor { get; set; } = default!;
    public string Type { get; set; } = "string"; // string, number, date, select, boolean
    public bool Sortable { get; set; }
    public bool Filterable { get; set; }
    public List<Option>? Options { get; set; }
    public JsonDefinition() { }

    public JsonDefinition(string header, string accessor, string type = "string")
    {
        Header = header ?? throw new ArgumentNullException(nameof(header));
        Accessor = accessor ?? throw new ArgumentNullException(nameof(accessor));
        Type = type;
        Options = new List<Option>();
    }
}
public class FormFieldDefinition
{
    public string Name { get; set; }               // نام فیلد در موجودیت
    public string Caption { get; set; }            // عنوان نمایش در فرم
    public string Type { get; set; }               // text, textarea, number, select, radio, checkbox, image, noShow
    public string? PlaceHolder { get; set; }       // متن جایگزین
    public string? Help { get; set; }              // توضیح کمک
    public int Order { get; set; }                 // ترتیب نمایش
    public FetchConfig? FetchConfig { get; set; }                 // واکشی داده برای selectOption
    public List<Option>? Options { get; set; }     
    public List<ValidationRule>? Rules { get; set; }  
}
public class ValidationRule
{
    public string Rule { get; set; }             // required, maxLength, pattern, etc.
    public string? Condition { get; set; }       // شرط نمایش یا اعتبارسنجی
    public string Message { get; set; }          // پیام خطا
}
public class Option
{
    public string Label { get; set; }           
    public int Value { get; set; }       
 }
public class FetchConfig
{
    public string api { get; set; }
    public List<object>? fetchFilters { get; set; }
}