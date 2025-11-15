import React from 'react';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: 'GitHub',
      url: 'https://github.com/Mithun-VK',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
        </svg>
      ),
      ariaLabel: 'Visit my GitHub profile'
    },
    {
      name: 'LinkedIn',
      url: 'inkedin.com/in/mithun-v-k-76625927b/',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
        </svg>
      ),
      ariaLabel: 'Visit my LinkedIn profile'
    },
    {
      name: 'Email',
      url: 'mailto:mithunvk216.com',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
          <polyline points="22,6 12,13 2,6"/>
        </svg>
      ),
      ariaLabel: 'Send me an email'
    }
  ];

  const quickLinks = [
    { name: 'Home', path: '#home' },
    { name: 'About', path: '#about' },
    { name: 'Projects', path: '#projects' },
    { name: 'Skills', path: '#skills' },
    { name: 'Contact', path: '#contact' }
  ];

  const legalLinks = [
    { name: 'Privacy Policy', path: '#privacy' },
    { name: 'Terms of Service', path: '#terms' }
  ];

  const handleLinkClick = (e, path) => {
    if (path.startsWith('#')) {
      e.preventDefault();
      const element = document.querySelector(path);
      if (element) {
        const offset = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }
  };

  return (
    <footer className="footer" role="contentinfo">
      <div className="footer__container">
        {/* Main Footer Content */}
        <div className="footer__content">
          {/* Brand Section */}
          <div className="footer__brand">
            <h3 className="footer__logo">
              Mithun VK <span className="footer__logo-accent">.</span>
            </h3>
            <p className="footer__tagline">
              Full-Stack Developer crafting innovative web and mobile applications
            </p>
            <p className="footer__description">
              Specialized in React, Node.js, and cloud-based solutions. 
              Building scalable applications with modern technologies.
            </p>
          </div>

          {/* Quick Links */}
          <div className="footer__section">
            <h4 className="footer__title">Quick Links</h4>
            <nav aria-label="Footer navigation">
              <ul className="footer__links">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.path}
                      onClick={(e) => handleLinkClick(e, link.path)}
                      className="footer__link"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Projects Showcase */}
          <div className="footer__section">
            <h4 className="footer__title">Featured Projects</h4>
            <ul className="footer__links">
              <li>
                <a href="#datasense" className="footer__link">DataSense AI</a>
              </li>
              <li>
                <a href="#asre" className="footer__link">ASRE Stock Analyzer</a>
              </li>
              <li>
                <a href="#quiz" className="footer__link">Tamil Quiz App</a>
              </li>
              <li>
                <a href="#chatbot" className="footer__link">Trading Chatbot</a>
              </li>
            </ul>
          </div>

          {/* Contact & Social */}
          <div className="footer__section">
            <h4 className="footer__title">Connect</h4>
            <p className="footer__text">
              Let's collaborate on your next project
            </p>
            <div className="footer__social" role="navigation" aria-label="Social media links">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target={social.name !== 'Email' ? '_blank' : undefined}
                  rel={social.name !== 'Email' ? 'noopener noreferrer' : undefined}
                  className="footer__social-link"
                  aria-label={social.ariaLabel}
                  title={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="footer__divider" aria-hidden="true"></div>

        {/* Bottom Bar */}
        <div className="footer__bottom">
          <div className="footer__copyright">
            <p>
              © {currentYear} <strong>Mithun VK</strong>. All rights reserved.
            </p>
          </div>

          <div className="footer__legal">
            {legalLinks.map((link, index) => (
              <React.Fragment key={link.name}>
                <a href={link.path} className="footer__legal-link">
                  {link.name}
                </a>
                {index < legalLinks.length - 1 && (
                  <span className="footer__separator" aria-hidden="true">•</span>
                )}
              </React.Fragment>
            ))}
          </div>

          <div className="footer__credits">
            <p>
              Built with <span className="footer__heart" aria-label="love">❤️</span> using React
            </p>
          </div>
        </div>
      </div>

      {/* Back to Top Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="footer__back-to-top"
        aria-label="Scroll to top"
        title="Back to top"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="18 15 12 9 6 15"/>
        </svg>
      </button>
    </footer>
  );
};

export default Footer;
