import { cn } from '@/lib/utils';

/**
 * Un iPad (paysage) dessiné en CSS : cadre d'aluminium sombre, bord d'écran noir, reflet discret.
 * L'écran garde le ratio des captures de l'app (1180 × 820).
 */
export function IPad({
  children,
  className,
  glow = true,
}: {
  children: React.ReactNode;
  className?: string;
  glow?: boolean;
}): React.JSX.Element {
  return (
    <div className={cn('relative', className)}>
      {glow && (
        <div
          aria-hidden
          className="pointer-events-none absolute -inset-[8%] -z-10 rounded-[12%] bg-[radial-gradient(closest-side,rgb(139_92_246/0.45),transparent)] blur-2xl"
        />
      )}
      <div className="rounded-[3.2%/4.6%] bg-[linear-gradient(145deg,#3a3a46,#141419_40%,#26262f)] p-[1.15%] shadow-[0_40px_120px_-20px_rgb(0_0_0/0.9),0_0_0_1px_rgb(255_255_255/0.08)_inset]">
        <div className="relative overflow-hidden rounded-[2.2%/3.2%] bg-black p-[1.6%]">
          <div className="bg-night relative aspect-[1180/820] overflow-hidden rounded-[1.2%/1.7%]">
            {children}
            {/* reflet du verre */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-[linear-gradient(115deg,rgb(255_255_255/0.07)_0%,transparent_28%,transparent_70%,rgb(255_255_255/0.03)_100%)]"
            />
          </div>
          {/* caméra frontale */}
          <div
            aria-hidden
            className="absolute left-1/2 top-[0.55%] size-[0.7%] -translate-x-1/2 rounded-full bg-[#1d1d26]"
          />
        </div>
      </div>
    </div>
  );
}

/** Une capture de l'app dans l'iPad : image nette en Retina, plus légère sur mobile. */
export function Screen({
  src,
  srcSet,
  alt,
  className,
  priority = false,
}: {
  src: string;
  srcSet: string;
  alt: string;
  className?: string;
  priority?: boolean;
}): React.JSX.Element {
  return (
    // une <img> simple : Cloudflare Pages n'optimise pas les images de Next
    <img
      src={src}
      srcSet={srcSet}
      sizes="(min-width: 1280px) 1100px, 92vw"
      alt={alt}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      draggable={false}
      className={cn('absolute inset-0 size-full object-cover', className)}
    />
  );
}
