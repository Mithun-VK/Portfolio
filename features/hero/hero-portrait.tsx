'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { EASE_PREMIUM } from '@/animations/variants';
import { site } from '@/content/site';
import { usePrefersReducedMotion } from '@/hooks/use-prefers-reduced-motion';

/**
 * Animated hero portrait: rotating ambient halo, masked image reveal,
 * then a slow float. Everything collapses to a static frame for
 * reduced-motion users.
 */
export function HeroPortrait() {
  const reduced = usePrefersReducedMotion();

  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 36, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 1, delay: 0.8, ease: EASE_PREMIUM }}
      className="relative mx-auto w-full max-w-[280px] lg:max-w-[360px]"
    >
      {/* Rotating ambient halo */}
      <div
        aria-hidden="true"
        className="orbit-ring-1 absolute -inset-8 rounded-[48px] bg-[conic-gradient(from_0deg,rgba(59,130,246,0.35),rgba(139,92,246,0.15),rgba(45,212,191,0.25),rgba(59,130,246,0.35))] opacity-35 blur-2xl"
      />

      <motion.div
        animate={reduced ? undefined : { y: [-7, 7] }}
        transition={{ duration: 5.5, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }}
        className="relative"
      >
        <div className="relative aspect-[4/5] overflow-hidden rounded-card-lg border border-line shadow-[0_24px_80px_rgba(0,0,0,0.5)]">
          <Image
            src="/assets/images/profile.jpg"
            alt={`Portrait of ${site.name}`}
            fill
            priority
            sizes="(min-width: 1024px) 360px, 280px"
            className="object-cover object-top"
          />
          {/* Masked reveal: a curtain that lifts once the entrance settles */}
          <motion.div
            aria-hidden="true"
            initial={reduced ? { y: '-101%' } : { y: '0%' }}
            animate={{ y: '-101%' }}
            transition={{ duration: 0.9, delay: 1.05, ease: EASE_PREMIUM }}
            className="absolute inset-0 bg-background"
          />
          {/* Matte grade so the photo sits in the dark scene */}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-background/55 via-transparent to-transparent"
          />
        </div>

        {/* Floating identity chip */}
        <motion.p
          initial={reduced ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.7, ease: EASE_PREMIUM }}
          className="glass-strong absolute -bottom-5 left-1/2 w-max -translate-x-1/2 rounded-full px-5 py-2.5 font-mono text-[0.65rem] tracking-[0.15em] whitespace-nowrap text-secondary uppercase"
        >
          Founder · <span className="text-accent-soft">Catalyst Labs</span>
        </motion.p>
      </motion.div>
    </motion.div>
  );
}
