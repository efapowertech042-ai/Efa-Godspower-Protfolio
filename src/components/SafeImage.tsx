import { useState } from 'react';
import { BarChart3, ShieldAlert, Activity, Layers } from 'lucide-react';

interface SafeImageProps {
  src: string;
  alt: string;
  fallbackTitle: string;
  fallbackSubtitle?: string;
  variant?: 'hero' | 'ml' | 'fraud' | 'bi';
  className?: string;
  imgClassName?: string;
}

export function SafeImage({
  src,
  alt,
  fallbackTitle,
  fallbackSubtitle,
  variant = 'bi',
  className = '',
  imgClassName = 'object-cover',
}: SafeImageProps) {
  const [hasError, setHasError] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const Icon =
    variant === 'ml'
      ? Activity
      : variant === 'fraud'
      ? ShieldAlert
      : variant === 'hero'
      ? Layers
      : BarChart3;

  if (hasError) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`relative flex flex-col justify-between overflow-hidden bg-[#0B0F17] p-6 border border-white/[0.08] ${className}`}
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              'radial-gradient(circle at 80% 20%, rgba(245, 158, 11, 0.18), transparent 55%), radial-gradient(circle at 18% 82%, rgba(234, 88, 12, 0.14), transparent 55%), linear-gradient(to right, rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.025) 1px, transparent 1px)',
            backgroundSize: '100% 100%, 100% 100%, 32px 32px, 32px 32px',
          }}
        />
        <div className="relative z-10 flex items-center justify-between">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] text-amber-300">
            <Icon className="h-5 w-5" />
          </span>
          <span className="font-mono text-xs text-slate-400">Efa Godspower · Analytics Visual</span>
        </div>
        <div className="relative z-10 mt-8">
          <p className="font-display text-lg font-semibold text-white">{fallbackTitle}</p>
          {fallbackSubtitle && (
            <p className="mt-1 text-sm text-slate-300 line-clamp-2">{fallbackSubtitle}</p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden bg-[#0B0F17] ${className}`}>
      {!loaded && (
        <div className="absolute inset-0 animate-pulse bg-[#111724]" aria-hidden="true" />
      )}
      <img
        src={src}
        alt={alt}
        referrerPolicy="no-referrer"
        loading="lazy"
        onLoad={() => setLoaded(true)}
        onError={() => setHasError(true)}
        className={`h-full w-full transition-opacity duration-300 ${imgClassName} ${
          loaded ? 'opacity-100' : 'opacity-0'
        }`}
      />
    </div>
  );
}
