import { site } from '@/content/site';
import { cn } from '@/lib/utils';

export function AvailabilityBadge({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        'glass inline-flex items-center gap-2.5 rounded-full px-4 py-2 font-mono text-xs tracking-widest text-secondary uppercase',
        className
      )}
    >
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal opacity-60 motion-reduce:animate-none" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-teal" />
      </span>
      {site.availability}
    </span>
  );
}
