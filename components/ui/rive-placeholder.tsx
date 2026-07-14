'use client';

import { cn } from '@/lib/utils';

/**
 * Reserved slot for a Rive interactive illustration.
 *
 * To activate: `npm i @rive-app/react-canvas`, drop a `.riv` file in
 * `public/rive/`, and replace the inner markup with:
 *
 *   const { RiveComponent } = useRive({ src: '/rive/scene.riv', autoplay: true });
 *   return <RiveComponent className="h-full w-full" />;
 *
 * Until then it renders a lightweight CSS orbital that matches the design system.
 */
export function RivePlaceholder({ label, className }: { label: string; className?: string }) {
  return (
    <div
      role="img"
      aria-label={label}
      className={cn(
        'glass relative flex h-full min-h-72 items-center justify-center overflow-hidden rounded-card-lg',
        className
      )}
    >
      <div aria-hidden="true" className="relative h-48 w-48">
        <span className="absolute inset-0 animate-[spin_14s_linear_infinite] rounded-full border border-accent/30 motion-reduce:animate-none" />
        <span className="absolute inset-6 animate-[spin_10s_linear_infinite_reverse] rounded-full border border-purple/30 motion-reduce:animate-none" />
        <span className="absolute inset-12 animate-[spin_7s_linear_infinite] rounded-full border border-teal/30 motion-reduce:animate-none" />
        <span className="absolute top-1/2 left-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent shadow-[0_0_24px_rgba(59,130,246,0.8)]" />
        <span className="absolute top-0 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-teal" />
        <span className="absolute bottom-6 left-6 h-1.5 w-1.5 rounded-full bg-purple" />
      </div>
      <p className="absolute bottom-4 font-mono text-[0.6rem] tracking-[0.2em] text-faint uppercase">
        {label}
      </p>
    </div>
  );
}
