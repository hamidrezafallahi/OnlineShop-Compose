'use client';

import {
  useEffect,
  useState,
} from 'react';

import MediaImage from '@components/atoms/MediaImage';
import { IDetailedProduct } from '@models/product';
import { toMediaUrl } from '@utils/toMediaUrl';

export default function ProductGallery({ product }: { product: IDetailedProduct }) {
  const [activeImage, setActiveImage] = useState<string>(toMediaUrl(product?.mainImage));

  useEffect(() => {
    if (product?.mainImage) {
      setActiveImage(toMediaUrl(product.mainImage));
    }
  }, [product?.mainImage]);
  const defaultImage = '/images/default-product.jpg';
  return (
    <div className="bg-white shadow-sm p-4 rounded-2xl">
      <div className="relative bg-gray-100 rounded-2xl h-72 md:h-[420px] overflow-hidden">
        {(activeImage || product?.mainImage) && (
          <MediaImage
            src={activeImage || product.mainImage}
            fallbackSrc={defaultImage}
            alt={product.name || 'Product image'}
            fill
            priority={true}
            sizes="(max-width: 768px) 100vw, 50vw"
            quality={85}
            className="object-cover transition-opacity duration-300"
            loading="eager"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = defaultImage;
            }}
          />
        )}
      </div>

      {/* گالری تصاویر کوچک */}
      {product.imageUrls?.length > 0 && (
        <div className="flex items-center gap-3 p-2 overflow-x-auto">
          {product.imageUrls.map((img, index) => (
            <button
              key={`${img}-${index}`}
              onClick={() => setActiveImage(toMediaUrl(img))}
              className={`relative flex-shrink-0 w-16 h-16 rounded-xl overflow-hidden transition-all ${
                toMediaUrl(img) === activeImage
                  ? 'ring-2 ring-primary scale-105'
                  : 'opacity-70 hover:opacity-100'
              }`}
              aria-label={`View image ${index + 1}`}
            >
              <MediaImage
                src={img}
                alt={`${product.name} - view ${index + 1}`}
                fill
                sizes="64px"
                className="object-cover"
                loading={index < 4 ? 'eager' : 'lazy'}
                priority={false}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
