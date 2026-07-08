using Domain.Interfaces;
using Microsoft.EntityFrameworkCore;
using OnlineShop.Domain.Entities;
using OnlineShop.Infrastructure.Persistence;
using OnlineShop.Infrastructure.Repositories;

public class SlideRepository : Repository<Slide>, ISlideRepository
{
    public SlideRepository(AppDbContext context) : base(context) { }

     
}
