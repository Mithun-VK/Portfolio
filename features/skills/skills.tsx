'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from '@/animations/gsap';
import { SectionHeading } from '@/components/ui/section-heading';
import { fadeUp, stagger, viewportOnce } from '@/animations/variants';
import { orbitTech, skillGroups } from '@/content/skills';
import { usePrefersReducedMotion } from '@/hooks/use-prefers-reduced-motion';
import { cn } from '@/lib/utils';

const accentBar: Record<string, string> = {
  blue: 'from-accent to-accent-soft',
  purple: 'from-purple to-accent-soft',
  teal: 'from-teal to-accent-soft'
};

/** Concentric orbiting rings of technology chips (chips counter-rotate to stay upright). */
function Orbit() {
  return (
    <div aria-hidden="true" className="relative mx-auto aspect-square w-full max-w-md select-none">
      <span className="absolute top-1/2 left-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent shadow-[0_0_40px_rgba(59,130,246,0.7)]" />
      {orbitTech.map((ring, ringIndex) => (
        <div
          key={ringIndex}
          className={`absolute rounded-full border border-line orbit-ring-${ringIndex}`}
          style={{ inset: `${ringIndex * 16}%` }}
        >
          {ring.map((tech, i) => {
            const rad = (i / ring.length) * Math.PI * 2;
            return (
              <span
                key={tech}
                className="absolute -translate-x-1/2 -translate-y-1/2"
                style={{
                  left: `${50 + 50 * Math.cos(rad)}%`,
                  top: `${50 + 50 * Math.sin(rad)}%`
                }}
              >
                <span
                  className={`glass inline-block rounded-full px-3 py-1.5 font-mono text-[0.65rem] whitespace-nowrap text-secondary orbit-chip-${ringIndex}`}
                >
                  {tech}
                </span>
              </span>
            );
          })}
        </div>
      ))}
    </div>
  );
}

/** Progress bar animated by GSAP when scrolled into view. */
function SkillBar({ name, level, gradient }: { name: string; level: number; gradient: string }) {
  const barRef = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const el = barRef.current;
    if (!el) return undefined;
    if (reduced) {
      el.style.width = `${level}%`;
      return undefined;
    }
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { width: '0%' },
        {
          width: `${level}%`,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 90%', once: true }
        }
      );
    });
    return () => ctx.revert();
  }, [level, reduced]);

  return (
    <div>
      <div className="flex items-baseline justify-between">
        <span className="text-sm text-primary">{name}</span>
        <span className="font-mono text-xs text-faint">{level}</span>
      </div>
      <div className="mt-2 h-1 overflow-hidden rounded-full bg-white/[0.06]">
        <div ref={barRef} className={cn('h-full rounded-full bg-gradient-to-r', gradient)} style={{ width: 0 }} />
      </div>
    </div>
  );
}

export function Skills() {
  return (
    <section id="skills" aria-label="Skills" className="relative py-28 md:py-40">
      <div aria-hidden="true" className="ambient top-40 left-[-12rem] h-[30rem] w-[30rem] bg-purple/8" />
      <div className="container-page">
        <SectionHeading
          index="02"
          eyebrow="Skills"
          title="A system of capabilities."
          description="Frontend to models to markets — every layer of the stack, treated as one product surface."
        />

        <div className="grid items-center gap-16 lg:grid-cols-[0.9fr_1.1fr]">
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportOnce}>
            <Orbit />
          </motion.div>

          <motion.div
            variants={stagger(0.1)}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="grid gap-6 sm:grid-cols-2"
          >
            {skillGroups.map(group => (
              <motion.div
                key={group.id}
                variants={fadeUp}
                className="glass rounded-card p-6 transition-colors duration-500 hover:border-accent/40"
                data-cursor="hover"
              >
                <h3 className="mb-5 font-mono text-xs tracking-[0.2em] text-secondary uppercase">
                  {group.label}
                </h3>
                <div className="space-y-4">
                  {group.skills.map(skill => (
                    <SkillBar
                      key={skill.name}
                      name={skill.name}
                      level={skill.level}
                      gradient={accentBar[group.accent] ?? accentBar.blue!}
                    />
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
