import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 bg-background px-6 text-center">
      <p className="font-mono text-sm tracking-widest text-secondary uppercase">404</p>
      <h1 className="text-4xl font-semibold tracking-tight text-primary md:text-6xl">
        This page drifted off orbit.
      </h1>
      <Link
        href="/"
        className="mt-4 rounded-full border border-line px-6 py-3 text-sm text-secondary transition-colors hover:border-accent hover:text-primary"
      >
        Back to home
      </Link>
    </main>
  );
}
