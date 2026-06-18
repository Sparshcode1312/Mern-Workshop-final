/**
 * components/Hero.jsx
 * Landing page hero section with animated background,
 * workshop title, tagline, stats, and CTA buttons
 */

const Hero = () => {
  const scrollToRegister = () => {
    document.getElementById('register')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToDetails = () => {
    document.getElementById('details')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="hero" aria-labelledby="hero-title">
      <div className="container">
        <div className="hero-grid">

          {/* ── Left: Content ── */}
          <div className="hero-content">
            {/* Live badge */}
            <div className="hero-badge" role="status">
              <span className="pulse-dot" aria-hidden="true"></span>
              Enrollments Open — Batch Starting July 2026
            </div>

            {/* Main heading */}
            <h1 id="hero-title" className="hero-title">
              AI &amp; Robotics{' '}
              <span className="gradient-text">Summer</span>{' '}
              Workshop
            </h1>

            {/* Tagline */}
            <p className="hero-subtitle">
              Ignite your child's passion for technology! A hands-on 4-week online
              workshop designed for curious minds aged 8–14 — where coding meets
              creativity and robots come to life.
            </p>

            {/* Action buttons */}
            <div className="hero-actions">
              <button
                id="hero-enroll-btn"
                className="btn btn-primary btn-lg"
                onClick={scrollToRegister}
                aria-label="Enroll now — scroll to registration"
              >
                🚀 Enroll Now
              </button>
              <button
                id="hero-learn-more-btn"
                className="btn btn-outline btn-lg"
                onClick={scrollToDetails}
                aria-label="Learn more about workshop details"
              >
                Learn More ↓
              </button>
            </div>

            {/* Quick stats */}
            <div className="hero-stats" role="list" aria-label="Workshop statistics">
              <div className="hero-stat-item" role="listitem">
                <span className="hero-stat-value">500+</span>
                <span className="hero-stat-label">Students Enrolled</span>
              </div>
              <div className="hero-stat-item" role="listitem">
                <span className="hero-stat-value">4.9★</span>
                <span className="hero-stat-label">Avg. Rating</span>
              </div>
              <div className="hero-stat-item" role="listitem">
                <span className="hero-stat-value">100%</span>
                <span className="hero-stat-label">Certified</span>
              </div>
            </div>
          </div>

          {/* ── Right: Visual Card ── */}
          <div className="hero-visual" aria-hidden="true">
            <div className="hero-card-wrapper">
              {/* Floating notification badges */}
              <div className="float-badge float-badge-1">
                🏆 Industry Certificate
              </div>
              <div className="float-badge float-badge-2">
                🟢 Live Sessions Daily
              </div>

              {/* Main card */}
              <div className="hero-illustration">
                <span className="robot-emoji-container" role="img" aria-label="Robot emoji">🤖</span>
                <p className="hero-card-title">Your AI Journey Starts Here</p>
                <div className="hero-mini-stats">
                  <div className="hero-mini-stat">
                    <span className="hero-mini-stat-value">8–14</span>
                    <span className="hero-mini-stat-label">Age Group</span>
                  </div>
                  <div className="hero-mini-stat">
                    <span className="hero-mini-stat-value">4 Wks</span>
                    <span className="hero-mini-stat-label">Duration</span>
                  </div>
                  <div className="hero-mini-stat">
                    <span className="hero-mini-stat-value">Online</span>
                    <span className="hero-mini-stat-label">Mode</span>
                  </div>
                  <div className="hero-mini-stat">
                    <span className="hero-mini-stat-value">₹2,999</span>
                    <span className="hero-mini-stat-label">Total Fee</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
