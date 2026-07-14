'use client';

import { useRef, useCallback } from 'react';
import { gsap } from '@/animations/gsap';
import { usePrefersReducedMotion } from '@/hooks/use-prefers-reduced-motion';

/**
 * Magnetic hover: the element leans toward the pointer and springs back.
 * Attach the returned handlers + ref to any wrapper element.
 */
export function useMagnetic<T extends HTMLElement>(strength = 0.35) {
  const ref = useRef<T | null>(null);
  const reduced = usePrefersReducedMotion();

  const onPointerMove = useCallback(
    (e: React.PointerEvent<T>) => {
      const el = ref.current;
      if (!el || reduced || e.pointerType !== 'mouse') return;
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) * strength;
      const y = (e.clientY - rect.top - rect.height / 2) * strength;
      gsap.to(el, { x, y, duration: 0.4, ease: 'power3.out' });
    },
    [reduced, strength]
  );

  const onPointerLeave = useCallback(() => {
    const el = ref.current;
    if (!el || reduced) return;
    gsap.to(el, { x: 0, y: 0, duration: 0.7, ease: 'elastic.out(1, 0.4)' });
  }, [reduced]);

  return { ref, onPointerMove, onPointerLeave };
}
