import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useTheme from '../../../hooks/useTheme';
import { NAV_ITEMS, SCROLL_SETTINGS } from '../../../utils/constants';
import './Navbar.css';

const ThemeIcon = ({ dark }) =>
  dark ? (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  ) : (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );

const Navbar = ({ activeSection = 'home' }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { toggleTheme, isDark } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  const handleNavClick = (e, hash) => {
    if (!hash.startsWith('#')) return;
    e.preventDefault();
    const el = document.querySelector(hash);
    if (el) {
      const top =
        el.getBoundingClientRect().top + window.pageYOffset - SCROLL_SETTINGS.OFFSET;
      window.scrollTo({ top, behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const resumePath = `${process.env.PUBLIC_URL}/assets/documents/Mithun_VK_Resume.pdf`;

  const renderLink = (item, mobile = false) => {
    const isActive = activeSection === item.id;
    const className = mobile ? 'navbar__mobile-link' : 'navbar__link';
    const activeClass = isActive ? `${className}--active` : '';

    return (
      <a
        key={item.id}
        href={item.path}
        className={`${className} ${activeClass}`.trim()}
        onClick={(e) => handleNavClick(e, item.path.replace('/', ''))}
        aria-current={isActive ? 'true' : undefined}
        role={mobile ? 'menuitem' : undefined}
      >
        {item.label}
      </a>
    );
  };

  return (
    <header className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <nav className="navbar__container" aria-label="Main navigation">
        <Link to="/" className="navbar__logo" aria-label="Home">
          Mithun VK
        </Link>

        <ul className="navbar__menu">
          {NAV_ITEMS.map((item) => (
            <li key={item.id}>{renderLink(item)}</li>
          ))}
        </ul>

        <div className="navbar__actions">
          <button
            type="button"
            className="navbar__theme"
            onClick={toggleTheme}
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            aria-pressed={isDark}
          >
            <ThemeIcon dark={isDark} />
          </button>
          <a
            href={resumePath}
            target="_blank"
            rel="noopener noreferrer"
            className="navbar__resume"
          >
            Resume
          </a>
          <button
            type="button"
            className={`navbar__toggle ${isMenuOpen ? 'navbar__toggle--open' : ''}`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
          >
            <span />
            <span />
          </button>
        </div>
      </nav>

      {isMenuOpen && (
        <>
          <button
            type="button"
            className="navbar__overlay"
            onClick={() => setIsMenuOpen(false)}
            aria-label="Close menu"
          />
          <div id="mobile-menu" className="navbar__mobile" role="menu">
            {NAV_ITEMS.map((item) => renderLink(item, true))}
            <a
              href={resumePath}
              className="navbar__mobile-link"
              target="_blank"
              rel="noopener noreferrer"
              role="menuitem"
            >
              Resume
            </a>
          </div>
        </>
      )}
    </header>
  );
};

export default Navbar;
