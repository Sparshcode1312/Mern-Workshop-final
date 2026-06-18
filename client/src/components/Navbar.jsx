/**
 * components/Navbar.jsx
 * Sticky top navigation bar with scroll-aware glass effect
 */
import { useState, useEffect } from 'react';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`} role="banner">
      <div className="container navbar-inner">
        {/* Brand Logo */}
        <a href="#hero" className="navbar-logo" aria-label="AI & Robotics Workshop Home">
          <span className="logo-icon" aria-hidden="true">🤖</span>
          <span>RoboLearn</span>
        </a>

        {/* CTA Button */}
        <button
          id="nav-enroll-btn"
          className="btn btn-primary navbar-cta"
          onClick={() => scrollToSection('register')}
          aria-label="Scroll to registration form"
        >
          Enroll Now →
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
