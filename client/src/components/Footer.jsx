/**
 * components/Footer.jsx
 * Simple, elegant footer with branding and links
 */

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="footer" role="contentinfo">
      <div className="container">
        <div className="footer-logo">
          <span aria-hidden="true">🤖</span> RoboLearn
        </div>
        <p className="footer-copy">
          © {year} RoboLearn AI & Robotics Workshop. All rights reserved.
        </p>
        <nav className="footer-links" aria-label="Footer navigation">
          <a href="#hero">Home</a>
          <a href="#details">Details</a>
          <a href="#outcomes">What You'll Learn</a>
          <a href="#faq">FAQ</a>
          <a href="#register">Register</a>
          <a href="mailto:support@robolearn.in">Contact Us</a>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
