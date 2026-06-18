/**
 * components/FAQ.jsx
 * Accordion-style FAQ section with smooth expand/collapse animations
 * Uses local state to track which item is open (only one at a time)
 */
import { useState, useEffect, useRef } from 'react';

// FAQ data — questions & detailed answers
const FAQS = [
  {
    id: 'faq-1',
    question: 'What prior coding experience is required?',
    answer:
      'Absolutely none! This workshop is designed for complete beginners. We start from the very basics — no prior coding or robotics knowledge is needed. Our curriculum gradually introduces concepts so students build confidence step-by-step. All you need is curiosity and a computer with a stable internet connection.',
  },
  {
    id: 'faq-2',
    question: 'Will students receive a certificate upon completion?',
    answer:
      'Yes! Every student who successfully completes the 4-week program receives an industry-recognized digital certificate. The certificate is co-accredited by our EdTech partners and can be added to school portfolios, LinkedIn profiles, and college applications. It includes a unique verification QR code.',
  },
  {
    id: 'faq-3',
    question: 'What happens if I miss a live class?',
    answer:
      'No worries at all! All live sessions are recorded in high quality and made available within 2 hours of the class ending. Students can watch recordings at their own pace. Additionally, our instructors hold weekly office-hour sessions where students can ask questions and catch up on any missed content.',
  },
  {
    id: 'faq-4',
    question: 'What equipment or software does my child need?',
    answer:
      'Just a laptop or desktop computer (Windows, Mac, or Chromebook), a stable internet connection, and a webcam/microphone for live sessions. All software tools we use are free, browser-based, or easily installable. We send a complete setup guide 3 days before the workshop begins.',
  },
  {
    id: 'faq-5',
    question: 'Are there any EMI or payment plan options available?',
    answer:
      'Yes! We offer a 2-month EMI option at zero extra cost. You can also pay via UPI, credit/debit card, or net banking. For families enrolling multiple siblings, we offer a 15% sibling discount. Contact our support team for group enrollment pricing.',
  },
  {
    id: 'faq-6',
    question: 'How many students are in each batch?',
    answer:
      'We keep batches intentionally small — a maximum of 20 students per batch — to ensure every child gets personalized attention from our instructors. This also encourages collaborative learning and healthy peer interaction among students.',
  },
];

const FAQ = () => {
  const [openId, setOpenId] = useState(null);
  const sectionRef = useRef(null);

  // Toggle open/close; clicking the same item closes it
  const toggleFAQ = (id) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  // Scroll reveal effect
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

  return (
    <section
      id="faq"
      className="faq"
      aria-labelledby="faq-heading"
      ref={sectionRef}
    >
      <div className="container">
        {/* Section Header */}
        <div className="section-header reveal">
          <p className="section-tag">❓ Got Questions?</p>
          <h2 id="faq-heading" className="section-title">
            Frequently Asked <span>Questions</span>
          </h2>
          <p className="section-subtitle">
            Everything you need to know before enrolling. Can't find your answer?{' '}
            <a
              href="mailto:support@robolearn.in"
              style={{ color: 'var(--color-secondary)', textDecoration: 'none' }}
            >
              Contact us
            </a>
            .
          </p>
        </div>

        {/* Accordion list */}
        <div
          className="faq-list reveal reveal-delay-1"
          role="list"
          aria-label="Frequently asked questions"
        >
          {FAQS.map((faq, index) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className={`faq-item ${isOpen ? 'open' : ''}`}
                role="listitem"
              >
                {/* Question / Trigger */}
                <button
                  id={faq.id}
                  className="faq-question"
                  aria-expanded={isOpen}
                  aria-controls={`${faq.id}-answer`}
                  onClick={() => toggleFAQ(faq.id)}
                >
                  <span className="faq-question-text">
                    <span
                      style={{
                        color: 'var(--color-primary-light)',
                        marginRight: '10px',
                        fontFamily: 'var(--font-display)',
                      }}
                    >
                      Q{index + 1}.
                    </span>
                    {faq.question}
                  </span>
                  <span className="faq-chevron" aria-hidden="true">
                    ▼
                  </span>
                </button>

                {/* Answer / Collapse panel */}
                <div
                  id={`${faq.id}-answer`}
                  className="faq-answer"
                  role="region"
                  aria-labelledby={faq.id}
                >
                  <div className="faq-answer-inner">{faq.answer}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
