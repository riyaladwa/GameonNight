import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Menu, X, Sparkles, Video, ArrowRight, Shield } from 'lucide-react';
import { useEvent } from '../context/EventContext';
import { isUrlConfigured } from '../config/eventConfig';
import { scrollToSection } from '../utils/helpers';

export default function Navbar() {
  const { config } = useEvent();
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
    { name: 'How to Participate', id: 'how-to-participate' },
    { name: 'Creation Guide', id: 'creation-guide' },
    { name: 'Rewards & Join', id: 'rewards-join' },
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
          ? 'bg-white/90 backdrop-blur-md border-b border-brand-border py-3 shadow-soft-sm' 
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
                className="w-8 h-8 rounded-lg bg-gradient-to-tr from-brand-lavender to-brand-sage p-[1px] flex items-center justify-center shadow-soft-xs"
              >
                <div className="w-full h-full bg-white rounded-[7px] flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-brand-lavender" />
                </div>
              </motion.div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-display font-bold tracking-wide text-sm sm:text-base text-brand-text">
                    {config.EVENT_NAME || "GOOGLE PLAY ARENA"}
                  </span>
                </div>
                <p className="text-[10px] font-mono tracking-widest uppercase text-brand-muted">
                  {config.EVENT_TITLE || "GAME ON NIGHT"}
                </p>
              </div>
            </button>

            {/* GSA Ambassador Badge */}
            <span
              className="ml-1 px-1.5 py-0.5 rounded text-[10px] font-mono font-semibold uppercase bg-brand-lavender-light text-brand-lavender border border-brand-lavender/30 flex items-center gap-1"
            >
              <Shield className="w-2.5 h-2.5 text-brand-lavender" />
              <span>GSA</span>
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 sm:gap-2">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className="px-3 py-1.5 text-xs sm:text-sm font-medium text-brand-muted hover:text-brand-text rounded-lg hover:bg-brand-alt transition-colors"
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
                className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold font-display uppercase tracking-wider btn-primary"
              >
                <Video className="w-3.5 h-3.5" />
                <span>Join Meet</span>
              </motion.a>
            ) : (
              <motion.button
                whileHover={prefersReducedMotion ? {} : { scale: 1.02 }}
                whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
                onClick={() => handleNavClick('rewards-join')}
                className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold font-display uppercase tracking-wider btn-secondary"
              >
                <span>Event Links</span>
              </motion.button>
            )}

            {/* Mobile Hamburger */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg bg-white border border-brand-border text-brand-text hover:text-brand-lavender shadow-soft-xs"
              aria-label="Toggle navigation"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5 text-brand-lavender" /> : <Menu className="w-5 h-5" />}
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
            className="md:hidden bg-white/98 backdrop-blur-xl border-b border-brand-border px-5 py-4 space-y-2 overflow-hidden shadow-soft-md"
          >
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className="flex items-center justify-between w-full px-3 py-2 text-sm font-medium text-brand-text hover:text-brand-lavender rounded-lg hover:bg-brand-alt transition-colors"
              >
                <span>{link.name}</span>
                <ArrowRight className="w-3.5 h-3.5 text-brand-lavender" />
              </button>
            ))}
            <div className="pt-2 border-t border-brand-border flex flex-col gap-2">
              <button
                onClick={() => handleNavClick('rewards-join')}
                className="w-full py-2.5 rounded-lg text-xs font-bold font-display uppercase tracking-wider btn-primary flex items-center justify-center gap-2"
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
