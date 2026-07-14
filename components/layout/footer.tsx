'use client';

import { site } from '@/content/site';
import { scrollToId } from '@/lib/scroll';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-line">
      <div aria-hidden="true" className="ambient -bottom-40 left-1/2 h-80 w-[40rem] -translate-x-1/2 bg-accent/10" />
      <div className="container-page relative py-16">
        <div className="flex flex-col items-start justify-between gap-10 md:flex-row md:items-end">
          <div>
            <p className="font-mono text-xs tracking-[0.2em] text-secondary uppercase">
              {site.location} · {site.founderLine}
            </p>
            <p className="mt-4 text-4xl font-semibold tracking-tighter text-gradient md:text-6xl">
              {site.name}
            </p>
          </div>

          <div className="flex flex-col items-start gap-6 md:items-end">
            <ul className="flex flex-wrap gap-6">
              {site.socials.map(s => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target={s.href.startsWith('http') ? '_blank' : undefined}
                    rel={s.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    data-cursor="hover"
                    className="text-sm text-secondary transition-colors duration-300 hover:text-primary"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
            <button
              type="button"
              onClick={() => scrollToId('hero', 0)}
              data-cursor="hover"
              className="glass rounded-full px-5 py-2.5 text-sm text-secondary transition-colors duration-300 hover:text-primary"
            >
              Back to top ↑
            </button>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-2 border-t border-line pt-6 text-xs text-faint md:flex-row md:justify-between">
          <p>© {year} {site.name}. All rights reserved.</p>
          <p>Next.js · GSAP · Three.js — engineered, not templated.</p>
        </div>
      </div>
    </footer>
  );
}
