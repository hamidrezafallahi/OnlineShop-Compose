function PromotionBanner() {
  const hasBanner = false;

  if (!hasBanner) return null;

  return (
    <div className="bg-red-600 p-4 w-full h-12 font-bold text-white text-lg text-center">
      تخفیف ویژه شب یلدا! فقط تا پایان امشب!
    </div>
  );
}
export default PromotionBanner;
