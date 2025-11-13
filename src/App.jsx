import React, { useEffect, Suspense, lazy } from 'react';
import { Routes, Route,useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import useTheme from './hooks/useTheme';
import { ROUTES, FEATURE_FLAGS } from './utils/constants';
import './App.css';

// Lazy load pages for better performance
const Home = lazy(() => import('./pages/Home'));
const ProjectDetails = lazy(() => import('./pages/ProjectDetails'));
const NotFound = lazy(() => import('./pages/NotFound'));

// Loading component
const LoadingFallback = () => (
  <div className="app-loading">
    <div className="app-loading__spinner" role="status">
      <span className="sr-only">Loading...</span>
    </div>
    <p className="app-loading__text" aria-live="polite">Loading...</p>
  </div>
);

// Simple Error Fallback
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <div className="error-boundary__icon">⚠️</div>
          <h1 className="error-boundary__title">Oops! Something went wrong</h1>
          <p className="error-boundary__message">
            We're sorry for the inconvenience. Please try reloading the page.
          </p>
          <button 
            className="error-boundary__button" 
            onClick={() => window.location.reload()}
          >
            Reload Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

function App() {
  const { theme, isDark } = useTheme();
  const location = useLocation();

  // Set theme class on mount and when theme changes
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    
    // Update meta theme-color
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute(
        'content',
        isDark ? '#0f172a' : '#ffffff'
      );
    }

    // Remove preload class after initial load
    document.documentElement.classList.remove('preload');
  }, [theme, isDark]);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Set up analytics (if enabled)
  useEffect(() => {
    if (FEATURE_FLAGS.ENABLE_ANALYTICS && process.env.REACT_APP_GA_ID) {
      // Initialize Google Analytics
      const script = document.createElement('script');
      script.src = `https://www.googletagmanager.com/gtag/js?id=${process.env.REACT_APP_GA_ID}`;
      script.async = true;
      document.head.appendChild(script);

      script.onload = () => {
        window.dataLayer = window.dataLayer || [];
        function gtag(){window.dataLayer.push(arguments);}
        window.gtag = gtag;
        gtag('js', new Date());
        gtag('config', process.env.REACT_APP_GA_ID);
      };
    }
  }, []);

  // Track page views
  useEffect(() => {
    if (FEATURE_FLAGS.ENABLE_ANALYTICS && window.gtag) {
      window.gtag('event', 'page_view', {
        page_path: location.pathname + location.search,
        page_title: document.title
      });
    }
  }, [location]);

  // Handle visibility change for performance
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        document.documentElement.classList.add('page-hidden');
      } else {
        document.documentElement.classList.remove('page-hidden');
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  // Handle online/offline status
  useEffect(() => {
    const handleOnline = () => {
      document.documentElement.classList.remove('offline');
    };

    const handleOffline = () => {
      document.documentElement.classList.add('offline');
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Check initial status
    if (!navigator.onLine) {
      document.documentElement.classList.add('offline');
    }

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return (
    <ErrorBoundary>
      <HelmetProvider>
        <div className="app">
          <Suspense fallback={<LoadingFallback />}>
            <Routes>
              {/* Home Route */}
              <Route path={ROUTES.HOME} element={<Home />} />
              
              {/* Project Details Route */}
              <Route path={ROUTES.PROJECT_DETAILS} element={<ProjectDetails />} />
              
              {/* 404 Not Found Route */}
              <Route path="/404" element={<NotFound />} />
              
              {/* Catch all - redirect to 404 */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>

          {/* Offline Indicator */}
          <OfflineIndicator />
        </div>
      </HelmetProvider>
    </ErrorBoundary>
  );
}

// Offline Indicator Component
const OfflineIndicator = () => {
  const [isOffline, setIsOffline] = React.useState(!navigator.onLine);

  React.useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (!isOffline) return null;

  return (
    <div className="offline-indicator" role="alert" aria-live="assertive">
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <line x1="1" y1="1" x2="23" y2="23"/>
        <path d="M16.72 11.06A10.94 10.94 0 0 1 19 12.55"/>
        <path d="M5 12.55a10.94 10.94 0 0 1 5.17-2.39"/>
        <path d="M10.71 5.05A16 16 0 0 1 22.58 9"/>
        <path d="M1.42 9a15.91 15.91 0 0 1 4.7-2.88"/>
        <path d="M8.53 16.11a6 6 0 0 1 6.95 0"/>
        <line x1="12" y1="20" x2="12.01" y2="20"/>
      </svg>
      <span>You're offline. Some features may be unavailable.</span>
    </div>
  );
};

export default App;
