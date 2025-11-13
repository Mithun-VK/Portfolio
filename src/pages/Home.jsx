import React, { useEffect, useState, useCallback } from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from '../components/common/Navbar/Navbar';
import Footer from '../components/common/Footer/Footer';
import Hero from '../components/sections/Hero/Hero';
import About from '../components/sections/About/About';
import Projects from '../components/sections/Projects/Projects';
import Skills from '../components/sections/Skills/Skills';
import Experience from '../components/sections/Experience/Experience';
import Contact from '../components/sections/Contact/Contact';
import { APP_INFO, SEO_META } from '../utils/constants';
import { debounce } from '../utils/helpers';
import './Home.css';

const Home = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    // Scroll to top on page load
    window.scrollTo(0, 0);

    // Add loaded class for animations
    document.body.classList.add('loaded');

    return () => {
      document.body.classList.remove('loaded');
    };
  }, []);

  // Track scroll progress with debounce for performance
  useEffect(() => {
    const handleScroll = debounce(() => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrollPercentage = (scrollTop / scrollHeight) * 100;

      // Update scroll progress state
      setScrollProgress(scrollPercentage);

      // Update CSS custom property for scroll indicator
      document.documentElement.style.setProperty('--scroll-progress', `${scrollPercentage}%`);

      // Track active section for navigation highlighting
      updateActiveSection();
    }, 100);

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial call

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Update active section based on scroll position
  const updateActiveSection = useCallback(() => {
    const sections = ['home', 'about', 'skills', 'projects', 'experience', 'contact'];
    const scrollPosition = window.scrollY + 100;

    for (const sectionId of sections) {
      const section = document.getElementById(sectionId);
      if (section) {
        const { offsetTop, offsetHeight } = section;
        if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
          setActiveSection(sectionId);
          break;
        }
      }
    }
  }, []);

  return (
    <>
      {/* SEO Meta Tags */}
      <Helmet>
        <title>{SEO_META.DEFAULT_TITLE}</title>
        <meta name="description" content={SEO_META.DEFAULT_DESCRIPTION} />
        <meta name="keywords" content={SEO_META.DEFAULT_KEYWORDS} />
        <meta name="author" content={APP_INFO.author} />
        
        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={SEO_META.SITE_URL} />
        <meta property="og:title" content={SEO_META.DEFAULT_TITLE} />
        <meta property="og:description" content={SEO_META.DEFAULT_DESCRIPTION} />
        <meta property="og:image" content={`${SEO_META.SITE_URL}${SEO_META.OG_IMAGE}`} />
        <meta property="og:site_name" content={APP_INFO.name} />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={SEO_META.SITE_URL} />
        <meta name="twitter:title" content={SEO_META.DEFAULT_TITLE} />
        <meta name="twitter:description" content={SEO_META.DEFAULT_DESCRIPTION} />
        <meta name="twitter:image" content={`${SEO_META.SITE_URL}${SEO_META.OG_IMAGE}`} />
        <meta name="twitter:creator" content={SEO_META.TWITTER_HANDLE} />
        
        {/* Additional Meta */}
        <meta name="robots" content="index, follow" />
        <meta name="language" content="English" />
        <meta name="revisit-after" content="7 days" />
        
        {/* Canonical URL */}
        <link rel="canonical" href={SEO_META.SITE_URL} />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            "name": "Mithun V K",
            "url": SEO_META.SITE_URL,
            "sameAs": [
              "https://www.linkedin.com/in/mithun-v-k-76625927b/",
              "https://github.com/yourusername"
            ],
            "jobTitle": "Full-Stack Developer",
            "worksFor": {
              "@type": "Organization",
              "name": "Anna University Chennai"
            }
          })}
        </script>
      </Helmet>

      <div className="home">
        {/* Scroll Progress Indicator */}
        <div 
          className="scroll-progress" 
          role="progressbar"
          aria-label="Page scroll progress"
          aria-valuenow={Math.round(scrollProgress)}
          aria-valuemin={0}
          aria-valuemax={100}
        />

        {/* Navigation */}
        <Navbar activeSection={activeSection} />

        {/* Main Content */}
        <main className="home__main" role="main">
          {/* Hero Section */}
          <Hero />

          {/* About Section */}
          <About />

          {/* Skills Section */}
          <Skills />

          {/* Projects Section */}
          <Projects />

          {/* Experience Section */}
          <Experience />

          {/* Contact Section */}
          <Contact />
        </main>

        {/* Footer */}
        <Footer />

        {/* Back to Top Button */}
        <BackToTop />

        {/* Skip to Main Content (Accessibility) */}
        <a href="#home" className="skip-to-main sr-only">
          Skip to main content
        </a>
      </div>
    </>
  );
};

// Back to Top Component (Enhanced)
const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = debounce(() => {
      setIsVisible(window.pageYOffset > 500);
    }, 100);

    window.addEventListener('scroll', toggleVisibility, { passive: true });
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, []);

  // Handle keyboard shortcut (Shift + ↑)
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.shiftKey && e.key === 'ArrowUp') {
        e.preventDefault();
        scrollToTop();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [scrollToTop]);

  if (!isVisible) return null;

  return (
    <button
      className="back-to-top back-to-top--visible"
      onClick={scrollToTop}
      aria-label="Scroll to top"
      title="Back to top (Shift + ↑)"
    >
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="24" 
        height="24" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="18 15 12 9 6 15"/>
      </svg>
    </button>
  );
};

export default Home;
