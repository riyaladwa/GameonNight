import React from 'react';
import { EventProvider } from './context/EventContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AboutSection from './components/AboutSection';
import ChallengeSection from './components/ChallengeSection';
import SubmissionSection from './components/SubmissionSection';
import SurveysAndAccessSection from './components/SurveysAndAccessSection';
import Footer from './components/Footer';
import AdminModal from './components/AdminModal';

export default function App() {
  return (
    <EventProvider>
      <div className="relative min-h-screen bg-brand-bg text-brand-text flex flex-col font-sans selection:bg-brand-peach selection:text-brand-text">
        
        {/* Sticky Header */}
        <Navbar />

        {/* Main Streamlined Landing Page */}
        <main className="flex-grow">
          {/* Section 1: Hero */}
          <Hero />

          {/* Section 2: About the Event (Alternate Background #F7F4FA) */}
          <AboutSection />

          {/* Section 3: The Creation Challenge (White Background #FFFFFF) */}
          <ChallengeSection />

          {/* Section 4: Submission (Alternate Background #F7F4FA) */}
          <SubmissionSection />

          {/* Section 5: Surveys & Event Access (White Background #FFFFFF) */}
          <SurveysAndAccessSection />
        </main>

        {/* Section 6: Minimal Footer (Alternate Background #F7F4FA) */}
        <Footer />

        {/* Private Administrator Control Panel */}
        <AdminModal />

      </div>
    </EventProvider>
  );
}
