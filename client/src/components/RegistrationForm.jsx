/**
 * components/RegistrationForm.jsx
 * Workshop registration form with:
 *  - Client-side validation (name, email, phone)
 *  - Async POST to /api/enquiry (Express backend)
 *  - Success / error state display
 *  - Loading spinner during submission
 */
import { useState, useEffect, useRef } from 'react';

// ── Initial form state ────────────────────────────────────────────────────────
const INITIAL_FORM = { name: '', email: '', phoneNumber: '' };
const INITIAL_ERRORS = { name: '', email: '', phoneNumber: '' };

// ── Validation helpers ────────────────────────────────────────────────────────
const validateField = (name, value) => {
  switch (name) {
    case 'name':
      if (!value.trim()) return 'Full name is required';
      if (value.trim().length < 2) return 'Name must be at least 2 characters';
      if (value.trim().length > 100) return 'Name cannot exceed 100 characters';
      return '';

    case 'email':
      if (!value.trim()) return 'Email address is required';
      if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value.trim()))
        return 'Please enter a valid email address';
      return '';

    case 'phoneNumber':
      if (!value.trim()) return 'Phone number is required';
      if (!/^[6-9]\d{9}$/.test(value.trim()))
        return 'Enter a valid 10-digit Indian mobile number';
      return '';

    default:
      return '';
  }
};

// ── Component ─────────────────────────────────────────────────────────────────
const RegistrationForm = () => {
  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState(INITIAL_ERRORS);
  const [touched, setTouched] = useState({ name: false, email: false, phoneNumber: false });
  const [submitStatus, setSubmitStatus] = useState(null); // null | 'loading' | 'success' | 'error'
  const [serverMessage, setServerMessage] = useState('');
  const sectionRef = useRef(null);
  const alertRef = useRef(null);

  // Scroll reveal
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('visible');
        });
      },
      { threshold: 0.1 }
    );
    const reveals = sectionRef.current?.querySelectorAll('.reveal');
    reveals?.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Focus alert when it appears (accessibility)
  useEffect(() => {
    if (submitStatus === 'success' || submitStatus === 'error') {
      alertRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [submitStatus]);

  // ── Input change handler ─────────────────────────────────────────────────
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    // Live validation once field has been touched
    if (touched[name]) {
      setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
    }
  };

  // ── Blur handler: mark field as touched ─────────────────────────────────
  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
  };

  // ── Full-form validation before submit ──────────────────────────────────
  const validateAll = () => {
    const newErrors = {
      name: validateField('name', form.name),
      email: validateField('email', form.email),
      phoneNumber: validateField('phoneNumber', form.phoneNumber),
    };
    setErrors(newErrors);
    setTouched({ name: true, email: true, phoneNumber: true });
    return !Object.values(newErrors).some(Boolean);
  };

  // ── Form submit handler ──────────────────────────────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateAll()) return;

    setSubmitStatus('loading');
    setServerMessage('');

    try {
      const response = await fetch('https://mern-workshop-final.onrender.com/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim().toLowerCase(),
          phoneNumber: form.phoneNumber.trim(),
        }),
      });

      let data = {};

try {
  const text = await response.text();
  data = text ? JSON.parse(text) : {};
} catch (err) {
  data = {};
}

if (response.status === 201 || response.ok) {
        setSubmitStatus('success');
        setServerMessage(data.message || '🎉 Registration successful! We will contact you shortly.');
        setForm(INITIAL_FORM);
        setTouched({ name: false, email: false, phoneNumber: false });
        setErrors(INITIAL_ERRORS);
      } else {
        setSubmitStatus('error');
        // Show server validation errors or generic message
        const msg =
          data.errors?.join(' • ') ||
          data.message ||
          'Something went wrong. Please try again.';
        setServerMessage(msg);
      }
    } catch (networkErr) {
  setSubmitStatus('error');
  setServerMessage('FRONTEND CATCH ERROR');
  console.error(networkErr);
     
      console.error('Submission error:', networkErr);
    }
  };

  // ── Helper: input CSS class ──────────────────────────────────────────────
  const inputClass = (field) => {
    if (!touched[field]) return 'form-input';
    return `form-input ${errors[field] ? 'error' : 'success'}`;
  };

  const isLoading = submitStatus === 'loading';

  return (
    <section
      id="register"
      className="registration"
      aria-labelledby="register-heading"
      ref={sectionRef}
    >
      <div className="container">
        <div className="registration-wrapper">
          {/* Section Header */}
          <div className="section-header reveal">
            <p className="section-tag">📝 Register Now</p>
            <h2 id="register-heading" className="section-title">
              Secure Your <span>Spot Today</span>
            </h2>
            <p className="section-subtitle">
              Seats are limited to 20 students per batch. Fill in your details below
              and our team will reach out within 24 hours.
            </p>
          </div>

          {/* Form Card */}
          <div className="form-card reveal reveal-delay-1">
            <div className="form-card-header">
              <span className="emoji" aria-hidden="true">🚀</span>
              <h3
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.4rem',
                  marginBottom: '6px',
                }}
              >
                Workshop Registration
              </h3>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>
                Starting <strong style={{ color: 'var(--color-secondary)' }}>15 July 2026</strong>
                {' '}· ₹2,999 · Online
              </p>
            </div>

            {/* ── Server Response Alert ── */}
            {(submitStatus === 'success' || submitStatus === 'error') && (
              <div
                ref={alertRef}
                className={`form-alert ${submitStatus}`}
                role="alert"
                aria-live="assertive"
              >
                <span className="form-alert-icon" aria-hidden="true">
                  {submitStatus === 'success' ? '✅' : '❌'}
                </span>
                <span>{serverMessage}</span>
              </div>
            )}

            {/* ── Registration Form ── */}
            <form
              onSubmit={handleSubmit}
              noValidate
              aria-label="Workshop registration form"
            >
              {/* Name Field */}
              <div className="form-group">
                <label htmlFor="reg-name" className="form-label">
                  Full Name <span aria-hidden="true">*</span>
                </label>
                <div className="input-wrapper">
                  <input
                    id="reg-name"
                    type="text"
                    name="name"
                    className={inputClass('name')}
                    placeholder="e.g. Priya Sharma"
                    value={form.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    aria-required="true"
                    aria-invalid={touched.name && !!errors.name}
                    aria-describedby={errors.name ? 'name-error' : undefined}
                    disabled={isLoading}
                    autoComplete="name"
                  />
                  <span className="input-icon" aria-hidden="true">👤</span>
                </div>
                {touched.name && errors.name && (
                  <p id="name-error" className="field-error" role="alert">
                    ⚠ {errors.name}
                  </p>
                )}
              </div>

              {/* Email Field */}
              <div className="form-group">
                <label htmlFor="reg-email" className="form-label">
                  Email Address <span aria-hidden="true">*</span>
                </label>
                <div className="input-wrapper">
                  <input
                    id="reg-email"
                    type="email"
                    name="email"
                    className={inputClass('email')}
                    placeholder="e.g. priya@example.com"
                    value={form.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    aria-required="true"
                    aria-invalid={touched.email && !!errors.email}
                    aria-describedby={errors.email ? 'email-error' : undefined}
                    disabled={isLoading}
                    autoComplete="email"
                  />
                  <span className="input-icon" aria-hidden="true">✉️</span>
                </div>
                {touched.email && errors.email && (
                  <p id="email-error" className="field-error" role="alert">
                    ⚠ {errors.email}
                  </p>
                )}
              </div>

              {/* Phone Field */}
              <div className="form-group">
                <label htmlFor="reg-phone" className="form-label">
                  Phone Number <span aria-hidden="true">*</span>
                </label>
                <div className="input-wrapper">
                  <input
                    id="reg-phone"
                    type="tel"
                    name="phoneNumber"
                    className={inputClass('phoneNumber')}
                    placeholder="10-digit mobile number"
                    value={form.phoneNumber}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    aria-required="true"
                    aria-invalid={touched.phoneNumber && !!errors.phoneNumber}
                    aria-describedby={errors.phoneNumber ? 'phone-error' : undefined}
                    disabled={isLoading}
                    autoComplete="tel"
                    maxLength={10}
                    inputMode="numeric"
                  />
                  <span className="input-icon" aria-hidden="true">📱</span>
                </div>
                {touched.phoneNumber && errors.phoneNumber && (
                  <p id="phone-error" className="field-error" role="alert">
                    ⚠ {errors.phoneNumber}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <button
                id="form-submit-btn"
                type="submit"
                className="btn btn-primary submit-btn"
                disabled={isLoading || submitStatus === 'success'}
                aria-busy={isLoading}
                aria-label={
                  isLoading
                    ? 'Submitting registration...'
                    : 'Submit registration'
                }
              >
                {isLoading ? (
                  <>
                    <span className="btn-spinner" aria-hidden="true"></span>
                    Submitting...
                  </>
                ) : submitStatus === 'success' ? (
                  '✅ Registration Received!'
                ) : (
                  '🚀 Enroll Me Now'
                )}
              </button>

              {/* Disclaimer */}
              <p
                style={{
                  textAlign: 'center',
                  fontSize: '0.78rem',
                  color: 'var(--color-text-muted)',
                  marginTop: '16px',
                  lineHeight: '1.5',
                }}
              >
                🔒 Your information is secure and will never be shared with third parties.
                By enrolling you agree to our terms of service.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RegistrationForm;
