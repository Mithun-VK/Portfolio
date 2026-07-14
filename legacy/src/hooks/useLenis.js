import { useEffect } from 'react';
import Lenis from '@studio-freight/lenis';

let lenisInstance = null;

export const getLenis = () => lenisInstance;

/**
 * Smooth-scroll to a Y position (or element) via Lenis when active,
 * falling back to native scrolling otherwise.
 */
export const smoothScrollTo = (target, { offset = 0, immediate = false } = {}) => {
  if (lenisInstance && !immediate) {
    lenisInstance.scrollTo(target, { offset, duration: 1.2 });
    return;
  }

  const top =
    typeof target === 'number'
      ? target + offset
      : target.getBoundingClientRect().top + window.pageYOffset + offset;

  window.scrollTo({ top, behavior: immediate ? 'auto' : 'smooth' });
};

/**
 * Mounts a single Lenis instance for buttery smooth scrolling.
 * Skipped entirely for prefers-reduced-motion users.
 */
const useLenis = () => {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5
    });

    lenisInstance = lenis;

    let rafId;
    const raf = (time) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisInstance = null;
    };
  }, []);
};

export default useLenis;
