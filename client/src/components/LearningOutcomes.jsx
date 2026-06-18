/**
 * components/LearningOutcomes.jsx
 * Displays 6 learning outcomes as animated icon cards
 * with scroll-reveal effects
 */
import { useEffect, useRef } from 'react';

// Learning outcomes data
const OUTCOMES = [
  {
    icon: '🧠',
    title: 'AI Fundamentals & Machine Learning',
    description:
      'Understand core AI concepts, how machines learn from data, and build simple ML models using beginner-friendly tools.',
  },
  {
    icon: '🤖',
    title: 'Hands-On Robotics Projects',
    description:
      'Design, program, and simulate real robots. From basic movements to sensor integration and autonomous navigation.',
  },
  {
    icon: '💻',
    title: 'Coding Skills in Python',
    description:
      'Learn Python — the language powering AI and robotics — through fun, project-based challenges crafted for young learners.',
  },
  {
    icon: '🏆',
    title: 'Industry-Recognized Certification',
    description:
      'Earn a certificate co-recognized by leading EdTech and industry partners, boosting your academic and professional profile.',
  },
  {
    icon: '🧩',
    title: 'Problem-Solving & Critical Thinking',
    description:
      'Tackle real-world problems using computational thinking, algorithm design, and creative engineering approaches.',
  },
  {
    icon: '🌍',
    title: 'Join a Community of Innovators',
    description:
      'Connect with 500+ young innovators, attend hackathons, and collaborate on exciting group projects post-workshop.',
  },
];

const LearningOutcomes = () => {
  const sectionRef = useRef(null);

  // Scroll reveal effect using IntersectionObserver
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    const reveals = sectionRef.current?.querySelectorAll('.reveal');
    reveals?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="outcomes"
      className="outcomes"
      aria-labelledby="outcomes-heading"
      ref={sectionRef}
    >
      <div className="container">
        {/* Section Header */}
        <div className="section-header reveal">
          <p className="section-tag">🎯 What You'll Learn</p>
          <h2 id="outcomes-heading" className="section-title">
            Learning <span>Outcomes</span>
          </h2>
          <p className="section-subtitle">
            Our expertly designed curriculum delivers measurable skills and real-world
            experience that goes beyond theory.
          </p>
        </div>

        {/* Outcomes Grid */}
        <div className="outcomes-grid" role="list">
          {OUTCOMES.map((outcome, index) => (
            <article
              key={outcome.title}
              className={`outcome-card reveal reveal-delay-${(index % 3) + 1}`}
              role="listitem"
            >
              <div
                className="outcome-icon-wrapper"
                aria-hidden="true"
                title={outcome.title}
              >
                {outcome.icon}
              </div>
              <div className="outcome-content">
                <h3>{outcome.title}</h3>
                <p>{outcome.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LearningOutcomes;
