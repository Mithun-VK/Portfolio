import { useState, useEffect, useCallback } from 'react';

/**
 * Custom hook for theme management
 * Handles light/dark mode with system preference detection
 * Persists theme preference in localStorage
 * 
 * @returns {Object} Theme state and controls
 */
const useTheme = () => {
  const STORAGE_KEY = 'portfolio-theme';
  const THEMES = {
    LIGHT: 'light',
    DARK: 'dark',
    AUTO: 'auto'
  };

  // Get initial theme from localStorage or default to auto
  const getInitialTheme = () => {
    try {
      const savedTheme = localStorage.getItem(STORAGE_KEY);
      if (savedTheme && Object.values(THEMES).includes(savedTheme)) {
        return savedTheme;
      }
    } catch (error) {
      console.warn('Failed to access localStorage:', error);
    }
    return THEMES.AUTO;
  };

  // Detect system theme preference
  const getSystemTheme = useCallback(() => {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return THEMES.DARK;
    }
    return THEMES.LIGHT;
  }, [THEMES.DARK, THEMES.LIGHT]);

  // Calculate actual theme (resolves 'auto' to light/dark)
  const resolveTheme = useCallback((theme) => {
    if (theme === THEMES.AUTO) {
      return getSystemTheme();
    }
    return theme;
  }, [THEMES.AUTO, getSystemTheme]);

  const [themePreference, setThemePreference] = useState(getInitialTheme);
  const [actualTheme, setActualTheme] = useState(() => resolveTheme(getInitialTheme()));

  // Apply theme to document
  const applyTheme = useCallback((theme) => {
    const resolvedTheme = resolveTheme(theme);
    
    // Remove existing theme classes
    document.documentElement.classList.remove('light', 'dark');
    
    // Add new theme class
    document.documentElement.classList.add(resolvedTheme);
    
    // Set data attribute for CSS
    document.documentElement.setAttribute('data-theme', resolvedTheme);
    
    // Update color-scheme meta tag
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute(
        'content',
        resolvedTheme === THEMES.DARK ? '#111827' : '#ffffff'
      );
    }

    setActualTheme(resolvedTheme);
  }, [resolveTheme, THEMES.DARK]);

  // Set theme preference and persist
  const setTheme = useCallback((newTheme) => {
    if (!Object.values(THEMES).includes(newTheme)) {
      console.warn(`Invalid theme: ${newTheme}`);
      return;
    }

    setThemePreference(newTheme);
    applyTheme(newTheme);

    try {
      localStorage.setItem(STORAGE_KEY, newTheme);
    } catch (error) {
      console.warn('Failed to save theme to localStorage:', error);
    }
  }, [THEMES, applyTheme]);

  // Toggle between light and dark
  const toggleTheme = useCallback(() => {
    const newTheme = actualTheme === THEMES.DARK ? THEMES.LIGHT : THEMES.DARK;
    setTheme(newTheme);
  }, [actualTheme, THEMES.DARK, THEMES.LIGHT, setTheme]);

  // Listen for system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleSystemThemeChange = (e) => {
      if (themePreference === THEMES.AUTO) {
        const newSystemTheme = e.matches ? THEMES.DARK : THEMES.LIGHT;
        applyTheme(THEMES.AUTO);
        setActualTheme(newSystemTheme);
      }
    };

    // Modern browsers
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleSystemThemeChange);
    } else if (mediaQuery.addListener) {
      // Legacy support
      mediaQuery.addListener(handleSystemThemeChange);
    }

    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handleSystemThemeChange);
      } else if (mediaQuery.removeListener) {
        mediaQuery.removeListener(handleSystemThemeChange);
      }
    };
  }, [themePreference, THEMES.AUTO, THEMES.DARK, THEMES.LIGHT, applyTheme]);

  // Apply initial theme
  useEffect(() => {
    applyTheme(themePreference);
  }, []); // Only run once on mount

  return {
    theme: actualTheme,
    themePreference,
    setTheme,
    toggleTheme,
    isDark: actualTheme === THEMES.DARK,
    isLight: actualTheme === THEMES.LIGHT,
    isAuto: themePreference === THEMES.AUTO,
    THEMES
  };
};

export default useTheme;
