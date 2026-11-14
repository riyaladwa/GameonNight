import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Menu, X, Sparkles, Video, ArrowRight, Shield } from 'lucide-react';
import { useEvent } from '../context/EventContext';
import { isUrlConfigured } from '../config/eventConfig';
import { scrollToSection } from '../utils/helpers';

export default function Navbar() {
  const { config, setIsAdminModalOpen, adminUser } = useEvent();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', id: 'about' },
    { name: 'Challenge', id: 'challenge' },
    { name: 'Submission', id: 'submission' },
    { name: 'Surveys & Access', id: 'surveys-access' },
  ];

  const handleNavClick = (id) => {
    scrollToSection(id);
    setIsMobileMenuOpen(false);
  };

  const isMeetConfigured = isUrlConfigured(config.GOOGLE_MEET_URL);

  return (
    <motion.header 
      initial={prefersReducedMotion ? {} : { y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled 
          ? 'bg-[#06030e]/90 backdrop-blur-md border-b border-violet-900/30 py-3 shadow-lg shadow-black/40' 
          : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between">
          
          {/* Brand */}
          <div className="flex items-center gap-2">
            <button 
              onClick={() => handleNavClick('hero')}
              className="flex items-center gap-2.5 text-left group focus:outline-none"
            >
              <motion.div 
                whileHover={prefersReducedMotion ? {} : { rotate: 8, scale: 1.05 }}
                className="w-8 h-8 rounded-lg bg-gradient-to-tr from-violet-600 to-cyan-500 p-[1px] flex items-center justify-center shadow-sm shadow-violet-500/20"
              >
                <div className="w-full h-full bg-[#0a0518] rounded-[7px] flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-cyan-400" />
                </div>
              </motion.div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-display font-bold tracking-wide text-sm sm:text-base text-white">
                    {config.EVENT_NAME || "GOOGLE PLAY ARENA"}
                  </span>
                </div>
                <p className="text-[10px] font-mono tracking-widest uppercase text-slate-400">
                  {config.EVENT_TITLE || "GAME ON NIGHT"}
                </p>
              </div>
            </button>

            {/* GSA Badge - Click to open Admin Panel */}
            <button
              onClick={() => setIsAdminModalOpen(true)}
              title="GSA Organizer Admin Portal"
              className="ml-1 px-1.5 py-0.5 rounded text-[10px] font-mono font-semibold uppercase bg-violet-950/80 hover:bg-violet-900 text-violet-300 border border-violet-800/40 hover:border-cyan-400/50 transition-all flex items-center gap-1"
            >
              <Shield className="w-2.5 h-2.5 text-cyan-400" />
              <span>GSA</span>
              {adminUser && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />}
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 sm:gap-2">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className="px-3 py-1.5 text-xs sm:text-sm font-medium text-slate-300 hover:text-white rounded-lg hover:bg-violet-950/40 transition-colors"
              >
                {link.name}
              </button>
            ))}
          </nav>

          {/* Action CTA & Mobile Toggle */}
          <div className="flex items-center gap-3">
            {isMeetConfigured ? (
              <motion.a
                whileHover={prefersReducedMotion ? {} : { scale: 1.02 }}
                whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
                href={config.GOOGLE_MEET_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold font-display uppercase tracking-wider btn-cyan text-slate-950"
              >
                <Video className="w-3.5 h-3.5" />
                <span>Join Meet</span>
              </motion.a>
            ) : (
              <motion.button
                whileHover={prefersReducedMotion ? {} : { scale: 1.02 }}
                whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
                onClick={() => handleNavClick('surveys-access')}
                className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold font-display uppercase tracking-wider btn-secondary text-cyan-400"
              >
                <span>Event Links</span>
              </motion.button>
            )}

            {/* Mobile Hamburger */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg subtle-glass text-slate-300 hover:text-white"
              aria-label="Toggle navigation"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5 text-cyan-400" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer with Framer Motion AnimatePresence */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="md:hidden bg-[#090518]/95 backdrop-blur-xl border-b border-violet-900/30 px-5 py-4 space-y-2 overflow-hidden"
          >
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className="flex items-center justify-between w-full px-3 py-2 text-sm font-medium text-slate-200 hover:text-cyan-400 rounded-lg hover:bg-violet-950/40 transition-colors"
              >
                <span>{link.name}</span>
                <ArrowRight className="w-3.5 h-3.5 text-violet-400" />
              </button>
            ))}
            <div className="pt-2 border-t border-violet-900/40 flex flex-col gap-2">
              <button
                onClick={() => handleNavClick('surveys-access')}
                className="w-full py-2.5 rounded-lg text-xs font-bold font-display uppercase tracking-wider btn-primary text-white flex items-center justify-center gap-2"
              >
                <span>View Surveys & Join Meet</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
