export default function ProductPrice({ product }: any) {
  if (product.discountId) {
    return (
      <div className="flex items-center gap-3">
        <span className="text-gray-400 line-through">
          {product.price.toLocaleString()} تومان
        </span>
        <span className="font-bold text-xl">
          {product.finalPrice.toLocaleString()} تومان
        </span>
      </div>
    );
  }

  return (
    <span className="font-bold text-primary text-xl">
      {product.price.toLocaleString()} تومان
    </span>
  );
}
