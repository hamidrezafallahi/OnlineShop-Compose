using OnlineShop.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Dtos
{
    public class CreateSpecialOffersDto
    {
 
        public int ProductId { get;  set; }

        public int? DiscountId { get;  set; }

        public DateTime StartDate { get; set; }
        public DateTime EndDate { get;  set; }

        public int DisplayOrder { get; set; }

    }
    public class SpecialOffersDto
    {
        public int Id { get; set; }
        public bool IsActive { get; set; }
        public string ProductName { get; set; } = default!;
        public string ProductImage { get; set; } = default!;
        public string SupplierName { get; set; } = default!;
        public string DiscountName { get; set; } = default!;
        public int ProductId { get; set; }
        public int ProductOfferId { get; set; }

        public int? DiscountId { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public int DisplayOrder { get; set; }
    }
    public class LandingSpecialOffersDto
    {
        public int Id { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public int DisplayOrder { get; set; }
        public ProductByDetailForSpecialsDto Product { get; set; }
    }

    public class DeleteSpecialOffersDto
    {
        public int Id { get; set; }
        

    }
}
