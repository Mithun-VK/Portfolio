import React from 'react';
import { SOCIAL_LINKS, NAV_ITEMS } from '../../../utils/constants';
import './Footer.css';

const Footer = () => {
  const year = new Date().getFullYear();

  const handleLinkClick = (e, path) => {
    if (!path.startsWith('#')) return;
    e.preventDefault();
    const el = document.querySelector(path.replace('/', ''));
    if (el) {
      const top = el.getBoundingClientRect().top + window.pageYOffset - 64;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <footer className="footer" role="contentinfo">
      <div className="footer__container">
        <div className="footer__row">
          <p className="footer__copy">
            © {year} Mithun V K. All rights reserved.
          </p>
          <nav className="footer__nav" aria-label="Footer">
            {NAV_ITEMS.filter((item) => item.id !== 'home').map((item) => (
              <a
                key={item.id}
                href={item.path}
                className="footer__link"
                onClick={(e) => handleLinkClick(e, item.path)}
              >
                {item.label}
              </a>
            ))}
          </nav>
          <div className="footer__social">
            <a href={SOCIAL_LINKS.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              GitHub
            </a>
            <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              LinkedIn
            </a>
            <a href={SOCIAL_LINKS.email} aria-label="Email">
              Email
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
