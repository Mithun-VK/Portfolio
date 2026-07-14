'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { SectionHeading } from '@/components/ui/section-heading';
import { RivePlaceholder } from '@/components/ui/rive-placeholder';
import { fadeUp, stagger, viewportOnce } from '@/animations/variants';
import { principles, site } from '@/content/site';

const facts = [
  { label: 'Base', value: 'Chennai, India' },
  { label: 'Education', value: 'BE CSE · Anna University' },
  { label: 'Focus', value: 'AI · Finance · Products' },
  { label: 'Studio', value: 'Catalyst Labs' }
] as const;

export function About() {
  return (
    <section id="about" aria-label="About" className="relative py-28 md:py-40">
      <div aria-hidden="true" className="ambient top-20 right-[-10rem] h-[26rem] w-[26rem] bg-teal/8" />
      <div className="container-page">
        <SectionHeading
          index="01"
          eyebrow="About"
          title="Engineering products that think."
          description="Software engineer and founder building at the intersection of AI, quantitative finance and product design — obsessed with the details most people never notice."
        />

        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          {/* Portrait + facts card */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="glass relative overflow-hidden rounded-card-lg p-8 md:p-10"
          >
            <div className="flex flex-col gap-8 sm:flex-row sm:items-center">
              <div className="relative h-36 w-36 shrink-0 overflow-hidden rounded-card border border-line">
                <Image
                  src="/assets/images/me.jpg"
                  alt={`Portrait of ${site.name}`}
                  fill
                  sizes="144px"
                  className="object-cover object-top"
                />
              </div>
              <div>
                <h3 className="text-2xl font-semibold tracking-tight">{site.name}</h3>
                <p className="mt-2 leading-relaxed text-secondary">
                  I ship full-stack and AI products end to end — React frontends, Python backends,
                  ML pipelines — with measurable outcomes and deliberate design.
                </p>
              </div>
            </div>

            <motion.dl
              variants={stagger(0.08)}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              className="mt-10 grid grid-cols-2 gap-x-6 gap-y-6 border-t border-line pt-8 md:grid-cols-4"
            >
              {facts.map(fact => (
                <motion.div key={fact.label} variants={fadeUp}>
                  <dt className="font-mono text-[0.65rem] tracking-[0.2em] text-faint uppercase">
                    {fact.label}
                  </dt>
                  <dd className="mt-2 text-sm text-primary">{fact.value}</dd>
                </motion.div>
              ))}
            </motion.dl>
          </motion.div>

          {/* Rive slot */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            <RivePlaceholder label="Interactive illustration — Rive slot" />
          </motion.div>
        </div>

        {/* Mission / Vision / Principles */}
        <motion.div
          variants={stagger(0.12)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-6 grid gap-6 md:grid-cols-3"
        >
          {principles.map((item, i) => (
            <motion.article
              key={item.title}
              variants={fadeUp}
              data-cursor="hover"
              className="group glass relative overflow-hidden rounded-card p-8 transition-colors duration-500 hover:border-accent/40"
            >
              <span className="font-mono text-xs text-faint">0{i + 1}</span>
              <h3 className="mt-4 text-xl font-semibold tracking-tight">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-secondary">{item.body}</p>
              <span
                aria-hidden="true"
                className="absolute inset-x-8 bottom-0 h-px origin-left scale-x-0 bg-gradient-to-r from-accent to-transparent transition-transform duration-700 group-hover:scale-x-100"
              />
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
