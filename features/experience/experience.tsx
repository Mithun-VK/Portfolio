'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from '@/animations/gsap';
import { SectionHeading } from '@/components/ui/section-heading';
import { fadeUp, viewportOnce } from '@/animations/variants';
import { timeline } from '@/content/experience';
import { usePrefersReducedMotion } from '@/hooks/use-prefers-reduced-motion';
import type { TimelineItem } from '@/types/content';

const kindLabel: Record<TimelineItem['kind'], string> = {
  venture: 'Venture',
  work: 'Experience',
  education: 'Education'
};

const kindDot: Record<TimelineItem['kind'], string> = {
  venture: 'bg-accent shadow-[0_0_16px_rgba(59,130,246,0.7)]',
  work: 'bg-teal shadow-[0_0_16px_rgba(45,212,191,0.6)]',
  education: 'bg-purple shadow-[0_0_16px_rgba(139,92,246,0.6)]'
};

export function Experience() {
  const lineRef = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  // The spine draws itself as the timeline scrolls through the viewport
  useEffect(() => {
    const line = lineRef.current;
    if (!line) return undefined;
    if (reduced) {
      line.style.transform = 'scaleY(1)';
      return undefined;
    }
    const ctx = gsap.context(() => {
      gsap.fromTo(
        line,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: line.parentElement,
            start: 'top 75%',
            end: 'bottom 55%',
            scrub: 0.6
          }
        }
      );
    });
    return () => ctx.revert();
  }, [reduced]);

  return (
    <section id="experience" aria-label="Experience" className="relative py-28 md:py-40">
      <div className="container-page">
        <SectionHeading
          index="04"
          eyebrow="Journey"
          title="Milestones, in order of ambition."
        />

        <div className="relative mx-auto max-w-3xl">
          <div
            aria-hidden="true"
            className="absolute top-0 bottom-0 left-[7px] w-px bg-line md:left-1/2"
          >
            <div
              ref={lineRef}
              className="h-full w-full origin-top scale-y-0 bg-gradient-to-b from-accent via-purple to-teal"
            />
          </div>

          <ol className="space-y-14">
            {timeline.map((item, i) => {
              const right = i % 2 === 1;
              return (
                <motion.li
                  key={`${item.org}-${item.title}`}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={viewportOnce}
                  className="relative pl-10 md:grid md:grid-cols-2 md:gap-14 md:pl-0"
                >
                  <span
                    aria-hidden="true"
                    className={`absolute top-2 left-0 h-[15px] w-[15px] rounded-full border-4 border-background md:left-1/2 md:-translate-x-1/2 ${kindDot[item.kind]}`}
                  />
                  <div className={right ? 'md:col-start-2 md:pl-14' : 'md:pr-14 md:text-right'}>
                    <p className="font-mono text-xs tracking-[0.2em] text-faint uppercase">
                      {kindLabel[item.kind]} · {item.period}
                    </p>
                    <h3 className="mt-3 text-2xl font-semibold tracking-tight">{item.title}</h3>
                    <p className="mt-1 text-secondary">{item.org}</p>
                    <ul className={`mt-4 space-y-2 text-sm leading-relaxed text-secondary ${right ? '' : 'md:ml-auto md:max-w-sm'}`}>
                      {item.points.map(point => (
                        <li key={point}>{point}</li>
                      ))}
                    </ul>
                  </div>
                </motion.li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
