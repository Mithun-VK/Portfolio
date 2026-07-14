'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { gsap } from '@/animations/gsap';
import { SectionHeading } from '@/components/ui/section-heading';
import { fadeUp, stagger, viewportOnce } from '@/animations/variants';
import { archiveProjects, featuredProjects } from '@/content/projects';
import { usePrefersReducedMotion } from '@/hooks/use-prefers-reduced-motion';
import { ProjectPanel } from './project-panel';

/**
 * Cinematic project reel: on desktop the section pins and panels travel
 * horizontally, scrubbed by scroll, with per-panel parallax and media
 * reveals. On mobile / reduced motion it degrades to a vertical stack.
 */
export function Projects() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  const [horizontal, setHorizontal] = useState(false);

  useEffect(() => {
    const update = () => setHorizontal(window.innerWidth >= 1024 && !reduced);
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, [reduced]);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track || !horizontal) return undefined;

    const ctx = gsap.context(() => {
      const distance = () => track.scrollWidth - window.innerWidth;

      const tween = gsap.to(track, {
        x: () => -distance(),
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: self => {
            if (progressRef.current) {
              progressRef.current.style.transform = `scaleX(${self.progress})`;
            }
          }
        }
      });

      // Per-panel choreography, timed against the horizontal container motion
      const panels = gsap.utils.toArray<HTMLElement>('.project-panel', track);
      panels.forEach(panel => {
        const media = panel.querySelector<HTMLElement>('[data-reveal="media"]');
        const ghost = panel.querySelector<HTMLElement>('[data-parallax="ghost"]');

        if (media) {
          gsap.fromTo(
            media,
            { clipPath: 'inset(12% 40% 12% 0% round 32px)', scale: 1.06 },
            {
              clipPath: 'inset(0% 0% 0% 0% round 32px)',
              scale: 1,
              ease: 'none',
              scrollTrigger: {
                trigger: panel,
                containerAnimation: tween,
                start: 'left 80%',
                end: 'left 25%',
                scrub: true
              }
            }
          );
        }

        if (ghost) {
          gsap.fromTo(
            ghost,
            { xPercent: 18 },
            {
              xPercent: -18,
              ease: 'none',
              scrollTrigger: {
                trigger: panel,
                containerAnimation: tween,
                start: 'left right',
                end: 'right left',
                scrub: true
              }
            }
          );
        }
      });
    }, section);

    return () => ctx.revert();
  }, [horizontal]);

  return (
    <section id="projects" aria-label="Projects" className="relative">
      <div className="container-page pt-28 md:pt-40">
        <SectionHeading
          index="03"
          eyebrow="Selected work"
          title="Projects built like products."
          description="Not case studies on a shelf — systems that trade, forecast, score risk and run classrooms. Scroll through the reel."
        />
      </div>

      {horizontal ? (
        <div ref={sectionRef} className="relative h-svh overflow-hidden">
          <div ref={trackRef} className="flex h-full will-change-transform">
            {featuredProjects.map((project, i) => (
              <ProjectPanel key={project.slug} project={project} index={i} total={featuredProjects.length} />
            ))}
          </div>
          <div
            aria-hidden="true"
            className="absolute bottom-8 left-1/2 h-px w-48 -translate-x-1/2 overflow-hidden rounded-full bg-white/10"
          >
            <div ref={progressRef} className="h-full w-full origin-left scale-x-0 bg-accent" />
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {featuredProjects.map((project, i) => (
            <div key={project.slug} className="min-h-[80svh] [&_.project-panel]:w-full [&_.project-panel]:py-16">
              <ProjectPanel project={project} index={i} total={featuredProjects.length} />
            </div>
          ))}
        </div>
      )}

      {/* Archive strip — earlier shipped work with real screenshots */}
      <div className="container-page py-24 md:py-32">
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mb-8 font-mono text-xs tracking-[0.2em] text-secondary uppercase"
        >
          From the archive
        </motion.p>
        <motion.div
          variants={stagger(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid gap-6 md:grid-cols-3"
        >
          {archiveProjects.map(project => (
            <motion.a
              key={project.title}
              variants={fadeUp}
              href={project.live ?? project.github ?? '#'}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="hover"
              className="group glass overflow-hidden rounded-card transition-colors duration-500 hover:border-accent/40"
            >
              <div className="relative aspect-video overflow-hidden bg-surface">
                {project.image ? (
                  <Image
                    src={project.image}
                    alt={`${project.title} screenshot`}
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  />
                ) : (
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-[radial-gradient(circle_at_40%_30%,rgba(139,92,246,0.2),transparent_60%)]"
                  />
                )}
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold tracking-tight">{project.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-secondary">{project.description}</p>
                <p className="mt-4 font-mono text-[0.65rem] text-faint">{project.stack.join(' · ')}</p>
              </div>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
