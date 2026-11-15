import { useState } from 'react';
import { Globe2 } from 'lucide-react';

interface ResilientImageProps {
  src?: string;
  alt: string;
  className?: string;
  fallbackLabel?: string;
  accent?: 'cyan' | 'blue' | 'purple';
}

export function ResilientImage({
  src,
  alt,
  className = '',
  fallbackLabel,
  accent = 'cyan',
}: ResilientImageProps) {
  const [hasError, setHasError] = useState(false);

  const gradientClass =
    accent === 'purple'
      ? 'from-[#0D1529] via-[#171235] to-[#080E1E]'
      : accent === 'blue'
      ? 'from-[#0D1529] via-[#0F2147] to-[#080E1E]'
      : 'from-[#0D1529] via-[#0B2239] to-[#080E1E]';

  if (!src || hasError) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`relative flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br ${gradientClass} p-6 text-center ${className}`}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-25"
          style={{
            backgroundImage:
              'radial-gradient(circle at 25% 25%, rgba(34, 211, 238, 0.18), transparent 48%), radial-gradient(circle at 75% 75%, rgba(139, 92, 246, 0.16), transparent 52%)',
          }}
        />
        <Globe2 className="relative h-9 w-9 text-cyan-400/75" strokeWidth={1.5} />
        <p className="relative mt-3 max-w-xs text-xs font-medium text-slate-300">
          {fallbackLabel || alt}
        </p>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
    />
  );
}
