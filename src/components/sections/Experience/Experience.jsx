import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import Section from '../../layout/Section';
import SectionHeader from '../../layout/SectionHeader';
import { workExperience, education } from '../../../data/experience';
import { fadeInUp, fadeInLeft, staggerContainer } from '../../../utils/motion';
import './Experience.css';

const formatDate = (start, end, current) => {
  const fmt = (d) => {
    if (!d) return '';
    const [y, m] = d.split('-');
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${months[parseInt(m, 10) - 1] || ''} ${y}`;
  };
  const endLabel = current ? 'Present' : fmt(end);
  return `${fmt(start)} — ${endLabel}`;
};

const Experience = () => {
  const reduced = useReducedMotion();
  
  const timeline = [
    ...workExperience.map((exp) => ({
      type: 'work',
      title: exp.position,
      org: exp.company,
      period: formatDate(exp.startDate, exp.endDate, exp.current),
      bullets: exp.responsibilities?.slice(0, 3) || []
    })),
    ...education.map((edu) => ({
      type: 'education',
      title: edu.degree,
      org: edu.institution,
      period: formatDate(edu.startDate, edu.endDate, edu.current),
      bullets: edu.highlights?.slice(0, 2) || []
    }))
  ].sort((a, b) => (a.period < b.period ? 1 : -1));

  return (
    <Section id="experience" labelledBy="experience-heading">
      <motion.div
        variants={staggerContainer}
        initial={reduced ? false : 'hidden'}
        whileInView={reduced ? undefined : 'visible'}
        viewport={{ once: true, margin: '-100px' }}
      >
        <SectionHeader
          id="experience-heading"
          eyebrow="Experience"
          title="Professional journey"
          description="Education and hands-on experience building software in production-oriented environments."
        />

        <ol className="experience__timeline">
          {timeline.map((item, index) => (
            <motion.li 
              key={`${item.type}-${index}`} 
              className="experience__item"
              variants={fadeInLeft}
              transition={{ delay: index * 0.1 }}
              whileHover={{ x: 5 }}
            >
              <motion.time 
                className="experience__date" 
                dateTime={item.period}
                variants={fadeInUp}
                transition={{ delay: index * 0.1 + 0.05 }}
              >
                {item.period}
              </motion.time>
              <motion.div 
                className="experience__content"
                variants={fadeInUp}
                transition={{ delay: index * 0.1 + 0.1 }}
              >
                <h3 className="experience__title">{item.title}</h3>
                <p className="experience__org">{item.org}</p>
                {item.bullets.length > 0 && (
                  <motion.ul 
                    className="experience__bullets"
                    variants={staggerContainer}
                    initial={reduced ? false : 'hidden'}
                    whileInView={reduced ? undefined : 'visible'}
                    viewport={{ once: true, margin: '-50px' }}
                  >
                    {item.bullets.map((b, i) => (
                      <motion.li 
                        key={i} 
                        variants={fadeInUp}
                        transition={{ delay: i * 0.05 }}
                      >
                        {b}
                      </motion.li>
                    ))}
                  </motion.ul>
                )}
              </motion.div>
            </motion.li>
          ))}
        </ol>
      </motion.div>
    </Section>
  );
};

export default Experience;
