import React from 'react';
import { EventProvider } from './context/EventContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AboutSection from './components/AboutSection';
import HowToParticipateSection from './components/HowToParticipateSection';
import CreationGuideSection from './components/CreationGuideSection';
import RewardsAndJoinSection from './components/RewardsAndJoinSection';
import Footer from './components/Footer';
import AdminModal from './components/AdminModal';

export default function App() {
  return (
    <EventProvider>
      <div className="relative min-h-screen bg-brand-bg text-brand-text flex flex-col font-sans selection:bg-brand-peach selection:text-brand-text">
        
        {/* Sticky Header Navigation */}
        <Navbar />

        {/* 5 Core Event Sections */}
        <main className="flex-grow">
          {/* Section 1: Hero (#FFFFFF) */}
          <Hero />

          {/* Section 2: About (#F7F4FA) */}
          <AboutSection />

          {/* Section 3: How to Participate (#FFFFFF) */}
          <HowToParticipateSection />

          {/* Section 4: Game Creation Guide (#F7F4FA) */}
          <CreationGuideSection />

          {/* Section 5: Rewards & Join (#FFFFFF) */}
          <RewardsAndJoinSection />
        </main>

        {/* Section 6: Footer with Official Organizer Credentials */}
        <Footer />

        {/* Private Organizer Admin Control Panel */}
        <AdminModal />

      </div>
    </EventProvider>
  );
}