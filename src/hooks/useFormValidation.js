import { useState, useCallback, useMemo } from 'react';

/**
 * Custom hook for form validation
 * Provides form state management and validation utilities
 * 
 * @param {Object} initialValues - Initial form values
 * @param {Object} validationRules - Validation rules for each field
 * @param {Function} onSubmit - Submit handler
 * @returns {Object} Form state and handlers
 */
const useFormValidation = (initialValues = {}, validationRules = {}, onSubmit) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitCount, setSubmitCount] = useState(0);

  // Validation rule creators
  const validationTypes = {
    required: (message = 'This field is required') => ({
      validate: (value) => {
        if (typeof value === 'string') {
          return value.trim().length > 0;
        }
        return value !== null && value !== undefined && value !== '';
      },
      message
    }),

    email: (message = 'Please enter a valid email address') => ({
      validate: (value) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return !value || emailRegex.test(value);
      },
      message
    }),

    minLength: (min, message = `Must be at least ${min} characters`) => ({
      validate: (value) => !value || value.length >= min,
      message
    }),

    maxLength: (max, message = `Must be no more than ${max} characters`) => ({
      validate: (value) => !value || value.length <= max,
      message
    }),

    pattern: (regex, message = 'Invalid format') => ({
      validate: (value) => !value || regex.test(value),
      message
    }),

    custom: (validateFn, message = 'Validation failed') => ({
      validate: validateFn,
      message
    }),

    match: (fieldName, message = 'Fields do not match') => ({
      validate: (value, allValues) => !value || value === allValues[fieldName],
      message
    })
  };

  // Validate a single field
  const validateField = useCallback((name, value) => {
    const rules = validationRules[name];
    if (!rules || !Array.isArray(rules)) return '';

    for (const rule of rules) {
      if (!rule.validate(value, values)) {
        return rule.message;
      }
    }
    return '';
  }, [validationRules, values]);

  // Validate all fields
  const validateForm = useCallback(() => {
    const newErrors = {};
    let isValid = true;

    Object.keys(validationRules).forEach((fieldName) => {
      const error = validateField(fieldName, values[fieldName]);
      if (error) {
        newErrors[fieldName] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  }, [validationRules, values, validateField]);

  // Handle input change
  const handleChange = useCallback((event) => {
    const { name, value, type, checked } = event.target;
    const newValue = type === 'checkbox' ? checked : value;

    setValues(prev => ({ ...prev, [name]: newValue }));

    // Clear error if field becomes valid
    if (touched[name]) {
      const error = validateField(name, newValue);
      setErrors(prev => ({
        ...prev,
        [name]: error
      }));
    }
  }, [touched, validateField]);

  // Handle input blur
  const handleBlur = useCallback((event) => {
    const { name, value } = event.target;
    
    setTouched(prev => ({ ...prev, [name]: true }));
    
    const error = validateField(name, value);
    setErrors(prev => ({
      ...prev,
      [name]: error
    }));
  }, [validateField]);

  // Handle form submit
  const handleSubmit = useCallback(async (event) => {
    if (event) {
      event.preventDefault();
    }

    // Mark all fields as touched
    const allTouched = Object.keys(validationRules).reduce((acc, key) => {
      acc[key] = true;
      return acc;
    }, {});
    setTouched(allTouched);

    // Validate form
    const isValid = validateForm();
    setSubmitCount(prev => prev + 1);

    if (!isValid) {
      return;
    }

    if (onSubmit) {
      setIsSubmitting(true);
      try {
        await onSubmit(values);
      } catch (error) {
        
        throw error;
      } finally {
        setIsSubmitting(false);
      }
    }
  }, [validationRules, validateForm, onSubmit, values]);

  // Reset form
  const resetForm = useCallback((newValues = initialValues) => {
    setValues(newValues);
    setErrors({});
    setTouched({});
    setIsSubmitting(false);
    setSubmitCount(0);
  }, [initialValues]);

  // Set field value programmatically
  const setFieldValue = useCallback((name, value) => {
    setValues(prev => ({ ...prev, [name]: value }));
    
    if (touched[name]) {
      const error = validateField(name, value);
      setErrors(prev => ({ ...prev, [name]: error }));
    }
  }, [touched, validateField]);

  // Set field error programmatically
  const setFieldError = useCallback((name, error) => {
    setErrors(prev => ({ ...prev, [name]: error }));
  }, []);

  // Set field touched programmatically
  const setFieldTouched = useCallback((name, isTouched = true) => {
    setTouched(prev => ({ ...prev, [name]: isTouched }));
  }, []);

  // Check if form is valid
  const isValid = useMemo(() => {
    return Object.keys(errors).length === 0;
  }, [errors]);

  // Check if form is dirty (has changes)
  const isDirty = useMemo(() => {
    return JSON.stringify(values) !== JSON.stringify(initialValues);
  }, [values, initialValues]);

  // Get field props (for easy spreading)
  const getFieldProps = useCallback((name) => ({
    name,
    value: values[name] || '',
    onChange: handleChange,
    onBlur: handleBlur
  }), [values, handleChange, handleBlur]);

  // Get field meta (error and touched state)
  const getFieldMeta = useCallback((name) => ({
    error: errors[name],
    touched: touched[name],
    invalid: Boolean(errors[name] && touched[name])
  }), [errors, touched]);

  return {
    values,
    errors,
    touched,
    isSubmitting,
    isValid,
    isDirty,
    submitCount,
    handleChange,
    handleBlur,
    handleSubmit,
    resetForm,
    setFieldValue,
    setFieldError,
    setFieldTouched,
    validateField,
    validateForm,
    getFieldProps,
    getFieldMeta,
    validationTypes
  };
};

export default useFormValidation;
