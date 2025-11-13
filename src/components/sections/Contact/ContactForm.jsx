import React, { useState } from 'react';
import Button from '../../common/Button/Button';
import './Contact.css';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateField = (name, value) => {
    switch (name) {
      case 'name':
        if (!value.trim()) return 'Name is required';
        if (value.trim().length < 2) return 'Name must be at least 2 characters';
        return '';
      
      case 'email':
        if (!value.trim()) return 'Email is required';
        if (!validateEmail(value)) return 'Please enter a valid email address';
        return '';
      
      case 'subject':
        if (!value.trim()) return 'Subject is required';
        if (value.trim().length < 5) return 'Subject must be at least 5 characters';
        return '';
      
      case 'message':
        if (!value.trim()) return 'Message is required';
        if (value.trim().length < 10) return 'Message must be at least 10 characters';
        return '';
      
      default:
        return '';
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Real-time validation
    if (touched[name]) {
      const error = validateField(name, value);
      setErrors(prev => ({ ...prev, [name]: error }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    
    const error = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate all fields
    const newErrors = {};
    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key]);
      if (error) newErrors[key] = error;
    });

    setErrors(newErrors);
    setTouched({
      name: true,
      email: true,
      subject: true,
      message: true
    });

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Simulate API call - Replace with your actual endpoint
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Success
      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTouched({});
      setErrors({});
      
      // Reset success message after 5 seconds
      setTimeout(() => setSubmitStatus(null), 5000);
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="contact-form" onSubmit={handleSubmit} noValidate>
      <div className="contact-form__header">
        <h3 className="contact-form__title">Send Me a Message</h3>
        <p className="contact-form__subtitle">
          Fill out the form below and I'll respond within 24 hours
        </p>
      </div>

      {/* Name Field */}
      <div className="contact-form__group">
        <label htmlFor="name" className="contact-form__label">
          Name <span className="contact-form__required">*</span>
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          onBlur={handleBlur}
          className={`contact-form__input ${errors.name && touched.name ? 'contact-form__input--error' : ''} ${formData.name && !errors.name ? 'contact-form__input--success' : ''}`}
          placeholder="Your full name"
          aria-required="true"
          aria-invalid={errors.name && touched.name ? 'true' : 'false'}
          aria-describedby={errors.name && touched.name ? 'name-error' : undefined}
        />
        {errors.name && touched.name && (
          <span id="name-error" className="contact-form__error" role="alert">
            {errors.name}
          </span>
        )}
      </div>

      {/* Email Field */}
      <div className="contact-form__group">
        <label htmlFor="email" className="contact-form__label">
          Email <span className="contact-form__required">*</span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          onBlur={handleBlur}
          className={`contact-form__input ${errors.email && touched.email ? 'contact-form__input--error' : ''} ${formData.email && !errors.email ? 'contact-form__input--success' : ''}`}
          placeholder="your.email@example.com"
          aria-required="true"
          aria-invalid={errors.email && touched.email ? 'true' : 'false'}
          aria-describedby={errors.email && touched.email ? 'email-error' : undefined}
        />
        {errors.email && touched.email && (
          <span id="email-error" className="contact-form__error" role="alert">
            {errors.email}
          </span>
        )}
      </div>

      {/* Subject Field */}
      <div className="contact-form__group">
        <label htmlFor="subject" className="contact-form__label">
          Subject <span className="contact-form__required">*</span>
        </label>
        <input
          type="text"
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          onBlur={handleBlur}
          className={`contact-form__input ${errors.subject && touched.subject ? 'contact-form__input--error' : ''} ${formData.subject && !errors.subject ? 'contact-form__input--success' : ''}`}
          placeholder="What is this regarding?"
          aria-required="true"
          aria-invalid={errors.subject && touched.subject ? 'true' : 'false'}
          aria-describedby={errors.subject && touched.subject ? 'subject-error' : undefined}
        />
        {errors.subject && touched.subject && (
          <span id="subject-error" className="contact-form__error" role="alert">
            {errors.subject}
          </span>
        )}
      </div>

      {/* Message Field */}
      <div className="contact-form__group">
        <label htmlFor="message" className="contact-form__label">
          Message <span className="contact-form__required">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          onBlur={handleBlur}
          rows="6"
          className={`contact-form__textarea ${errors.message && touched.message ? 'contact-form__input--error' : ''} ${formData.message && !errors.message ? 'contact-form__input--success' : ''}`}
          placeholder="Tell me about your project or inquiry..."
          aria-required="true"
          aria-invalid={errors.message && touched.message ? 'true' : 'false'}
          aria-describedby={errors.message && touched.message ? 'message-error' : undefined}
        />
        {errors.message && touched.message && (
          <span id="message-error" className="contact-form__error" role="alert">
            {errors.message}
          </span>
        )}
        <div className="contact-form__char-count">
          {formData.message.length} / 500 characters
        </div>
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        variant="primary"
        size="large"
        fullWidth
        loading={isSubmitting}
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Sending...' : 'Send Message'}
      </Button>

      {/* Status Messages */}
      {submitStatus === 'success' && (
        <div className="contact-form__success" role="alert">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
          <span>Message sent successfully! I'll get back to you soon.</span>
        </div>
      )}

      {submitStatus === 'error' && (
        <div className="contact-form__error-banner" role="alert">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10"/>
            <line x1="12" y1="8" x2="12" y2="12"/>
            <line x1="12" y1="16" x2="12.01" y2="16"/>
          </svg>
          <span>Something went wrong. Please try again later.</span>
        </div>
      )}
    </form>
  );
};

export default ContactForm;
