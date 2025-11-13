import React from 'react';
import ContactForm from './ContactForm';
import './Contact.css';

const Contact = () => {
  const contactInfo = [
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
          <polyline points="22,6 12,13 2,6"/>
        </svg>
      ),
      title: 'Email',
      value: 'mithunvk216@gmail.com',
      link: 'mailto:mithunvk2004@gmail.com',
      color: '#3b82f6'
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
          <rect x="2" y="9" width="4" height="12"/>
          <circle cx="4" cy="4" r="2"/>
        </svg>
      ),
      title: 'LinkedIn',
      value: 'Mithun V K',
      link: 'https://www.linkedin.com/in/mithun-v-k-76625927b/',
      color: '#0077b5'
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
        </svg>
      ),
      title: 'GitHub',
      value: 'github.com/Mithun-VK',
      link: 'https://github.com/Mithun-VK',
      color: '#333333'
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
          <circle cx="12" cy="10" r="3"/>
        </svg>
      ),
      title: 'Location',
      value: 'India',
      link: null,
      color: '#ef4444'
    }
  ];

  const socialLinks = [
    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/mithun-v-k-76625927b/', icon: 'linkedin' },
    { name: 'GitHub', url: 'https://github.com/Mithun-VK', icon: 'github' },
    { name: 'instagram', url: 'https://www.instagram.com/mi_thun246/', icon: 'instagram' }
  ];

  return (
    <section className="contact" id="contact">
      <div className="contact__container">
        {/* Header */}
        <div className="contact__header">
          <span className="contact__subtitle">Get In Touch</span>
          <h2 className="contact__title">Let's Work Together</h2>
          <div className="contact__title-underline"></div>
          <p className="contact__description">
            Have a project in mind or want to collaborate? I'd love to hear from you. 
            Drop me a message and I'll get back to you as soon as possible.
          </p>
        </div>

        <div className="contact__content">
          {/* Contact Info Cards */}
          <div className="contact__info">
            <div className="contact__info-header">
              <h3 className="contact__info-title">Contact Information</h3>
              <p className="contact__info-text">
                Feel free to reach out through any of these channels. 
                I'm always open to discussing new projects and opportunities.
              </p>
            </div>

            <div className="contact__cards">
              {contactInfo.map((info, index) => (
                <div 
                  key={index} 
                  className="contact__card"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div 
                    className="contact__card-icon"
                    style={{ backgroundColor: `${info.color}15`, color: info.color }}
                  >
                    {info.icon}
                  </div>
                  <div className="contact__card-content">
                    <h4 className="contact__card-title">{info.title}</h4>
                    {info.link ? (
                      <a 
                        href={info.link}
                        className="contact__card-link"
                        target={info.title !== 'Email' ? '_blank' : undefined}
                        rel={info.title !== 'Email' ? 'noopener noreferrer' : undefined}
                      >
                        {info.value}
                      </a>
                    ) : (
                      <span className="contact__card-value">{info.value}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Social Links */}
            <div className="contact__social">
              <h4 className="contact__social-title">Connect With Me</h4>
              <div className="contact__social-links">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`contact__social-link contact__social-link--${social.icon}`}
                    aria-label={`Visit my ${social.name} profile`}
                  >
                    {social.name}
                  </a>
                ))}
              </div>
            </div>

            {/* Availability Badge */}
            <div className="contact__availability">
              <div className="contact__availability-indicator"></div>
              <div className="contact__availability-text">
                <strong>Available for opportunities</strong>
                <span>Open to internships and full-time roles</span>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="contact__form-wrapper">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
