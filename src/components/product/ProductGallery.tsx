"use client";

import Image from "next/image";
import { useState } from "react";

export function ProductGallery({ images, name }: { images: string[]; name: string }) {
  const shots = images.filter(Boolean);
  const [active, setActive] = useState(0);
  const current = shots[active] ?? shots[0];

  if (!current) return null;

  return (
    <div className="space-y-3">
      <div className="relative aspect-square overflow-hidden rounded-[2rem] bg-[#f4efe8]">
        <Image src={current} alt={name} fill unoptimized priority className="object-cover" />
      </div>
      {shots.length > 1 && (
        <div className="grid grid-cols-4 gap-2">
          {shots.map((img, index) => (
            <button
              key={`${img}-${index}`}
              type="button"
              onClick={() => setActive(index)}
              className={`relative aspect-square overflow-hidden rounded-xl border-2 ${
                active === index ? "border-[#c9a27a]" : "border-transparent"
              }`}
            >
              <Image src={img} alt={`${name} ${index + 1}`} fill unoptimized className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
