using Application.Commands;
using Application.Common;
using Application.Common.Interfaces;
using Application.Dtos;
using Common;
using MediatR;
using Microsoft.AspNetCore.Http;
using OnlineShop.Domain.Entities;
using OnlineShop.Domain.Enums;
using OnlineShop.Domain.Interfaces;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Handler.CommandHandler
{
    // ========================= Payment Command Handlers =========================
    public class PaymentCommandHandlers(IPaymentRepository _repo, IHttpContextAccessor _accessor) :
        IRequestHandler<CreatePaymentCommand, ServiceResult<IdDto>>,
        IRequestHandler<MarkPaymentAsPaidCommand, ServiceResult<IdDto>>,
        IRequestHandler<MarkPaymentAsFailedCommand, ServiceResult<IdDto>>,
        IRequestHandler<CancelPaymentCommand, ServiceResult<IdDto>>,
        IRequestHandler<ActivePaymentCommand, ServiceResult<IdDto>>,
        IRequestHandler<DeletePaymentCommand, ServiceResult<IdDto>>
    {
        

        // ================= Create Payment =================
        public async Task<ServiceResult<IdDto>> Handle(CreatePaymentCommand request, CancellationToken cancellationToken)
        {
            var userId = _accessor.HttpContext.GetUserId();
            if (userId == null)
                return ServiceResult<IdDto>.Failed("Unauthorized");

            var payment = Payment.Create(request.OrderId, request.Amount, request.PaymentMethodId, userId.Value);
            await _repo.AddAsync(payment);
            await _repo.SaveChangesAsync(cancellationToken);

            return ServiceResult<IdDto>.Ok(new IdDto { Id = payment.Id });
        }

        // ================= Mark Payment As Paid =================
        public async Task<ServiceResult<IdDto>> Handle(MarkPaymentAsPaidCommand request, CancellationToken cancellationToken)
        {
            var userId = _accessor.HttpContext.GetUserId();
            if (userId == null) return ServiceResult<IdDto>.Failed("Unauthorized");

            var payment = await _repo.GetByIdAsync(request.PaymentId);
            if (payment == null) return ServiceResult<IdDto>.Failed("Payment not found");

            payment.MarkAsPaid(request.TransactionId, userId.Value);
            await _repo.SaveChangesAsync(cancellationToken);

            return ServiceResult<IdDto>.Ok(new IdDto { Id = payment.Id });
        }

        // ================= Mark Payment As Failed =================
        public async Task<ServiceResult<IdDto>> Handle(MarkPaymentAsFailedCommand request, CancellationToken cancellationToken)
        {
            var userId = _accessor.HttpContext.GetUserId();
            if (userId == null) return ServiceResult<IdDto>.Failed("Unauthorized");

            var payment = await _repo.GetByIdAsync(request.PaymentId);
            if (payment == null) return ServiceResult<IdDto>.Failed("Payment not found");

            payment.MarkAsFailed(request.TransactionId, userId.Value);
            await _repo.SaveChangesAsync(cancellationToken);

            return ServiceResult<IdDto>.Ok(new IdDto { Id = payment.Id });
        }

        // ================= Cancel Payment =================
        public async Task<ServiceResult<IdDto>> Handle(CancelPaymentCommand request, CancellationToken cancellationToken)
        {
            var userId = _accessor.HttpContext.GetUserId();
            if (userId == null) return ServiceResult<IdDto>.Failed("Unauthorized");

            var payment = await _repo.GetByIdAsync(request.PaymentId);
            if (payment == null) return ServiceResult<IdDto>.Failed("Payment not found");

            payment.Cancel(userId.Value);
            await _repo.SaveChangesAsync(cancellationToken);

            return ServiceResult<IdDto>.Ok(new IdDto { Id = payment.Id });
        }
        // ================= Active Payment =================
        public async Task<ServiceResult<IdDto>> Handle(ActivePaymentCommand request, CancellationToken cancellationToken)
        {
            var userId = _accessor.HttpContext.GetUserId();
            if (userId == null) return ServiceResult<IdDto>.Failed("Unauthorized");

            var payment = await _repo.GetByIdAsync(request.Id);
            if (payment == null) return ServiceResult<IdDto>.Failed("Payment not found");

            payment.SetActive(request.IsActive, userId.Value);
            await _repo.SaveChangesAsync(cancellationToken);

            return ServiceResult<IdDto>.Ok(new IdDto { Id = payment.Id });
        }

        // ================= Delete Payment =================
        public async Task<ServiceResult<IdDto>> Handle(DeletePaymentCommand request, CancellationToken cancellationToken)
        {
            var userId = _accessor.HttpContext.GetUserId();
            if (userId == null) return ServiceResult<IdDto>.Failed("Unauthorized");

            var payment = await _repo.GetByIdAsync(request.PaymentId);
            if (payment == null) return ServiceResult<IdDto>.Failed("Payment not found");

            payment.Delete(userId.Value);
            await _repo.SaveChangesAsync(cancellationToken);

            return ServiceResult<IdDto>.Ok(new IdDto { Id = payment.Id });
        }
    }

    // ================= Start Payment Handler =================
    public class RequestPaymentCommandHandler(
            IOrderRepository _orderRepo,
            IPaymentRepository _paymentRepo,
            IHttpContextAccessor _accessor,
            IPaymentGateway _gateway) :
        IRequestHandler<RequestPaymentCommand, ServiceResult<PaymentStartDto>>
    {
       

        public async Task<ServiceResult<PaymentStartDto>> Handle(RequestPaymentCommand request, CancellationToken cancellationToken)
        {
            var userId = _accessor.HttpContext.GetUserId();
            if (userId == null)
                return ServiceResult<PaymentStartDto>.Failed("Unauthorized");

            var order = await _orderRepo.GetByIdAsync(request.OrderId);
            if (order == null || order.UserId != userId)
                return ServiceResult<PaymentStartDto>.Failed("Order not found");

            if (order.Status != OrderStatus.Pending)
                return ServiceResult<PaymentStartDto>.Failed("Order not payable");

            // 🔹 ساخت Payment
            var payment = Payment.Create(order.Id, order.FinalPrice, order.PaymentMethodId, userId.Value);
            await _paymentRepo.AddAsync(payment);
            await _paymentRepo.SaveChangesAsync(cancellationToken);

            // 🔹 درخواست لینک درگاه
            var gatewayResult = await _gateway.RequestPaymentAsync(
                payment.Amount,
                callbackUrl: "http://localhost:3000/fa/paymentResult",
                description: $"Order #{payment.OrderId}"
            );

            payment.SetTransactionId(gatewayResult.Authority, userId.Value);
            await _paymentRepo.SaveChangesAsync(cancellationToken);

            return ServiceResult<PaymentStartDto>.Ok(new PaymentStartDto
            {
                PaymentUrl = gatewayResult.PaymentUrl
            });
        }
    }
}
