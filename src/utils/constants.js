/**
 * Application Constants
 * Centralized configuration and constant values
 */

// ============================================
// APPLICATION INFO
// ============================================
export const APP_INFO = {
  name: 'Mithun V K - Portfolio',
  shortName: 'Mithun VK',
  description: 'Full-Stack Developer & AI/ML Enthusiast',
  version: '1.0.0',
  author: 'Mithun V K',
  email: 'mithunvk216@gmail.com',
  location: 'India',
  tagline: 'Building innovative solutions with modern technologies'
};

// ============================================
// SOCIAL LINKS
// ============================================
export const SOCIAL_LINKS = {
  linkedin: 'https://www.linkedin.com/in/mithun-v-k-76625927b/',
  github: 'https://github.com/Mithun-VK',
  twitter: 'https://twitter.com/yourusername',
  email: 'mailto:mithunvk216@gmail.com',
  resume: '/assets/documents/resume.pdf'
};

// ============================================
// NAVIGATION
// ============================================
export const NAV_ITEMS = [
  { id: 'home', label: 'Home', path: '/#home' },
  { id: 'about', label: 'About', path: '/#about' },
  { id: 'skills', label: 'Skills', path: '/#skills' },
  { id: 'projects', label: 'Projects', path: '/#projects' },
  { id: 'experience', label: 'Experience', path: '/#experience' },
  { id: 'contact', label: 'Contact', path: '/#contact' }
];

// ============================================
// ROUTES
// ============================================
export const ROUTES = {
  HOME: '/',
  PROJECT_DETAILS: '/project/:id',
  NOT_FOUND: '/404',
  // Add more routes as needed
};

// ============================================
// API ENDPOINTS (if applicable)
// ============================================
export const API_ENDPOINTS = {
  BASE_URL: process.env.REACT_APP_API_URL || 'http://localhost:3001',
  CONTACT: '/api/contact',
  ANALYTICS: '/api/analytics',
  PROJECTS: '/api/projects'
};

// ============================================
// LOCAL STORAGE KEYS
// ============================================
export const STORAGE_KEYS = {
  THEME: 'portfolio-theme',
  LANGUAGE: 'portfolio-language',
  CONSENT: 'portfolio-cookie-consent',
  VISITED: 'portfolio-visited'
};

// ============================================
// ANIMATION DURATIONS (in ms)
// ============================================
export const ANIMATION_DURATION = {
  FAST: 150,
  BASE: 300,
  SLOW: 500,
  VERY_SLOW: 1000
};

// ============================================
// BREAKPOINTS
// ============================================
export const BREAKPOINTS = {
  XS: 320,
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280,
  XXL: 1536
};

// ============================================
// THEME COLORS
// ============================================
export const THEME_COLORS = {
  LIGHT: {
    primary: '#3b82f6',
    secondary: '#8b5cf6',
    accent: '#10b981',
    background: '#ffffff',
    text: '#1f2937'
  },
  DARK: {
    primary: '#60a5fa',
    secondary: '#a78bfa',
    accent: '#34d399',
    background: '#111827',
    text: '#f9fafb'
  }
};

// ============================================
// SCROLL SETTINGS
// ============================================
export const SCROLL_SETTINGS = {
  OFFSET: 80, // Navbar height
  THRESHOLD: 100, // Scroll threshold for effects
  SMOOTH_DURATION: 800,
  DEBOUNCE_DELAY: 100
};

// ============================================
// FORM VALIDATION
// ============================================
export const VALIDATION = {
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE_REGEX: /^[\d\s()+-]+$/,
  URL_REGEX: /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/,
  
  MIN_NAME_LENGTH: 2,
  MAX_NAME_LENGTH: 50,
  MIN_MESSAGE_LENGTH: 10,
  MAX_MESSAGE_LENGTH: 500,
  MIN_SUBJECT_LENGTH: 5,
  MAX_SUBJECT_LENGTH: 100
};

// ============================================
// ERROR MESSAGES
// ============================================
export const ERROR_MESSAGES = {
  REQUIRED_FIELD: 'This field is required',
  INVALID_EMAIL: 'Please enter a valid email address',
  INVALID_PHONE: 'Please enter a valid phone number',
  INVALID_URL: 'Please enter a valid URL',
  MIN_LENGTH: (min) => `Must be at least ${min} characters`,
  MAX_LENGTH: (max) => `Must be no more than ${max} characters`,
  NETWORK_ERROR: 'Network error. Please check your connection',
  SERVER_ERROR: 'Server error. Please try again later',
  UNKNOWN_ERROR: 'An unexpected error occurred'
};

// ============================================
// SUCCESS MESSAGES
// ============================================
export const SUCCESS_MESSAGES = {
  FORM_SUBMITTED: 'Your message has been sent successfully!',
  EMAIL_SENT: 'Email sent successfully!',
  DATA_SAVED: 'Data saved successfully!'
};

// ============================================
// PAGINATION
// ============================================
export const PAGINATION = {
  PROJECTS_PER_PAGE: 9,
  SKILLS_PER_PAGE: 10,
  ITEMS_PER_LOAD: 6
};

// ============================================
// SEO META TAGS
// ============================================
export const SEO_META = {
  DEFAULT_TITLE: 'Mithun V K - Full-Stack Developer Portfolio',
  TITLE_TEMPLATE: '%s | Mithun V K',
  DEFAULT_DESCRIPTION: 'Portfolio of Mithun V K - Full-Stack Developer specializing in React, Node.js, and AI/ML. View my projects and get in touch.',
  DEFAULT_KEYWORDS: 'Full-Stack Developer, React Developer, Node.js, AI/ML, Portfolio, Web Development',
  SITE_URL: 'https://yourdomain.com',
  OG_IMAGE: '/assets/images/og-image.jpg',
  TWITTER_HANDLE: '@yourusername'
};

// ============================================
// DATE FORMATS
// ============================================
export const DATE_FORMATS = {
  SHORT: 'MMM YYYY',
  LONG: 'MMMM YYYY',
  FULL: 'MMMM DD, YYYY',
  ISO: 'YYYY-MM-DD'
};

// ============================================
// FILE UPLOADS (if applicable)
// ============================================
export const FILE_UPLOAD = {
  MAX_SIZE: 5 * 1024 * 1024, // 5MB
  ALLOWED_TYPES: ['image/jpeg', 'image/png', 'image/gif', 'application/pdf'],
  ALLOWED_EXTENSIONS: ['.jpg', '.jpeg', '.png', '.gif', '.pdf']
};

// ============================================
// ANALYTICS (if applicable)
// ============================================
export const ANALYTICS = {
  GOOGLE_ANALYTICS_ID: process.env.REACT_APP_GA_ID,
  TRACK_EVENTS: {
    PAGE_VIEW: 'page_view',
    PROJECT_CLICK: 'project_click',
    CONTACT_SUBMIT: 'contact_submit',
    SOCIAL_CLICK: 'social_click',
    RESUME_DOWNLOAD: 'resume_download'
  }
};

// ============================================
// FEATURE FLAGS
// ============================================
export const FEATURE_FLAGS = {
  ENABLE_ANALYTICS: process.env.REACT_APP_ENABLE_ANALYTICS === 'true',
  ENABLE_DARK_MODE: true,
  ENABLE_ANIMATIONS: true,
  ENABLE_CONTACT_FORM: true,
  SHOW_BLOG: false,
  SHOW_TESTIMONIALS: false
};

// ============================================
// STATUS CODES
// ============================================
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  SERVER_ERROR: 500
};

// ============================================
// CONTACT INFO
// ============================================
export const CONTACT_INFO = {
  email: 'mithunvk216@gmail.com',
  location: 'India',
  availability: 'Available for opportunities',
  responseTime: '24 hours',
  preferredContact: 'email'
};

// Freeze objects to prevent modifications
Object.freeze(APP_INFO);
Object.freeze(SOCIAL_LINKS);
Object.freeze(NAV_ITEMS);
Object.freeze(ROUTES);
Object.freeze(STORAGE_KEYS);
Object.freeze(BREAKPOINTS);
