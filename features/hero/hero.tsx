'use client';

import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { SplitReveal } from '@/animations/split-reveal';
import { fadeUp, stagger } from '@/animations/variants';
import { AvailabilityBadge } from '@/components/ui/availability-badge';
import { MagneticLink, MagneticButton } from '@/components/ui/magnetic-button';
import { site } from '@/content/site';
import { scrollToId } from '@/lib/scroll';
import { usePrefersReducedMotion } from '@/hooks/use-prefers-reduced-motion';
import { RotatingRole } from './rotating-role';
import { HeroPortrait } from './hero-portrait';

const HeroScene = dynamic(() => import('@/three/hero-scene'), {
  ssr: false,
  loading: () => null
});

export function Hero() {
  const reduced = usePrefersReducedMotion();

  return (
    <section id="hero" aria-label="Introduction" className="relative flex min-h-svh items-center overflow-hidden">
      {/* 3D background + ambient light + readability vignette */}
      <HeroScene still={reduced} />
      <div aria-hidden="true" className="ambient top-[-10rem] right-[-8rem] h-[34rem] w-[34rem] bg-accent/15" />
      <div aria-hidden="true" className="ambient bottom-[-12rem] left-[-10rem] h-[28rem] w-[28rem] bg-purple/10" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_35%_50%,transparent_20%,#050505_95%)]"
      />

      <div className="container-page relative z-10 grid items-center gap-14 pt-32 pb-24 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10">
        <motion.div variants={stagger(0.12, 0.3)} initial="hidden" animate="visible">
          <motion.div variants={fadeUp}>
            <AvailabilityBadge />
          </motion.div>

          <h1 className="mt-8">
            <SplitReveal
              as="span"
              by="words"
              trigger="mount"
              delay={0.35}
              className="block text-lg font-normal tracking-normal text-secondary md:text-xl"
            >
              My name is
            </SplitReveal>
            <SplitReveal
              as="span"
              by="chars"
              trigger="mount"
              delay={0.55}
              innerClass="text-gradient"
              className="mt-2 block text-[clamp(3.5rem,11vw,8.5rem)] leading-[0.95] font-semibold tracking-tighter"
            >
              Mithun
            </SplitReveal>
          </h1>

          <motion.p
            variants={fadeUp}
            className="mt-8 text-2xl font-medium tracking-tight text-primary md:text-4xl"
          >
            <RotatingRole roles={site.roles} />
          </motion.p>

          <motion.p variants={fadeUp} className="mt-5 max-w-xl text-base leading-relaxed text-secondary md:text-lg">
            {site.founderLine}. {site.tagline}
          </motion.p>

          <motion.div variants={fadeUp} className="mt-10 flex flex-wrap items-center gap-4">
            <MagneticButton onClick={() => scrollToId('projects')}>
              Explore the work
            </MagneticButton>
            <MagneticLink variant="ghost" href={site.resumeUrl} target="_blank" rel="noopener noreferrer">
              Résumé ↗
            </MagneticLink>
          </motion.div>
        </motion.div>

        <HeroPortrait />
      </div>

      <motion.button
        type="button"
        onClick={() => scrollToId('about')}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-3 font-mono text-[0.65rem] tracking-[0.25em] text-faint uppercase transition-colors hover:text-secondary md:flex"
        aria-label="Scroll to about section"
      >
        Scroll
        <span aria-hidden="true" className="relative h-10 w-px overflow-hidden bg-line">
          <span className="absolute inset-x-0 top-0 h-1/2 animate-[scrollHint_1.8s_ease-in-out_infinite] bg-accent motion-reduce:animate-none" />
        </span>
      </motion.button>
    </section>
  );
}
