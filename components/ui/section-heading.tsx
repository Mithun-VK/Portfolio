import { SplitReveal } from '@/animations/split-reveal';
import { cn } from '@/lib/utils';

interface SectionHeadingProps {
  index: string;
  eyebrow: string;
  title: string;
  description?: string;
  className?: string;
}

/** Numbered editorial heading shared by every section. */
export function SectionHeading({ index, eyebrow, title, description, className }: SectionHeadingProps) {
  return (
    <header className={cn('mb-16 max-w-3xl md:mb-20', className)}>
      <p className="mb-5 flex items-center gap-3 font-mono text-xs tracking-[0.2em] text-secondary uppercase">
        <span className="text-accent">{index}</span>
        <span aria-hidden="true" className="h-px w-8 bg-gradient-to-r from-accent/70 to-transparent" />
        {eyebrow}
      </p>
      <SplitReveal
        as="h2"
        by="words"
        className="text-4xl font-semibold tracking-tighter text-balance md:text-6xl"
      >
        {title}
      </SplitReveal>
      {description ? (
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-secondary">{description}</p>
      ) : null}
    </header>
  );
}
