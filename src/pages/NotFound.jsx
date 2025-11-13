import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Button from '../components/common/Button/Button';
import Card from '../components/common/Card/Card';
import { SEO_META } from '../utils/constants';
import './NotFound.css';

const NotFound = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Log 404 for analytics (optional)
    if (window.gtag) {
      window.gtag('event', 'page_view', {
        page_title: '404 Not Found',
        page_path: location.pathname
      });
    }
  }, [location]);

  const quickLinks = [
    { label: 'Home', path: '/', icon: '🏠', description: 'Back to homepage' },
    { label: 'About', path: '/#about', icon: '👤', description: 'Learn about me' },
    { label: 'Projects', path: '/#projects', icon: '💼', description: 'View my work' },
    { label: 'Skills', path: '/#skills', icon: '⚡', description: 'My expertise' },
    { label: 'Contact', path: '/#contact', icon: '📧', description: 'Get in touch' }
  ];

  const HomeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
      <polyline points="9 22 9 12 15 12 15 22"/>
    </svg>
  );

  const BackIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="19" y1="12" x2="5" y2="12"/>
      <polyline points="12 19 5 12 12 5"/>
    </svg>
  );

  const SearchIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="11" cy="11" r="8"/>
      <path d="m21 21-4.35-4.35"/>
    </svg>
  );

  return (
    <>
      {/* SEO Meta Tags */}
      <Helmet>
        <title>404 - Page Not Found | {SEO_META.DEFAULT_TITLE}</title>
        <meta name="description" content="The page you're looking for doesn't exist. Navigate back to explore my portfolio." />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="not-found">
        {/* Animated Background */}
        <div className="not-found__bg" aria-hidden="true">
          <div className="not-found__shape not-found__shape--1"></div>
          <div className="not-found__shape not-found__shape--2"></div>
          <div className="not-found__shape not-found__shape--3"></div>
        </div>

        <div className="not-found__container">
          {/* Main Content Card */}
          <Card variant="elevated" className="not-found__card">
            <Card.Body>
              {/* 404 Illustration */}
              <div className="not-found__illustration">
                <div className="not-found__404" role="img" aria-label="404 Error">
                  <span className="not-found__404-digit">4</span>
                  <span className="not-found__404-digit not-found__404-digit--special">
                    <span className="not-found__orbit" aria-hidden="true"></span>
                    <span className="not-found__planet">0</span>
                  </span>
                  <span className="not-found__404-digit">4</span>
                </div>
              </div>

              {/* Text Content */}
              <div className="not-found__content">
                <h1 className="not-found__title">Page Not Found</h1>
                <p className="not-found__description">
                  Oops! The page you're looking for doesn't exist. 
                  It might have been moved, deleted, or the URL might be incorrect.
                </p>
                {location.pathname && (
                  <p className="not-found__path">
                    Requested path: <code>{location.pathname}</code>
                  </p>
                )}
              </div>

              {/* Action Buttons */}
              <div className="not-found__actions">
                <Button
                  variant="primary"
                  size="large"
                  iconLeft={<HomeIcon />}
                  onClick={() => navigate('/')}
                  aria-label="Go to homepage"
                >
                  Go Home
                </Button>
                <Button
                  variant="outline"
                  size="large"
                  iconLeft={<BackIcon />}
                  onClick={() => navigate(-1)}
                  aria-label="Go back to previous page"
                >
                  Go Back
                </Button>
              </div>
            </Card.Body>
          </Card>

          {/* Quick Links Card */}
          <Card variant="outlined" className="not-found__links-card">
            <Card.Header>
              <div className="not-found__links-header">
                <SearchIcon />
                <h3 className="not-found__links-title">Quick Navigation</h3>
              </div>
              <p className="not-found__links-subtitle">
                Explore my portfolio sections
              </p>
            </Card.Header>
            <Card.Body>
              <div className="not-found__links-grid">
                {quickLinks.map((link, index) => (
                  <button
                    key={index}
                    onClick={() => navigate(link.path)}
                    className="not-found__link-item"
                    aria-label={`Navigate to ${link.label}: ${link.description}`}
                    title={link.description}
                  >
                    <span className="not-found__link-icon" aria-hidden="true">
                      {link.icon}
                    </span>
                    <div className="not-found__link-content">
                      <span className="not-found__link-label">{link.label}</span>
                      <span className="not-found__link-description">{link.description}</span>
                    </div>
                    <span className="not-found__link-arrow" aria-hidden="true">→</span>
                  </button>
                ))}
              </div>
            </Card.Body>
          </Card>

          {/* Help Text */}
          <div className="not-found__help">
            <p className="not-found__help-text">
              Still can't find what you're looking for? 
              <a href="/#contact" className="not-found__help-link"> Contact me</a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotFound;
