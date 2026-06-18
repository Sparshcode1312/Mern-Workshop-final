/**
 * App.jsx — Root application component
 * Composes all sections of the AI & Robotics Summer Workshop landing page
 */
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import WorkshopDetails from './components/WorkshopDetails';
import LearningOutcomes from './components/LearningOutcomes';
import FAQ from './components/FAQ';
import RegistrationForm from './components/RegistrationForm';
import Footer from './components/Footer';

function App() {
  return (
    <>
      {/* Sticky Navigation */}
      <Navbar />

      {/* Main page content */}
      <main id="main-content">
        {/* 1. Hero — title, tagline, CTA */}
        <Hero />

        {/* 2. Workshop Details — age, duration, mode, fee, date */}
        <WorkshopDetails />

        {/* 3. Learning Outcomes — 6 skills/benefits cards */}
        <LearningOutcomes />

        {/* 4. FAQ — accordion with 6 questions */}
        <FAQ />

        {/* 5. Registration Form — name, email, phone + API submit */}
        <RegistrationForm />
      </main>

      {/* Footer */}
      <Footer />
    </>
  );
}

export default App;
