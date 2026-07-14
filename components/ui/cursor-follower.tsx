'use client';

import { useEffect, useRef } from 'react';
import { gsap } from '@/animations/gsap';
import { usePrefersReducedMotion } from '@/hooks/use-prefers-reduced-motion';

/**
 * Two-part custom cursor: a crisp dot and a lagging ring that swells over
 * any element carrying [data-cursor]. Pure transform work — no layout cost.
 * Hidden entirely on touch devices and for reduced-motion users (CSS).
 */
export function CursorFollower() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring || reduced) return undefined;
    if (window.matchMedia('(hover: none)').matches) return undefined;

    const dotX = gsap.quickTo(dot, 'x', { duration: 0.08, ease: 'power2.out' });
    const dotY = gsap.quickTo(dot, 'y', { duration: 0.08, ease: 'power2.out' });
    const ringX = gsap.quickTo(ring, 'x', { duration: 0.45, ease: 'power3.out' });
    const ringY = gsap.quickTo(ring, 'y', { duration: 0.45, ease: 'power3.out' });

    const onMove = (e: PointerEvent) => {
      dotX(e.clientX);
      dotY(e.clientY);
      ringX(e.clientX);
      ringY(e.clientY);
    };

    const onOver = (e: PointerEvent) => {
      const interactive = (e.target as HTMLElement).closest('[data-cursor], a, button');
      gsap.to(ring, {
        scale: interactive ? 2.2 : 1,
        opacity: interactive ? 0.35 : 0.6,
        duration: 0.35,
        ease: 'power3.out'
      });
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerover', onOver, { passive: true });
    return () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerover', onOver);
    };
  }, [reduced]);

  return (
    <div aria-hidden="true" className="cursor-follower pointer-events-none fixed inset-0 z-[90]">
      <div
        ref={dotRef}
        className="absolute -top-[3px] -left-[3px] h-1.5 w-1.5 rounded-full bg-white"
      />
      <div
        ref={ringRef}
        className="absolute -top-4 -left-4 h-8 w-8 rounded-full border border-white/50 opacity-60"
      />
    </div>
  );
}
