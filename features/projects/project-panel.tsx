import type { Project } from '@/types/content';
import { cn } from '@/lib/utils';

const accentGlow: Record<Project['accent'], string> = {
  blue: 'bg-accent/14',
  purple: 'bg-purple/14',
  teal: 'bg-teal/14'
};

const accentText: Record<Project['accent'], string> = {
  blue: 'text-accent-soft',
  purple: 'text-purple',
  teal: 'text-teal'
};

interface ProjectPanelProps {
  project: Project;
  index: number;
  total: number;
}

/** One full-height cinematic panel of the projects reel. */
export function ProjectPanel({ project, index, total }: ProjectPanelProps) {
  const number = String(index + 1).padStart(2, '0');

  return (
    <article
      className="project-panel relative flex h-full w-screen shrink-0 items-center overflow-hidden"
      aria-label={project.title}
    >
      {/* Panel-local ambient light + giant ghost number */}
      <div aria-hidden="true" className={cn('ambient top-1/4 right-[-10rem] h-[36rem] w-[36rem]', accentGlow[project.accent])} />
      <span
        aria-hidden="true"
        data-parallax="ghost"
        className="pointer-events-none absolute top-1/2 right-[4vw] -translate-y-1/2 font-mono text-[38vh] leading-none font-bold tracking-tighter text-white/[0.03] select-none"
      >
        {number}
      </span>

      <div className="container-page relative z-10 grid w-full items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
        <div data-parallax="content">
          <p className={cn('font-mono text-xs tracking-[0.25em] uppercase', accentText[project.accent])}>
            {number} / {String(total).padStart(2, '0')} — {project.kicker}
          </p>
          <h3 className="mt-5 text-5xl font-semibold tracking-tighter md:text-7xl">{project.title}</h3>
          <p className="mt-6 max-w-lg text-base leading-relaxed text-secondary md:text-lg">
            {project.description}
          </p>

          <ul className="mt-8 space-y-3">
            {project.highlights.map(point => (
              <li key={point} className="flex items-start gap-3 text-sm text-secondary">
                <span aria-hidden="true" className={cn('mt-[0.45em] h-1 w-4 shrink-0 rounded-full', accentText[project.accent], 'bg-current')} />
                {point}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
            <p className="font-mono text-xs text-faint">
              {project.role} · {project.year}
            </p>
            <ul className="flex flex-wrap gap-2">
              {project.stack.map(tech => (
                <li key={tech} className="glass rounded-full px-3 py-1 font-mono text-[0.65rem] text-secondary">
                  {tech}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Abstract media plate — masked, revealed on scroll */}
        <div
          data-reveal="media"
          className="relative hidden aspect-[4/3] overflow-hidden rounded-card-lg border border-line lg:block"
        >
          <div
            aria-hidden="true"
            className={cn(
              'absolute inset-0',
              project.accent === 'blue' &&
                'bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.25),transparent_60%),radial-gradient(circle_at_80%_80%,rgba(96,165,250,0.12),transparent_55%)]',
              project.accent === 'purple' &&
                'bg-[radial-gradient(circle_at_30%_20%,rgba(139,92,246,0.25),transparent_60%),radial-gradient(circle_at_80%_80%,rgba(59,130,246,0.12),transparent_55%)]',
              project.accent === 'teal' &&
                'bg-[radial-gradient(circle_at_30%_20%,rgba(45,212,191,0.22),transparent_60%),radial-gradient(circle_at_80%_80%,rgba(59,130,246,0.12),transparent_55%)]'
            )}
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:48px_48px]"
          />
          <span
            aria-hidden="true"
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-mono text-8xl font-bold tracking-tighter text-white/10"
          >
            {project.title.slice(0, 2)}
          </span>
          <span className="glass absolute bottom-5 left-5 rounded-full px-4 py-2 font-mono text-[0.65rem] tracking-widest text-secondary uppercase">
            {project.slug}
          </span>
        </div>
      </div>
    </article>
  );
}
