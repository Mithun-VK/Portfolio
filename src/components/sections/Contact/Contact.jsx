import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import Section from '../../layout/Section';
import SectionHeader from '../../layout/SectionHeader';
import ContactForm from './ContactForm';
import { CONTACT_INFO, SOCIAL_LINKS } from '../../../utils/constants';
import { fadeInUp, fadeInLeft, fadeInRight, staggerContainer } from '../../../utils/motion';
import './Contact.css';

const Contact = () => {
  const reduced = useReducedMotion();

  return (
    <Section id="contact" labelledBy="contact-heading">
      <motion.div
        variants={staggerContainer}
        initial={reduced ? false : 'hidden'}
        whileInView={reduced ? undefined : 'visible'}
        viewport={{ once: true, margin: '-100px' }}
      >
        <SectionHeader
          id="contact-heading"
          eyebrow="Contact"
          title="Let's work together"
          description="Open to internships, collaborations, and full-time opportunities. I typically respond within 24 hours."
        />

        <div className="contact__grid">
          <motion.div 
            className="contact__info"
            variants={fadeInLeft}
            transition={{ delay: 0.1 }}
          >
            <motion.p 
              className="contact__availability"
              variants={fadeInUp}
              transition={{ delay: 0.2 }}
            >
              {CONTACT_INFO.availability}
            </motion.p>
            <motion.ul 
              className="contact__links"
              variants={staggerContainer}
              initial={reduced ? false : 'hidden'}
              whileInView={reduced ? undefined : 'visible'}
              viewport={{ once: true, margin: '-50px' }}
            >
              <motion.li variants={fadeInUp} whileHover={{ x: 5 }}>
                <a 
                  href={`mailto:${CONTACT_INFO.email}`}
                  className="interactive"
                >
                  {CONTACT_INFO.email}
                </a>
              </motion.li>
              <motion.li variants={fadeInUp} whileHover={{ x: 5 }}>
                <a 
                  href={SOCIAL_LINKS.linkedin} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="interactive"
                >
                  LinkedIn
                </a>
              </motion.li>
              <motion.li variants={fadeInUp} whileHover={{ x: 5 }}>
                <a 
                  href={SOCIAL_LINKS.github} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="interactive"
                >
                  GitHub
                </a>
              </motion.li>
              <motion.li variants={fadeInUp}>
                <span>{CONTACT_INFO.location}</span>
              </motion.li>
            </motion.ul>
          </motion.div>
          <motion.div
            variants={fadeInRight}
            transition={{ delay: 0.2 }}
          >
            <ContactForm />
          </motion.div>
        </div>
      </motion.div>
    </Section>
  );
};

export default Contact;
