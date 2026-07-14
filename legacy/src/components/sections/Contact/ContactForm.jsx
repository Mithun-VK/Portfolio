import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Button from '../../common/Button/Button';
import './Contact.css';

const ContactForm = () => {
  const formRef = useRef();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

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
      toast.error('Please fix the errors in the form.');
      return;
    }

    setIsSubmitting(true);

    try {
      // NOTE: Replace these with your actual EmailJS Service ID, Template ID, and Public Key
      await emailjs.sendForm(
        'YOUR_SERVICE_ID', 
        'YOUR_TEMPLATE_ID', 
        formRef.current, 
        'YOUR_PUBLIC_KEY'
      );
      
      toast.success("Message sent successfully! I'll get back to you soon.", {
        position: "bottom-right",
        autoClose: 5000,
        theme: "dark",
      });

      setFormData({ name: '', email: '', subject: '', message: '' });
      setTouched({});
      setErrors({});
    } catch {
      toast.error('Something went wrong. Please try again later.', {
        position: "bottom-right",
        theme: "dark",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <motion.form 
        ref={formRef} 
        className="contact-form" 
        onSubmit={handleSubmit} 
        noValidate
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div 
          className="contact-form__header"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <h3 className="contact-form__title">Send Me a Message</h3>
          <p className="contact-form__subtitle">
            Fill out the form below and I'll respond within 24 hours
          </p>
        </motion.div>

        <motion.div 
          className="contact-form__group"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <label htmlFor="name" className="contact-form__label">
            Name <span className="contact-form__required">*</span>
          </label>
          <motion.input
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
            whileFocus={{ scale: 1.02, boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.2)' }}
            transition={{ duration: 0.2 }}
          />
          {errors.name && touched.name && (
            <motion.span 
              id="name-error" 
              className="contact-form__error" 
              role="alert"
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {errors.name}
            </motion.span>
          )}
        </motion.div>

        <motion.div 
          className="contact-form__group"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.25 }}
        >
          <label htmlFor="email" className="contact-form__label">
            Email <span className="contact-form__required">*</span>
          </label>
          <motion.input
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
            whileFocus={{ scale: 1.02, boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.2)' }}
            transition={{ duration: 0.2 }}
          />
          {errors.email && touched.email && (
            <motion.span 
              id="email-error" 
              className="contact-form__error" 
              role="alert"
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {errors.email}
            </motion.span>
          )}
        </motion.div>

        <motion.div 
          className="contact-form__group"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          <label htmlFor="subject" className="contact-form__label">
            Subject <span className="contact-form__required">*</span>
          </label>
          <motion.input
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
            whileFocus={{ scale: 1.02, boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.2)' }}
            transition={{ duration: 0.2 }}
          />
          {errors.subject && touched.subject && (
            <motion.span 
              id="subject-error" 
              className="contact-form__error" 
              role="alert"
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {errors.subject}
            </motion.span>
          )}
        </motion.div>

        <motion.div 
          className="contact-form__group"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.35 }}
        >
          <label htmlFor="message" className="contact-form__label">
            Message <span className="contact-form__required">*</span>
          </label>
          <motion.textarea
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
            whileFocus={{ scale: 1.01, boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.2)' }}
            transition={{ duration: 0.2 }}
          />
          {errors.message && touched.message && (
            <motion.span 
              id="message-error" 
              className="contact-form__error" 
              role="alert"
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {errors.message}
            </motion.span>
          )}
          <motion.div 
            className="contact-form__char-count"
            initial={{ opacity: 0 }}
            animate={{ opacity: formData.message.length > 0 ? 1 : 0 }}
          >
            {formData.message.length} / 500 characters
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
        >
          <Button
            type="submit"
            variant="primary"
            size="large"
            fullWidth
            loading={isSubmitting}
            className="interactive"
          >
            Send Message
          </Button>
        </motion.div>
      </motion.form>
      <ToastContainer />
    </>
  );
};

export default ContactForm;
