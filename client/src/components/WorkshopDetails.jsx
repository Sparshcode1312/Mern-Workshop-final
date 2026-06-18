/**
 * components/WorkshopDetails.jsx
 * Displays key workshop details (age, duration, mode, fee, date)
 * in an animated icon-card grid layout
 */
import { useEffect, useRef } from 'react';

// Workshop info data
const DETAILS = [
  {
    icon: '👦',
    label: 'Age Group',
    value: '8–14 Years',
    highlight: false,
  },
  {
    icon: '📅',
    label: 'Duration',
    value: '4 Weeks',
    highlight: false,
  },
  {
    icon: '💻',
    label: 'Mode',
    value: 'Online',
    highlight: false,
  },
  {
    icon: '💰',
    label: 'Workshop Fee',
    value: '₹2,999',
    highlight: true,
  },
  {
    icon: '🚀',
    label: 'Start Date',
    value: '15 July 2026',
    highlight: false,
  },
];

const WorkshopDetails = () => {
  const sectionRef = useRef(null);

  // Intersection Observer for scroll reveal animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.15 }
    );

    const reveals = sectionRef.current?.querySelectorAll('.reveal');
    reveals?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="details"
      className="workshop-details"
      aria-labelledby="details-heading"
      ref={sectionRef}
    >
      <div className="container">
        {/* Section Header */}
        <div className="section-header reveal">
          <p className="section-tag">📋 Workshop Details</p>
          <h2 id="details-heading" className="section-title">
            Everything You Need to <span>Know</span>
          </h2>
          <p className="section-subtitle">
            A structured, professionally designed program built to make learning AI &amp;
            robotics fun, accessible, and rewarding for young innovators.
          </p>
        </div>

        {/* Details Cards Grid */}
        <div className="details-grid" role="list">
          {DETAILS.map((item, index) => (
            <article
              key={item.label}
              className={`detail-card reveal reveal-delay-${index + 1}`}
              role="listitem"
              aria-label={`${item.label}: ${item.value}`}
            >
              <span className="detail-icon" aria-hidden="true">{item.icon}</span>
              <p className="detail-label">{item.label}</p>
              <p className={`detail-value ${item.highlight ? 'highlight' : ''}`}>
                {item.value}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorkshopDetails;
