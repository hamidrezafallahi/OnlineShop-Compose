

using Application.Commands;
using Application.Common;
using Common;
using Domain.Interfaces;
using MediatR;
using Microsoft.AspNetCore.Http;
using OnlineShop.Domain.Interfaces;

    public class ProductOfferCommandHandler(
            IProductOfferRepository _offerRepo,
            IProductRepository _productRepo,
            IDiscountRepository _discountRepo,
            IProductOfferDiscountRepository _productOfferDiscountRepo,
            IHttpContextAccessor _accessor)
      : 
        IRequestHandler<CreateProductOfferCommand, ServiceResult<IdDto>>,
        IRequestHandler<UpdateProductOfferCommand, ServiceResult<IdDto>>,
        IRequestHandler<ActiveProductOfferCommand, ServiceResult<IdDto>>,
        IRequestHandler<DeleteProductOfferCommand, ServiceResult<IdDto>>
    {


        public async Task<ServiceResult<IdDto>> Handle(CreateProductOfferCommand request,CancellationToken cancellationToken)
        {
        var userId = _accessor.HttpContext.GetUserId();
        if (userId == null)
            return ServiceResult<IdDto>.Failed("Unauthorized");

            // 1. بررسی وجود محصول
            var product = await _productRepo.GetByIdAsync(request.ProductId);
            if (product == null || product.IsDeleted)
                return ServiceResult<IdDto>.Failed("Product not found");

            // 2. بررسی تکراری نبودن offer
            var exists = await _offerRepo.ExistsAsync(request.ProductId, userId.Value);
            if (exists)
                return ServiceResult<IdDto>.Failed("You already have an offer for this product");

            // 3. ایجاد offer
            var offer = ProductOffers.Create(
                productId: request.ProductId,
                supplierId: userId.Value,
                basePrice: request.BasePrice,
                inventory: request.Inventory,
                currentUserId: userId.Value
            );

            await _offerRepo.AddAsync(offer);
            await _offerRepo.SaveChangesAsync(cancellationToken);
            return ServiceResult<IdDto>.Ok(new IdDto { Id = offer.Id });
        }
        public async Task<ServiceResult<IdDto>> Handle(UpdateProductOfferCommand request,CancellationToken cancellationToken)
        {
        var userId = _accessor.HttpContext.GetUserId();
        if (userId == null)
            return ServiceResult<IdDto>.Failed("Unauthorized");
        // 1. یافتن offer
        var offer = await _offerRepo.GetByIdAsync(request.Id);
            if (offer == null || offer.IsDeleted)
                return ServiceResult<IdDto>.Failed("Offer not found");

            // 2. بررسی مالکیت
            if (offer.SupplierId != userId.Value)
                return ServiceResult<IdDto>.Failed("Unauthorized");
            offer.Update(
                basePrice: request.BasePrice,
                inventory: request.Inventory,
                currentUserId: userId.Value
            );

            if (request.IsActive.HasValue)
            {
                offer.SetActive(request.IsActive.Value, userId.Value);
            }
            await _offerRepo.SaveChangesAsync(cancellationToken);

            return ServiceResult<IdDto>.Ok(new IdDto { Id = offer.Id });
        }
        public async Task<ServiceResult<IdDto>> Handle(ActiveProductOfferCommand request, CancellationToken cancellationToken)
    {
        var userId = _accessor.HttpContext.GetUserId();
        if (userId == null)
            return ServiceResult<IdDto>.Failed("Unauthorized");
        var offer = await _offerRepo.GetByIdAsync(request.Id);
        if (offer == null || offer.IsDeleted)
            return ServiceResult<IdDto>.Failed("Offer not found");
        if (offer.SupplierId != userId.Value)
            return ServiceResult<IdDto>.Failed("Unauthorized");

        offer.SetActive(request.IsActive, userId.Value);

        await _offerRepo.SaveChangesAsync(cancellationToken);

        return ServiceResult<IdDto>.Ok(new IdDto { Id = offer.Id });
    }
        public async Task<ServiceResult<IdDto>> Handle(DeleteProductOfferCommand request,CancellationToken cancellationToken)
        {
        var userId = _accessor.HttpContext.GetUserId();
        if (userId == null)
            return ServiceResult<IdDto>.Failed("Unauthorized");
        var offer = await _offerRepo.GetByIdAsync(request.Id);
            if (offer == null || offer.IsDeleted)
                return ServiceResult<IdDto>.Failed("Offer not found");
            if (offer.SupplierId != userId.Value)
                return ServiceResult<IdDto>.Failed("Unauthorized");

            offer.Delete(userId.Value);

            await _offerRepo.SaveChangesAsync(cancellationToken);

            return ServiceResult<IdDto>.Ok(new IdDto { Id = offer.Id });
        }
    }