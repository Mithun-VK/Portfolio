'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from '@/animations/gsap';
import { SectionHeading } from '@/components/ui/section-heading';
import { fadeUp, stagger, viewportOnce } from '@/animations/variants';
import { awards, certifications, stats } from '@/content/achievements';
import { usePrefersReducedMotion } from '@/hooks/use-prefers-reduced-motion';

/** Number that counts up from zero when scrolled into view. */
function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    if (reduced) {
      el.textContent = `${value}${suffix}`;
      return undefined;
    }
    const counter = { current: 0 };
    const ctx = gsap.context(() => {
      gsap.to(counter, {
        current: value,
        duration: 1.6,
        ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 88%', once: true },
        onUpdate: () => {
          el.textContent = `${Math.round(counter.current)}${suffix}`;
        }
      });
    });
    return () => ctx.revert();
  }, [reduced, suffix, value]);

  return (
    <span ref={ref} className="tabular-nums">
      0{suffix}
    </span>
  );
}

export function Achievements() {
  return (
    <section id="achievements" aria-label="Achievements" className="relative py-28 md:py-40">
      <div aria-hidden="true" className="ambient top-10 left-1/2 h-[24rem] w-[44rem] -translate-x-1/2 bg-accent/8" />
      <div className="container-page">
        <SectionHeading index="05" eyebrow="Proof" title="Numbers that held up." />

        {/* Animated statistics */}
        <motion.dl
          variants={stagger(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid grid-cols-2 gap-px overflow-hidden rounded-card-lg border border-line bg-line lg:grid-cols-4"
        >
          {stats.map(stat => (
            <motion.div key={stat.label} variants={fadeUp} className="bg-surface p-8 md:p-10">
              <dd className="text-5xl font-semibold tracking-tighter text-gradient md:text-6xl">
                <Counter value={stat.value} suffix={stat.suffix} />
              </dd>
              <dt className="mt-3 text-sm text-secondary">{stat.label}</dt>
            </motion.div>
          ))}
        </motion.dl>

        <div className="mt-16 grid gap-12 lg:grid-cols-2">
          {/* Certifications */}
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportOnce}>
            <h3 className="mb-6 font-mono text-xs tracking-[0.2em] text-secondary uppercase">
              Certifications
            </h3>
            <ul className="space-y-3">
              {certifications.map(cert => (
                <li key={cert.name}>
                  <a
                    href={cert.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor="hover"
                    className="group glass flex items-center justify-between gap-4 rounded-card px-6 py-5 transition-colors duration-300 hover:border-accent/40"
                  >
                    <div>
                      <p className="font-medium text-primary">{cert.name}</p>
                      <p className="mt-1 text-sm text-faint">
                        {cert.issuer} · {cert.year}
                      </p>
                    </div>
                    <span
                      aria-hidden="true"
                      className="text-secondary transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-accent-soft"
                    >
                      ↗
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Awards & hackathons */}
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewportOnce}>
            <h3 className="mb-6 font-mono text-xs tracking-[0.2em] text-secondary uppercase">
              Awards & hackathons
            </h3>
            <ul className="space-y-3">
              {awards.map(award => (
                <li
                  key={`${award.title}-${award.event}`}
                  className="glass flex items-center justify-between gap-4 rounded-card px-6 py-5"
                >
                  <div>
                    <p className="font-medium text-primary">{award.title}</p>
                    <p className="mt-1 text-sm text-faint">{award.event}</p>
                  </div>
                  <span className="font-mono text-xs text-secondary">{award.year}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
