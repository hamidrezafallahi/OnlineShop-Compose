using Application.Dtos;
namespace Application.Common.Interfaces
{
    public interface IPaymentGateway
    {
        Task<PaymentRequestResult> RequestPaymentAsync(
            decimal amount,
            string callbackUrl,
            string description
        );

        Task<PaymentVerifyResult> VerifyPaymentAsync(
            string authority,
            decimal amount
        );
    }
}
