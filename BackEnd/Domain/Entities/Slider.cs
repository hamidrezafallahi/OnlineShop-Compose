

namespace OnlineShop.Domain.Entities
{
    public class Slide : BaseEntity
    {
        private Slide() { }

        // ===== محتوای فارسی =====
        public string BannerUrl { get; private set; } = string.Empty;
        public string BannerTitle { get; private set; } = string.Empty;
        public string BannerDescrioption { get; private set; } = string.Empty;
        public string FirstUrl { get; private set; } = string.Empty;
        public string SecondUrl { get; private set; } = string.Empty;
        public bool IsHero { get; private set; } 


        // ===== Factory =====
        public static Slide Create(
            int currentUserId,
            string firstUrl,
            string secondUrl,
            string bannerTitle,
            string bannerDescription
        )
        {
            if (string.IsNullOrWhiteSpace(firstUrl))
                throw new ArgumentException("آدرس صفحه مربوط به بنر دیده نشد");
            var slide = new Slide
            {
                FirstUrl = firstUrl ?? string.Empty,
                SecondUrl = secondUrl ?? string.Empty,
                BannerTitle = bannerTitle ?? string.Empty,
                BannerDescrioption = bannerDescription ?? string.Empty,
            };
            slide.MarkCreated(currentUserId);
            return slide;
        }


        // ===== Behavior =====
        public void Update(
            int currentUserId,
            string? bannerUrl,
            string? firstUrl,
            string? secondUrl,
            string? bannerTitle,
            string? bannerDescription
        )
        {
            if (!string.IsNullOrWhiteSpace(bannerUrl))  BannerUrl = bannerUrl;
            if (!string.IsNullOrWhiteSpace(firstUrl)) firstUrl = firstUrl;
            if (!string.IsNullOrWhiteSpace(secondUrl)) secondUrl = secondUrl;
            if (!string.IsNullOrWhiteSpace(bannerTitle)) bannerTitle = bannerTitle;
            if (!string.IsNullOrWhiteSpace(bannerDescription)) bannerDescription = bannerDescription;


            MarkUpdated(currentUserId);
        }

        public void SetHero(bool isHero, int currentUserId)
        {
            IsHero = isHero;
            MarkUpdated(currentUserId);
        }

    }
}
