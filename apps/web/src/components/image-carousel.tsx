'use client';

import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import * as React from 'react';

import { cn } from '@/lib/utils';

interface ImageCarouselProps {
  images: string[];
  interval?: number;
  className?: string;
  aspectRatio?: string;
}

export function ImageCarousel({
  images,
  interval = 3000,
  className,
  aspectRatio = 'aspect-video',
}: ImageCarouselProps): React.JSX.Element {
  const [currentIndex, setCurrentIndex] = React.useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, interval);

    return () => clearInterval(timer);
  }, [images.length, interval]);

  return (
    <div className={cn('relative overflow-hidden rounded-xl bg-black/40', aspectRatio, className)}>
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 h-full w-full"
        >
          <Image
            src={images[currentIndex]}
            alt={`Slide ${currentIndex + 1}`}
            fill
            className="object-contain"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={currentIndex === 0}
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* Indicators */}
      <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={cn(
              'h-1.5 rounded-full transition-all',
              index === currentIndex ? 'w-6 bg-white' : 'w-1.5 bg-white/40 hover:bg-white/60',
            )}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
