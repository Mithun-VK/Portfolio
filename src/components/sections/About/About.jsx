import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import Section from '../../layout/Section';
import SectionHeader from '../../layout/SectionHeader';
import Button from '../../common/Button/Button';
import { CONTACT_INFO } from '../../../utils/constants';
import { fadeInUp, fadeInLeft, fadeInRight, staggerContainer, getMotionProps } from '../../../utils/motion';
import './About.css';

const About = () => {
  const reduced = useReducedMotion();
  const motionProps = getMotionProps(reduced);

  const facts = [
    { label: 'Location', value: CONTACT_INFO.location },
    { label: 'Education', value: 'BE CSE, Anna University Chennai' },
    { label: 'Focus', value: 'Full-Stack · AI/ML · Fintech' },
    { label: 'Availability', value: CONTACT_INFO.availability }
  ];

  const resumePath = `${process.env.PUBLIC_URL}/assets/documents/Mithun_VK_Resume.pdf`;

  return (
    <Section id="about" labelledBy="about-heading">
      <motion.div
        variants={staggerContainer}
        initial={reduced ? false : 'hidden'}
        whileInView={reduced ? undefined : 'visible'}
        viewport={{ once: true, margin: '-100px' }}
      >
        <SectionHeader
          id="about-heading"
          eyebrow="About"
          title="Building software with clarity and intent"
          description="Pre-final year CSE student and co-founder at Arkangel, focused on production-ready web applications and AI-powered tools."
        />

        <div className="about__grid">
          <motion.div 
            className="about__narrative" 
            {...motionProps} 
            variants={fadeInLeft}
          >
            <motion.p variants={fadeInUp} transition={{ delay: 0.1 }}>
              I design and ship full-stack products—from React frontends to Python backends—with an emphasis on
              maintainable architecture, measurable outcomes, and thoughtful UX.
            </motion.p>
            <motion.p variants={fadeInUp} transition={{ delay: 0.2 }}>
              Recent work spans data analytics platforms, fintech tooling, and ML-integrated applications deployed on
              modern cloud infrastructure.
            </motion.p>
            <motion.div variants={fadeInUp} transition={{ delay: 0.3 }}>
              <Button
                variant="ghost"
                onClick={() => window.open(resumePath, '_blank', 'noopener,noreferrer')}
                className="interactive"
              >
                Download resume
              </Button>
            </motion.div>
          </motion.div>

          <motion.aside 
            className="about__facts" 
            {...motionProps} 
            variants={fadeInRight}
          >
            <div className="about__facts-list">
              {facts.map((fact, index) => (
                <motion.div 
                  key={fact.label} 
                  className="about__fact" 
                  variants={fadeInUp}
                  transition={{ delay: 0.1 * (index + 1) }}
                >
                  <span className="about__fact-label">{fact.label}</span>
                  <span className="about__fact-value">{fact.value}</span>
                </motion.div>
              ))}
            </div>
          </motion.aside>
        </div>
      </motion.div>
    </Section>
  );
};

export default About;
