'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { usePrefersReducedMotion } from '@/hooks/use-prefers-reduced-motion';
import { EASE_PREMIUM } from '@/animations/variants';

/** Rotating subtitle — cycles roles with a masked slide, pinned for reduced motion. */
export function RotatingRole({ roles }: { roles: string[] }) {
  const [index, setIndex] = useState(0);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced || roles.length < 2) return undefined;
    const id = window.setInterval(() => setIndex(i => (i + 1) % roles.length), 2600);
    return () => window.clearInterval(id);
  }, [reduced, roles.length]);

  const current = roles[index] ?? roles[0] ?? '';

  return (
    <span
      className="relative inline-flex h-[1.4em] items-center overflow-hidden align-bottom"
      aria-live="polite"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={current}
          initial={{ y: '110%', opacity: 0 }}
          animate={{ y: '0%', opacity: 1 }}
          exit={{ y: '-110%', opacity: 0 }}
          transition={{ duration: 0.5, ease: EASE_PREMIUM }}
          className="text-gradient-accent whitespace-nowrap"
        >
          {current}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
