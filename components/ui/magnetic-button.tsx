'use client';

import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';
import { useMagnetic } from '@/hooks/use-magnetic';
import { cn } from '@/lib/utils';

type Variant = 'solid' | 'ghost';

const base =
  'inline-flex min-h-12 cursor-pointer items-center justify-center gap-2 rounded-full px-7 py-3 text-sm font-medium tracking-tight transition-colors duration-300 select-none';

const variants: Record<Variant, string> = {
  solid:
    'bg-primary text-background hover:bg-accent-soft hover:text-background shadow-[0_0_0_1px_rgba(255,255,255,0.1),0_8px_32px_rgba(59,130,246,0.15)]',
  ghost: 'glass text-primary hover:border-accent/60 hover:text-white'
};

interface CommonProps {
  variant?: Variant;
  className?: string;
  children: ReactNode;
}

type MagneticAnchorProps = CommonProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

type MagneticNativeButtonProps = CommonProps & ButtonHTMLAttributes<HTMLButtonElement>;

export function MagneticLink({ variant = 'solid', className, children, ...rest }: MagneticAnchorProps) {
  const { ref, onPointerMove, onPointerLeave } = useMagnetic<HTMLAnchorElement>();
  return (
    <a
      ref={ref}
      data-cursor="hover"
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      className={cn(base, variants[variant], className)}
      {...rest}
    >
      {children}
    </a>
  );
}

export function MagneticButton({
  variant = 'solid',
  className,
  children,
  type = 'button',
  ...rest
}: MagneticNativeButtonProps) {
  const { ref, onPointerMove, onPointerLeave } = useMagnetic<HTMLButtonElement>();
  return (
    <button
      ref={ref}
      type={type}
      data-cursor="hover"
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      className={cn(base, variants[variant], className)}
      {...rest}
    >
      {children}
    </button>
  );
}
