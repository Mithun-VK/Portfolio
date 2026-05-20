/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import Button from '../../common/Button/Button';
import Container from '../../layout/Container';
import { SOCIAL_LINKS, APP_INFO } from '../../../utils/constants';
import TextReveal from '../../effects/TextReveal/TextReveal';
import Particles from '../../effects/Particles/Particles';
import FloatingShapes from '../../effects/FloatingShapes/FloatingShapes';
import useMagnetic from '../../../hooks/useMagnetic';
import './Hero.css';
import profilePhoto from '../../../assets/images/Me.jpg';

const ROLES = [
  'Full-Stack Developer',
  'AI / ML Engineer',
  'Fintech Founder',
  'Problem-First Builder',
];

const heroContainer = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.2,
    },
  },
};

const itemVariant = {
  hidden: { opacity: 0, y: 32 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

const imageVariant = {
  hidden: { opacity: 0, scale: 0.92, y: 24 },
  show: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.35 },
  },
};

function useTypewriter(words, typingSpeed = 80, deletingSpeed = 45, pauseMs = 1800) {
  const [display, setDisplay] = useState('');
  const [wordIdx, setWordIdx] = useState(0);
  const [phase, setPhase] = useState('typing');

  useEffect(() => {
    const word = words[wordIdx];
    let timeout;

    if (phase === 'typing') {
      if (display.length < word.length) {
        timeout = setTimeout(
          () => setDisplay(word.slice(0, display.length + 1)),
          typingSpeed
        );
      } else {
        timeout = setTimeout(() => setPhase('pausing'), pauseMs);
      }
    } else if (phase === 'pausing') {
      setPhase('deleting');
    } else if (phase === 'deleting') {
      if (display.length > 0) {
        timeout = setTimeout(
          () => setDisplay(display.slice(0, -1)),
          deletingSpeed
        );
      } else {
        setWordIdx((i) => (i + 1) % words.length);
        setPhase('typing');
      }
    }

    return () => clearTimeout(timeout);
  }, [display, phase, wordIdx, words, typingSpeed, deletingSpeed, pauseMs]);

  return display;
}

const Hero = () => {
  const reduced = useReducedMotion();
  const magneticPrimary = useMagnetic(0.3);
  const magneticSecondary = useMagnetic(0.3);
  const [imgLoaded, setImgLoaded] = useState(false);
  const [imgError, setImgError] = useState(false);
  const imgRef = useRef(null);

  const roleText = useTypewriter(reduced ? [ROLES[0]] : ROLES);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.pageYOffset - 64;
      window.scrollTo({ top, behavior: reduced ? 'auto' : 'smooth' });
    }
  };

  const resumePath = `${process.env.PUBLIC_URL}/assets/documents/resume.pdf`;
  const profileImage = profilePhoto;

  useEffect(() => {
    if (imgRef.current?.complete && imgRef.current.naturalWidth > 0) {
      setImgLoaded(true);
    }
  }, []);

  return (
    <section className="hero" id="home" aria-label="Introduction">
      <Particles />
      <FloatingShapes />

      <div className="hero__glow hero__glow--blue" aria-hidden="true" />
      <div className="hero__glow hero__glow--violet" aria-hidden="true" />

      <Container>
        <motion.div
          className="hero__grid"
          variants={heroContainer}
          initial="hidden"
          animate="show"
        >
          <div className="hero__content">
            <motion.div variants={itemVariant} className="hero__eyebrow">
              <span className="hero__eyebrow-dot" aria-hidden="true" />
              Available · Chennai, India
            </motion.div>

            <motion.div variants={itemVariant}>
              <p className="hero__intro">Hi, I'm</p>
              <div className="hero__title">
                <TextReveal
                  text={APP_INFO?.author || 'Mithun V K'}
                  delay={0.2}
                  className="hero__title-name"
                />
              </div>
            </motion.div>

            <motion.div variants={itemVariant} className="hero__role" aria-live="polite">
              <span className="hero__role-text">{roleText}</span>
              <span className="hero__cursor" aria-hidden="true">|</span>
            </motion.div>

            <motion.p variants={itemVariant} className="hero__lead">
              {APP_INFO?.tagline ||
                'I build AI products that turn 2 hours of manual work into 2 seconds of insight.'}
            </motion.p>

            <motion.div variants={itemVariant} className="hero__actions">
              <div ref={magneticPrimary.ref}>
                <Button
                  variant="primary"
                  size="large"
                  onClick={() => scrollTo('projects')}
                  className="interactive"
                  aria-label="View my work"
                >
                  View Work ↓
                </Button>
              </div>

              <div ref={magneticSecondary.ref}>
                <Button
                  variant="outline"
                  size="large"
                  onClick={() => window.open(resumePath, '_blank', 'noopener,noreferrer')}
                  className="interactive"
                  aria-label="Download resume PDF"
                >
                  Download Resume
                </Button>
              </div>
            </motion.div>

            <motion.div variants={itemVariant} className="hero__social">
              <a
                href={SOCIAL_LINKS?.linkedin || 'https://linkedin.com/in/mithun-v-k-76625927b'}
                target="_blank"
                rel="noopener noreferrer"
                className="hero__social-link interactive"
                aria-label="LinkedIn profile"
              >
                LinkedIn
              </a>
              <span aria-hidden="true">·</span>
              <a
                href={SOCIAL_LINKS?.github || 'https://github.com/Mithun-VK'}
                target="_blank"
                rel="noopener noreferrer"
                className="hero__social-link interactive"
                aria-label="GitHub profile"
              >
                GitHub
              </a>
              <span aria-hidden="true">·</span>
              <a
                href={`mailto:${SOCIAL_LINKS?.email || 'mithunvk216@gmail.com'}`}
                className="hero__social-link interactive"
                aria-label="Send email"
              >
                Email
              </a>
            </motion.div>
          </div>

          <motion.div
            className="hero__visual"
            variants={imageVariant}
            aria-hidden="true"
          >
            <div className="hero__image-ring">
              <div className="hero__image-border" />

              <motion.div
                className="hero__image-wrapper"
                animate={
                  reduced
                    ? {}
                    : {
                        y: [0, -14, 0],
                        transition: {
                          duration: 4,
                          ease: 'easeInOut',
                          repeat: Infinity,
                          repeatType: 'loop',
                        },
                      }
                }
              >
                {!imgLoaded && !imgError && (
                  <div className="hero__image-skeleton" aria-label="Loading profile photo" />
                )}

                <img
                  ref={imgRef}
                  src={profileImage}
                  alt="Mithun V K — Full-Stack Developer and AI Founder"
                  className={`hero__image ${imgLoaded ? 'hero__image--loaded' : ''}`}
                  width={380}
                  height={380}
                  loading="eager"
                  decoding="async"
                  onLoad={() => setImgLoaded(true)}
                  onError={() => {
                    setImgError(true);
                    setImgLoaded(true);
                  }}
                />

                {imgError && (
                  <div className="hero__image-fallback" role="img" aria-label="Mithun V K">
                    <span>MK</span>
                  </div>
                )}
              </motion.div>

              <motion.div
                className="hero__badge hero__badge--top"
                initial={{ opacity: 0, scale: 0.7, x: 20 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                transition={{ delay: 0.9, duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
              >
                <span className="hero__badge-icon">🏆</span>
                <div className="hero__badge-text">
                  <strong>1st Place</strong>
                  <span>Strategia'26</span>
                </div>
              </motion.div>

              <motion.div
                className="hero__badge hero__badge--bottom"
                initial={{ opacity: 0, scale: 0.7, x: -20 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                transition={{ delay: 1.1, duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
              >
                <span className="hero__badge-icon">🚀</span>
                <div className="hero__badge-text">
                  <strong>Co-Founder</strong>
                  <span>Arkangel Pvt Ltd</span>
                </div>
              </motion.div>
            </div>

            <motion.div
              className="hero__stats"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.3, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              {[
                { value: '8+', label: 'Projects' },
                { value: '20+', label: 'Technologies' },
                { value: '95%', label: 'ML Accuracy' },
              ].map((stat) => (
                <div key={stat.label} className="hero__stat">
                  <strong>{stat.value}</strong>
                  <span>{stat.label}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
      </Container>

      {!reduced && (
        <motion.div
          className="hero__scroll-indicator"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 0.6 }}
          aria-hidden="true"
        >
          <span>Scroll</span>
          <div className="hero__scroll-arrow">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </div>
        </motion.div>
      )}
    </section>
  );
};

export default Hero;