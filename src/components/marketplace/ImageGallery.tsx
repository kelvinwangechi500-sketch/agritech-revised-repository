"use client";
import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X, ZoomIn } from "lucide-react";

interface Props {
  images: string[];
  alt: string;
}

export default function ImageGallery({ images, alt }: Props) {
  const [active,   setActive]   = useState(0);
  const [lightbox, setLightbox] = useState(false);

  const prev = useCallback(() => setActive((i) => (i - 1 + images.length) % images.length), [images.length]);
  const next = useCallback(() => setActive((i) => (i + 1) % images.length), [images.length]);

  useEffect(() => {
    if (!lightbox) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft")  prev();
      if (e.key === "ArrowRight") next();
      if (e.key === "Escape")     setLightbox(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightbox, prev, next]);

  if (!images.length) {
    return (
      <div className="aspect-[4/3] rounded-2xl bg-gray-100 flex items-center justify-center text-6xl">
        🌾
      </div>
    );
  }

  return (
    <>
      {/* Main image */}
      <div className="space-y-3">
        <div
          className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-gray-100 group cursor-zoom-in"
          onClick={() => setLightbox(true)}
        >
          <Image
            key={active}
            src={images[active]}
            alt={`${alt} — image ${active + 1}`}
            fill
            priority
            className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
            sizes="(max-width: 1024px) 100vw, 66vw"
          />

          {/* Zoom hint */}
          <div className="absolute top-3 right-3 bg-black/40 text-white rounded-lg p-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
            <ZoomIn size={16} />
          </div>

          {/* Nav arrows */}
          {images.length > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); prev(); }}
                className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/75 text-white rounded-full p-2 transition-all opacity-0 group-hover:opacity-100"
                aria-label="Previous image"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); next(); }}
                className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/75 text-white rounded-full p-2 transition-all opacity-0 group-hover:opacity-100"
                aria-label="Next image"
              >
                <ChevronRight size={18} />
              </button>
              {/* Dot indicators */}
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                {images.map((_, i) => (
                  <button
                    key={i}
                    onClick={(e) => { e.stopPropagation(); setActive(i); }}
                    className={`rounded-full transition-all ${
                      i === active
                        ? "w-5 h-2 bg-white"
                        : "w-2 h-2 bg-white/60 hover:bg-white/80"
                    }`}
                    aria-label={`Go to image ${i + 1}`}
                  />
                ))}
              </div>
              {/* Counter */}
              <div className="absolute bottom-3 right-3 bg-black/50 text-white text-xs font-medium px-2.5 py-1 rounded-full">
                {active + 1} / {images.length}
              </div>
            </>
          )}
        </div>

        {/* Thumbnails */}
        {images.length > 1 && (
          <div className="flex gap-2 overflow-x-auto pb-1">
            {images.map((src, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`relative w-16 h-16 shrink-0 rounded-xl overflow-hidden border-2 transition-all ${
                  i === active
                    ? "border-brand-500 shadow-md"
                    : "border-transparent opacity-60 hover:opacity-90"
                }`}
              >
                <Image src={src} alt={`Thumbnail ${i + 1}`} fill className="object-cover" sizes="64px" />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center animate-fade-in"
          onClick={() => setLightbox(false)}
        >
          {/* Close */}
          <button
            className="absolute top-4 right-4 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-full p-2 transition-all z-10"
            onClick={() => setLightbox(false)}
            aria-label="Close lightbox"
          >
            <X size={22} />
          </button>

          {/* Nav */}
          {images.length > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); prev(); }}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-full p-3 transition-all z-10"
                aria-label="Previous"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); next(); }}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-full p-3 transition-all z-10"
                aria-label="Next"
              >
                <ChevronRight size={24} />
              </button>
            </>
          )}

          {/* Image */}
          <div
            className="relative w-full h-full max-w-5xl max-h-[90vh] px-16"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              key={active}
              src={images[active]}
              alt={`${alt} — image ${active + 1}`}
              fill
              className="object-contain animate-fade-in"
              sizes="100vw"
              priority
            />
          </div>

          {/* Counter */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white/10 text-white text-sm font-medium px-4 py-2 rounded-full">
            {active + 1} / {images.length}
          </div>
        </div>
      )}
    </>
  );
}
