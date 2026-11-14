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
      <div className="relative min-h-screen bg-[#06030e] text-slate-100 flex flex-col font-sans selection:bg-cyan-400 selection:text-slate-950">
        
        {/* Sticky Header */}
        <Navbar />

        {/* Main Streamlined Landing Page */}
        <main className="flex-grow">
          {/* Section 1: Hero */}
          <Hero />

          {/* Section 2: About the Event */}
          <AboutSection />

          {/* Section 3: The Creation Challenge */}
          <ChallengeSection />

          {/* Section 4: Submission */}
          <SubmissionSection />

          {/* Section 5: Surveys & Event Access */}
          <SurveysAndAccessSection />
        </main>

        {/* Section 6: Minimal Footer */}
        <Footer />

        {/* Private Administrator Control Panel */}
        <AdminModal />

      </div>
    </EventProvider>
  );
}
