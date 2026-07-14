'use client';

import { useState, type FormEvent } from 'react';
import { motion } from 'framer-motion';
import { SectionHeading } from '@/components/ui/section-heading';
import { AvailabilityBadge } from '@/components/ui/availability-badge';
import { MagneticButton } from '@/components/ui/magnetic-button';
import { fadeUp, stagger, viewportOnce } from '@/animations/variants';
import { site } from '@/content/site';
import { cn } from '@/lib/utils';

/** Floating-label input shared by the contact form. */
function Field({
  id,
  label,
  as = 'input',
  type = 'text',
  required = true
}: {
  id: string;
  label: string;
  as?: 'input' | 'textarea';
  type?: string;
  required?: boolean;
}) {
  const shared = cn(
    'peer w-full rounded-card border border-line bg-surface/60 px-5 pt-7 pb-3 text-primary',
    'placeholder-transparent transition-colors duration-300',
    'focus:border-accent/70 focus:outline-none hover:border-white/20'
  );

  return (
    <div className="relative">
      {as === 'textarea' ? (
        <textarea id={id} name={id} rows={5} required={required} placeholder={label} className={cn(shared, 'resize-y')} />
      ) : (
        <input id={id} name={id} type={type} required={required} placeholder={label} className={shared} />
      )}
      <label
        htmlFor={id}
        className={cn(
          'pointer-events-none absolute top-2.5 left-5 font-mono text-[0.65rem] tracking-[0.15em] text-faint uppercase',
          'transition-all duration-200',
          'peer-placeholder-shown:top-5 peer-placeholder-shown:text-sm peer-placeholder-shown:normal-case peer-placeholder-shown:tracking-normal peer-placeholder-shown:text-secondary',
          'peer-focus:top-2.5 peer-focus:text-[0.65rem] peer-focus:tracking-[0.15em] peer-focus:uppercase peer-focus:text-accent-soft'
        )}
      >
        {label}
      </label>
    </div>
  );
}

export function Contact() {
  const [sent, setSent] = useState(false);

  // No backend by design: compose the message into the visitor's mail client.
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get('name') ?? '');
    const from = String(data.get('email') ?? '');
    const message = String(data.get('message') ?? '');
    const subject = encodeURIComponent(`Portfolio inquiry — ${name}`);
    const body = encodeURIComponent(`${message}\n\n— ${name} (${from})`);
    window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
    setSent(true);
  };

  return (
    <section id="contact" aria-label="Contact" className="relative py-28 md:py-40">
      <div aria-hidden="true" className="ambient top-20 left-[-10rem] h-[30rem] w-[30rem] bg-purple/10" />
      <div className="container-page">
        <div className="grid gap-16 lg:grid-cols-[1fr_1.1fr]">
          <div>
            <SectionHeading
              index="08"
              eyebrow="Contact"
              title="Let’s build something precise."
              description="Open to select collaborations, ambitious products and conversations about AI × finance. Replies within 24 hours."
              className="mb-8 md:mb-10"
            />
            <motion.div
              variants={stagger(0.1)}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              className="space-y-6"
            >
              <motion.div variants={fadeUp}>
                <AvailabilityBadge />
              </motion.div>
              <motion.a
                variants={fadeUp}
                href={`mailto:${site.email}`}
                data-cursor="hover"
                className="block text-2xl font-medium tracking-tight text-primary transition-colors duration-300 hover:text-accent-soft md:text-3xl"
              >
                {site.email}
              </motion.a>
              <motion.ul variants={fadeUp} className="flex flex-wrap gap-5">
                {site.socials.map(s => (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      target={s.href.startsWith('http') ? '_blank' : undefined}
                      rel={s.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      data-cursor="hover"
                      className="text-sm text-secondary underline-offset-4 transition-colors duration-300 hover:text-primary hover:underline"
                    >
                      {s.label}
                    </a>
                  </li>
                ))}
              </motion.ul>
              <motion.p variants={fadeUp} className="font-mono text-xs text-faint">
                {site.location} · {site.founderLine}
              </motion.p>
            </motion.div>
          </div>

          <motion.form
            variants={stagger(0.08)}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            onSubmit={onSubmit}
            className="glass space-y-5 self-start rounded-card-lg p-8 md:p-10"
            aria-label="Contact form"
          >
            <motion.div variants={fadeUp}>
              <Field id="name" label="Your name" />
            </motion.div>
            <motion.div variants={fadeUp}>
              <Field id="email" label="Email address" type="email" />
            </motion.div>
            <motion.div variants={fadeUp}>
              <Field id="message" label="What are we building?" as="textarea" />
            </motion.div>
            <motion.div variants={fadeUp} className="flex items-center gap-4 pt-2">
              <MagneticButton type="submit">Send message</MagneticButton>
              <p aria-live="polite" className="text-sm text-teal">
                {sent ? 'Opening your mail client…' : ''}
              </p>
            </motion.div>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
