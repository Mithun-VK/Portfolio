'use client';

import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { SectionHeading } from '@/components/ui/section-heading';
import { fadeUp, stagger, viewportOnce } from '@/animations/variants';
import { blogCategories, blogPosts } from '@/content/blog';
import { cn, formatDate } from '@/lib/utils';

export function Blog() {
  const [category, setCategory] = useState('All');
  const [query, setQuery] = useState('');

  const posts = useMemo(() => {
    const q = query.trim().toLowerCase();
    return blogPosts.filter(post => {
      const inCategory = category === 'All' || post.category === category;
      const inQuery =
        !q || post.title.toLowerCase().includes(q) || post.excerpt.toLowerCase().includes(q);
      return inCategory && inQuery;
    });
  }, [category, query]);

  const featured = posts.find(p => p.featured) ?? posts[0];
  const rest = posts.filter(p => p !== featured);

  return (
    <section id="blog" aria-label="Writing" className="relative py-28 md:py-40">
      <div className="container-page">
        <SectionHeading
          index="07"
          eyebrow="Writing"
          title="Notes from the build."
          description="Essays on AI engineering, quantitative finance and shipping products as a small team. CMS-ready — these entries live in one typed content file."
        />

        {/* Controls */}
        <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div role="group" aria-label="Filter by category" className="flex flex-wrap gap-2">
            {blogCategories.map(cat => (
              <button
                key={cat}
                type="button"
                onClick={() => setCategory(cat)}
                aria-pressed={category === cat}
                data-cursor="hover"
                className={cn(
                  'rounded-full border px-4 py-2 text-sm transition-colors duration-300',
                  category === cat
                    ? 'border-accent/60 bg-accent/10 text-primary'
                    : 'border-line text-secondary hover:border-white/20 hover:text-primary'
                )}
              >
                {cat}
              </button>
            ))}
          </div>
          <label className="relative block md:w-72">
            <span className="sr-only">Search articles</span>
            <input
              type="search"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search articles…"
              className="glass w-full rounded-full px-5 py-3 text-sm text-primary placeholder:text-faint focus:border-accent/60 focus:outline-none"
            />
          </label>
        </div>

        {featured ? (
          <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
            {/* Featured article */}
            <motion.article
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              data-cursor="hover"
              className="group glass relative flex min-h-80 flex-col justify-end overflow-hidden rounded-card-lg p-8 transition-colors duration-500 hover:border-accent/40 md:p-10"
            >
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-[radial-gradient(circle_at_75%_15%,rgba(59,130,246,0.16),transparent_55%)] opacity-70 transition-opacity duration-700 group-hover:opacity-100"
              />
              <p className="relative font-mono text-xs tracking-[0.2em] text-accent-soft uppercase">
                Featured · {featured.category}
              </p>
              <h3 className="relative mt-4 max-w-xl text-3xl font-semibold tracking-tight text-balance md:text-4xl">
                {featured.title}
              </h3>
              <p className="relative mt-4 max-w-xl leading-relaxed text-secondary">{featured.excerpt}</p>
              <p className="relative mt-6 font-mono text-xs text-faint">
                {formatDate(featured.date)} · {featured.readingTime} read
              </p>
            </motion.article>

            {/* Remaining posts */}
            <motion.div
              variants={stagger(0.1)}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              className="flex flex-col gap-6"
            >
              {rest.map(post => (
                <motion.article
                  key={post.slug}
                  variants={fadeUp}
                  data-cursor="hover"
                  className="group glass flex-1 rounded-card p-7 transition-colors duration-500 hover:border-accent/40"
                >
                  <p className="font-mono text-xs tracking-[0.2em] text-secondary uppercase">
                    {post.category}
                  </p>
                  <h3 className="mt-3 text-xl font-semibold tracking-tight transition-colors duration-300 group-hover:text-accent-soft">
                    {post.title}
                  </h3>
                  <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-secondary">
                    {post.excerpt}
                  </p>
                  <p className="mt-4 font-mono text-xs text-faint">
                    {formatDate(post.date)} · {post.readingTime} read
                  </p>
                </motion.article>
              ))}
            </motion.div>
          </div>
        ) : (
          <p className="glass rounded-card p-10 text-center text-secondary">
            No articles match that search.
          </p>
        )}
      </div>
    </section>
  );
}
