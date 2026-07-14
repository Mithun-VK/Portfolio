import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { Hero } from '@/features/hero/hero';
import { About } from '@/features/about/about';
import { Skills } from '@/features/skills/skills';
import { Projects } from '@/features/projects/projects';
import { Experience } from '@/features/experience/experience';
import { Achievements } from '@/features/achievements/achievements';
import { TechStack } from '@/features/tech-stack/tech-stack';
import { Blog } from '@/features/blog/blog';
import { Contact } from '@/features/contact/contact';

export default function HomePage() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-full focus:bg-accent focus:px-5 focus:py-2.5 focus:text-sm focus:text-white"
      >
        Skip to content
      </a>
      <Navbar />
      <main id="main">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Achievements />
        <TechStack />
        <Blog />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
