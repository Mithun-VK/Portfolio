import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import Section from '../../layout/Section';
import SectionHeader from '../../layout/SectionHeader';
import { skillsData, certifications } from '../../../data/skills';
import { fadeInUp, staggerContainer, scaleIn } from '../../../utils/motion';
import './Skills.css';

const Skills = () => {
  const reduced = useReducedMotion();

  return (
    <Section id="skills" alt labelledBy="skills-heading">
      <motion.div
        variants={staggerContainer}
        initial={reduced ? false : 'hidden'}
        whileInView={reduced ? undefined : 'visible'}
        viewport={{ once: true, margin: '-100px' }}
      >
        <SectionHeader
          id="skills-heading"
          eyebrow="Skills"
          title="Technical expertise"
          description="Tools and technologies I use to build reliable, user-centered software."
        />

        <div className="skills__categories">
          {skillsData.map((category, categoryIndex) => (
            <motion.div 
              key={category.id} 
              className="skills__category"
              variants={fadeInUp}
              transition={{ delay: categoryIndex * 0.1 }}
            >
              <h3 className="skills__category-title">{category.name}</h3>
              <motion.ul 
                className="skills__tags"
                variants={staggerContainer}
                initial={reduced ? false : 'hidden'}
                whileInView={reduced ? undefined : 'visible'}
                viewport={{ once: true, margin: '-50px' }}
              >
                {category.skills.map((skill, skillIndex) => (
                  <motion.li 
                    key={skill.name} 
                    className="skills__tag interactive"
                    variants={scaleIn}
                    whileHover={{ 
                      scale: 1.05, 
                      y: -2,
                      transition: { duration: 0.2 }
                    }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ delay: skillIndex * 0.05 }}
                  >
                    {skill.name}
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>
          ))}
        </div>

        {certifications.length > 0 && (
          <motion.div 
            className="skills__certs"
            variants={fadeInUp}
            transition={{ delay: 0.3 }}
          >
            <h3 className="skills__certs-title">Certifications</h3>
            <motion.ul 
              className="skills__certs-list"
              variants={staggerContainer}
              initial={reduced ? false : 'hidden'}
              whileInView={reduced ? undefined : 'visible'}
              viewport={{ once: true, margin: '-50px' }}
            >
              {certifications.map((cert, index) => (
                <motion.li 
                  key={cert.id}
                  variants={fadeInUp}
                  whileHover={{ x: 5 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {cert.url ? (
                    <a 
                      href={cert.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="interactive"
                    >
                      {cert.name}
                    </a>
                  ) : (
                    cert.name
                  )}
                  <span className="skills__certs-issuer">{cert.issuer}</span>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        )}
      </motion.div>
    </Section>
  );
};

export default Skills;
