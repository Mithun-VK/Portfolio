'use client';

import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { SectionHeading } from '@/components/ui/section-heading';
import { fadeUp, stagger, viewportOnce } from '@/animations/variants';
import { groupColors, techNodes } from '@/content/tech-stack';
import { usePrefersReducedMotion } from '@/hooks/use-prefers-reduced-motion';

const TechNetwork = dynamic(() => import('@/three/tech-network'), {
  ssr: false,
  loading: () => <div className="h-[26rem] w-full md:h-[32rem]" aria-hidden="true" />
});

const groups = [
  { id: 'frontend', label: 'Frontend' },
  { id: 'backend', label: 'Backend' },
  { id: 'ai', label: 'AI / ML' },
  { id: 'data', label: 'Data' },
  { id: 'infra', label: 'Infra' }
] as const;

export function TechStack() {
  const reduced = usePrefersReducedMotion();

  return (
    <section id="tech-stack" aria-label="Technology ecosystem" className="relative py-28 md:py-40">
      <div aria-hidden="true" className="ambient right-[-8rem] bottom-0 h-[28rem] w-[28rem] bg-teal/8" />
      <div className="container-page">
        <SectionHeading
          index="06"
          eyebrow="Ecosystem"
          title="One connected stack."
          description="Hover the constellation — every node is a technology in active production use."
        />

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="glass overflow-hidden rounded-card-lg"
        >
          <TechNetwork still={reduced} />

          {/* Accessible mirror of the 3D scene + legend */}
          <div className="border-t border-line p-6 md:p-8">
            <motion.ul
              variants={stagger(0.03)}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              className="flex flex-wrap gap-2"
              aria-label="Technologies"
            >
              {techNodes.map(node => (
                <motion.li
                  key={node.id}
                  variants={fadeUp}
                  className="glass inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 font-mono text-xs text-secondary"
                >
                  <span
                    aria-hidden="true"
                    className="h-1.5 w-1.5 rounded-full"
                    style={{ backgroundColor: groupColors[node.group] }}
                  />
                  {node.label}
                </motion.li>
              ))}
            </motion.ul>
            <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-2" aria-label="Legend">
              {groups.map(group => (
                <li key={group.id} className="flex items-center gap-2 text-xs text-faint">
                  <span
                    aria-hidden="true"
                    className="h-1.5 w-1.5 rounded-full"
                    style={{ backgroundColor: groupColors[group.id] }}
                  />
                  {group.label}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
