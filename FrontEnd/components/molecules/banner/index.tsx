import React from 'react';

import Image from 'next/image';

export function Banner({
  src,
  name,
}: {
  src: string;
  name: string;
}) {
  return (
    <div className="relative w-full h-56 md:h-96 overflow-hidden">
      <div
        className={`absolute inset-0 transition-opacity duration-700 ease-in-out z-10`}
      >
        <Image src={src} alt={name} fill className="object-cover" priority />
        
        <div className="bottom-0 z-20 absolute hover:bg-gray-700 bg-opacity-35 p-2 w-full text-white text-center transition-all duration-500">
          <div>{name}</div>
        </div>
      </div>
    </div>
  );
}
