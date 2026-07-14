'use client';

import { useEffect, useRef, type ElementType, type ReactNode } from 'react';
import SplitType from 'split-type';
import { gsap } from '@/animations/gsap';
import { usePrefersReducedMotion } from '@/hooks/use-prefers-reduced-motion';
import { cn } from '@/lib/utils';

interface SplitRevealProps {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  /** 'words' for headings, 'chars' for short hero lines. */
  by?: 'words' | 'chars';
  delay?: number;
  /** Animate on scroll into view (default) or immediately on mount. */
  trigger?: 'scroll' | 'mount';
  /**
   * Class applied to each split unit instead of the wrapper. Required for
   * background-clip gradients: clipped text on a parent goes invisible in
   * Chromium once children carry their own transforms.
   */
  innerClass?: string;
}

/** SplitType-powered text reveal: masked lines rising with a soft blur. */
export function SplitReveal({
  children,
  as: Tag = 'div',
  className,
  by = 'words',
  delay = 0,
  trigger = 'scroll',
  innerClass
}: SplitRevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || reduced) return undefined;

    const split = new SplitType(el, {
      types: by === 'chars' ? 'lines,chars' : 'lines,words',
      lineClass: 'split-line',
      ...(innerClass
        ? by === 'chars'
          ? { charClass: `char ${innerClass}` }
          : { wordClass: `word ${innerClass}` }
        : {})
    });
    const targets = by === 'chars' ? split.chars : split.words;
    if (!targets || targets.length === 0) {
      split.revert();
      return undefined;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        targets,
        { yPercent: 110, opacity: 0, filter: 'blur(6px)' },
        {
          yPercent: 0,
          opacity: 1,
          filter: 'blur(0px)',
          duration: 0.9,
          ease: 'power4.out',
          delay,
          stagger: by === 'chars' ? 0.02 : 0.045,
          ...(trigger === 'scroll'
            ? { scrollTrigger: { trigger: el, start: 'top 85%', once: true } }
            : {})
        }
      );
    }, el);

    return () => {
      ctx.revert();
      split.revert();
    };
  }, [by, delay, reduced, trigger, innerClass]);

  // Narrow the polymorphic tag for JSX typing; runtime element is whatever `as` says.
  const Comp = Tag as 'div';
  return (
    <Comp ref={ref as React.Ref<HTMLDivElement>} className={cn(className)}>
      {children}
    </Comp>
  );
}
