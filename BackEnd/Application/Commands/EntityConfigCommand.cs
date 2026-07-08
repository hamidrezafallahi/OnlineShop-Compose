using Common;
using MediatR;
using OnlineShop.Domain.Entities;
using System.Collections.Generic;

namespace Application.Commands
{
    public class CreateEntityConfigCommand : IRequest<ServiceResult<IdDto>>
    {
        public string EntityName { get;  set; }
        public string PersianDisplayName { get;  set; }
        public string EnglishDisplayName { get;  set; }

        public string EndPoint { get;  set; }


        public string EntityIconBase64 { get;  set; }
        public List<JsonDefinition>? Columns { get; set; }
        public List<string>? Actions { get; set; }
        public List<FormFieldDefinition>? FormFields { get; set; }
    }

    public class UpdateEntityConfigCommand : IRequest<ServiceResult<IdDto>>
    {
        public int Id { get; set; }
        public string EntityName { get; set; }
        public string PersianDisplayName { get; set; }
        public string EnglishDisplayName { get; set; }

        public string EndPoint { get; set; }


        public string EntityIconBase64 { get; set; }
        public List<JsonDefinition>? Columns { get; set; }
        public List<string>? Actions { get; set; }
        public bool? IsActive { get; set; }
        public List<FormFieldDefinition>? FormFields { get; set; }

    }
    
    public class ActiveEntityConfigCommand : ActiveCommand, IRequest<ServiceResult<IdDto>> { }
    public class DeleteEntityConfigCommand : IRequest<ServiceResult<IdDto>>
    {
        public int Id { get; set; }
    }
}
