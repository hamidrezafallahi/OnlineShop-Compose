using System.Text.Json;
using System.Text.Json.Serialization;

namespace Application.Dtos
{
    public class EntityConfigDto
    {
        public int Id { get; set; }
        public bool IsActive { get; set; }
        public string EntityName { get; set; } = default!;
        public string PersianDisplayName { get; set; } = default!;
        public string EnglishDisplayName { get; set; } = default!;
        public string EndPoint { get; set; } = default!;
        public string EntityIconBase64 { get; set; }
        public string ActionsJson { get; set; } = default!;
        public string ColumnsJson { get; set; } = default!;
        public string FormFieldsJson { get; set; } = default!;


        //public JsonSerializer.Deserialize<List<JsonDefinition>> ColumnsJson { get; set; } = default!;
        //public string JsonSerializer.Deserialize<List<FormFieldDefinition>> { get; set; } = default!;


        //[JsonIgnore] // از API مخفی می‌شه
        //public List<JsonDefinition>? Columns { get; set; }

        //[JsonIgnore]
        //public List<FormFieldDefinition>? FormFields { get; set; }

        //public string ColumnsJson
        //{
        //    get => JsonSerializer.Serialize(Columns);
        //    set => Columns = JsonSerializer.Deserialize<List<JsonDefinition>>(value) ?? new();
        //}

        //public string FormFieldsJson
        //{
        //    get => JsonSerializer.Serialize(FormFields);
        //    set => FormFields = JsonSerializer.Deserialize<List<FormFieldDefinition>>(value) ?? new();
        //}
    }
    public class MenuDto
    {
        public string EntityName { get; set; }
        public string DisplayName { get; set; }
        public string ApiEndpoint { get; set; }
    }





}
