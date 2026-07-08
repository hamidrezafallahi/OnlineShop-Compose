 
using System.Text.Json;

namespace OnlineShop.Domain.Entities
{
    public class EntityConfig : BaseEntity
    {
        public string EntityName { get; private set; } 
        public string PersianDisplayName { get; private set; }
        public string EnglishDisplayName { get; private set; }

        public string EndPoint { get; private set; }

        public string EntityIconBase64 { get; private set; }
        private string _actionsJson;
        private string _columnsJson;
        private string _formFieldsJson;
        public string FormFieldsJson => _formFieldsJson;

        public string ActionsJson => _actionsJson;
        public string ColumnsJson => _columnsJson;

        private EntityConfig() { } // EF Core

        // ===== Factory =====
        public static EntityConfig Create(
     int currentUserId,
     string entityName,
     string persianDisplayName,
     string englishDisplayName,
     string endPoint,
     string entityIconBase64,
     List<string> actions,
     List<JsonDefinition> columns,
     List<FormFieldDefinition> formFields
 )
        {
            var config = new EntityConfig
            {
                EntityName = entityName,
                PersianDisplayName = persianDisplayName,
                EnglishDisplayName = englishDisplayName,
                EndPoint = endPoint,
                EntityIconBase64 = entityIconBase64,
                _actionsJson = JsonSerializer.Serialize(actions ?? new List<string>()),
                _columnsJson = JsonSerializer.Serialize(columns ?? new List<JsonDefinition>()),
                _formFieldsJson = JsonSerializer.Serialize(formFields ?? new List<FormFieldDefinition>())
            };

            config.MarkCreated(currentUserId);
            return config;
        }

        public void Update(
            int currentUserId,
            string entityName,
            string persianDisplayName,
            string englishDisplayName,
            string endPoint,
            string entityIconBase64,
            List<string>? actions = null,
            List<JsonDefinition>? columns = null,
            List<FormFieldDefinition>? formFields = null
        )
        {
            if (!string.IsNullOrWhiteSpace(entityName))
                EntityName = entityName;
            if (!string.IsNullOrWhiteSpace(persianDisplayName))
                PersianDisplayName = persianDisplayName;
            if (!string.IsNullOrWhiteSpace(englishDisplayName))
                EnglishDisplayName = englishDisplayName;
            if (!string.IsNullOrWhiteSpace(endPoint))
                EndPoint = endPoint;
            if (!string.IsNullOrWhiteSpace(entityIconBase64))
                EntityIconBase64 = entityIconBase64;
            if (actions != null)
                _actionsJson = JsonSerializer.Serialize(actions);
            if (columns != null)
                _columnsJson = JsonSerializer.Serialize(columns);
            if (formFields != null)
                _formFieldsJson = JsonSerializer.Serialize(formFields);

            MarkUpdated(currentUserId);
        }

 
    }
}
