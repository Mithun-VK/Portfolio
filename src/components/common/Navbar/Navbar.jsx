import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const location = useLocation();

  // Handle scroll effect for navbar background
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setScrolled(offset > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle window resize for responsive behavior
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      
      if (!mobile && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMenuOpen]);

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen && isMobile) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen, isMobile]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navLinks = [
    { name: 'Home', path: '/', id: 'home' },
    { name: 'About', path: '#about', id: 'about' },
    { name: 'Projects', path: '#projects', id: 'projects' },
    { name: 'Skills', path: '#skills', id: 'skills' },
    { name: 'Contact', path: '#contact', id: 'contact' }
  ];

  const handleNavClick = (e, path) => {
    if (path.startsWith('#')) {
      e.preventDefault();
      const element = document.querySelector(path);
      if (element) {
        const offset = 80; // Navbar height
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
      setIsMenuOpen(false);
    }
  };

  return (
    <>
      <nav 
        className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="navbar__container">
          {/* Logo/Brand */}
          <Link 
            to="/" 
            className="navbar__logo"
            aria-label="Home"
          >
            <span className="navbar__logo-text">Mithun VK</span>
            <span className="navbar__logo-accent">.</span>
          </Link>

          {/* Desktop Navigation */}
          <ul className="navbar__menu">
            {navLinks.map((link) => (
              <li key={link.id} className="navbar__item">
                <a
                  href={link.path}
                  onClick={(e) => handleNavClick(e, link.path)}
                  className={`navbar__link ${
                    location.hash === link.path ? 'navbar__link--active' : ''
                  }`}
                  aria-current={location.hash === link.path ? 'page' : undefined}
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>

          {/* CTA Button */}
          <div className="navbar__cta">
            <a
              href="/assets/resume.pdf"
              download
              className="navbar__button"
              aria-label="Download Resume"
            >
              Resume
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className={`navbar__toggle ${isMenuOpen ? 'navbar__toggle--active' : ''}`}
            onClick={toggleMenu}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
          >
            <span className="navbar__toggle-bar"></span>
            <span className="navbar__toggle-bar"></span>
            <span className="navbar__toggle-bar"></span>
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobile && (
        <>
          <div
            className={`navbar__overlay ${isMenuOpen ? 'navbar__overlay--visible' : ''}`}
            onClick={() => setIsMenuOpen(false)}
            aria-hidden="true"
          />
          
          <div
            id="mobile-menu"
            className={`navbar__mobile ${isMenuOpen ? 'navbar__mobile--open' : ''}`}
            role="menu"
          >
            <ul className="navbar__mobile-list">
              {navLinks.map((link, index) => (
                <li 
                  key={link.id} 
                  className="navbar__mobile-item"
                  style={{ transitionDelay: `${index * 50}ms` }}
                  role="none"
                >
                  <a
                    href={link.path}
                    onClick={(e) => handleNavClick(e, link.path)}
                    className="navbar__mobile-link"
                    role="menuitem"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
              <li 
                className="navbar__mobile-item navbar__mobile-item--cta"
                style={{ transitionDelay: `${navLinks.length * 50}ms` }}
                role="none"
              >
                <a
                  href="/assets/resume.pdf"
                  download
                  className="navbar__mobile-button"
                  role="menuitem"
                >
                  Download Resume
                </a>
              </li>
            </ul>
          </div>
        </>
      )}
    </>
  );
};

export default Navbar;
