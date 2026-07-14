'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { navItems, site } from '@/content/site';
import { scrollToId } from '@/lib/scroll';
import { cn } from '@/lib/utils';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('');
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const sections = navItems
      .map(item => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      entries => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: '-40% 0px -55% 0px' }
    );

    sections.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const go = (id: string) => {
    setOpen(false);
    scrollToId(id);
  };

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300',
        scrolled ? 'glass-strong border-b border-line' : 'border-b border-transparent'
      )}
    >
      <nav aria-label="Main navigation" className="container-page flex h-18 items-center justify-between">
        <button
          type="button"
          onClick={() => scrollToId('hero', 0)}
          data-cursor="hover"
          className="font-mono text-sm font-semibold tracking-tight text-primary"
          aria-label="Back to top"
        >
          mithun<span className="text-accent">.vk</span>
        </button>

        <ul className="hidden items-center gap-8 md:flex">
          {navItems.map(item => (
            <li key={item.id}>
              <button
                type="button"
                onClick={() => go(item.id)}
                data-cursor="hover"
                className={cn(
                  'relative py-2 text-sm transition-colors duration-300',
                  active === item.id ? 'text-primary' : 'text-secondary hover:text-primary'
                )}
                aria-current={active === item.id ? 'true' : undefined}
              >
                {item.label}
                <span
                  aria-hidden="true"
                  className={cn(
                    'absolute inset-x-0 bottom-0 h-px origin-left bg-accent transition-transform duration-300',
                    active === item.id ? 'scale-x-100' : 'scale-x-0'
                  )}
                />
              </button>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <a
            href={`mailto:${site.email}`}
            data-cursor="hover"
            className="hidden rounded-full border border-line px-5 py-2.5 text-sm text-secondary transition-colors duration-300 hover:border-accent/60 hover:text-primary md:inline-flex"
          >
            Let’s talk
          </a>
          <button
            type="button"
            onClick={() => setOpen(v => !v)}
            className="flex h-12 w-12 flex-col items-center justify-center gap-1.5 md:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
          >
            <span
              className={cn(
                'h-px w-6 bg-white transition-transform duration-300',
                open && 'translate-y-[3.5px] rotate-45'
              )}
            />
            <span
              className={cn(
                'h-px w-6 bg-white transition-transform duration-300',
                open && '-translate-y-[3.5px] -rotate-45'
              )}
            />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="glass-strong border-b border-line md:hidden"
          >
            <ul className="container-page flex flex-col py-4">
              {navItems.map(item => (
                <li key={item.id}>
                  <button
                    type="button"
                    onClick={() => go(item.id)}
                    className="w-full border-b border-line/50 py-4 text-left text-lg text-secondary transition-colors hover:text-primary"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
              <li>
                <a href={`mailto:${site.email}`} className="block py-4 text-lg text-accent-soft">
                  Let’s talk
                </a>
              </li>
            </ul>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
