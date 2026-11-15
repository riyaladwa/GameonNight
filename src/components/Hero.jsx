import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { 
  ArrowRight, 
  Video, 
  Sparkles, 
  Award, 
  ScrollText, 
  Smartphone, 
  Zap,
  Calendar,
  Clock,
  MapPin
} from 'lucide-react';
import { useEvent } from '../context/EventContext';
import { isUrlConfigured } from '../config/eventConfig';
import { scrollToSection } from '../utils/helpers';

export default function Hero() {
  const { config } = useEvent();
  const prefersReducedMotion = useReducedMotion();

  const isMeetConfigured = isUrlConfigured(config.GOOGLE_MEET_URL);
  const hasDateOrTime = Boolean(
    (config.EVENT_DATE && config.EVENT_DATE.trim().length > 0) ||
    (config.EVENT_TIME && config.EVENT_TIME.trim().length > 0)
  );

  const handleJoinClick = () => {
    if (isMeetConfigured) {
      window.open(config.GOOGLE_MEET_URL, '_blank', 'noopener,noreferrer');
    } else {
      scrollToSection('rewards-join');
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

  return (
    <section id="hero" className="relative pt-28 pb-16 sm:pt-36 sm:pb-24 overflow-hidden bg-brand-bg">
      
      {/* Soft Ambient Pastel Backgrounds */}
      <motion.div 
        animate={prefersReducedMotion ? {} : {
          scale: [1, 1.08, 1],
          opacity: [0.35, 0.5, 0.35],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] sm:w-[720px] h-[350px] sm:h-[450px] bg-gradient-to-tr from-brand-lavender/10 via-brand-peach/15 to-brand-sage/15 blur-[100px] rounded-full pointer-events-none -z-10" 
      />
      
      <div className="absolute top-16 right-10 w-56 h-56 bg-brand-peach/20 blur-[90px] rounded-full pointer-events-none -z-10" />
      <div className="absolute inset-0 subtle-grid pointer-events-none opacity-40 -z-10" />

      {/* Floating Ambient Pastel Particles */}
      {!prefersReducedMotion && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className={`absolute rounded-full ${i % 2 === 0 ? 'w-2 h-2 bg-brand-lavender/25' : 'w-2.5 h-2.5 bg-brand-sage/30'}`}
              style={{
                top: `${20 + i * 13}%`,
                left: `${12 + (i * 16) % 75}%`,
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0.3, 0.7, 0.3],
                scale: [0.9, 1.15, 0.9],
              }}
              transition={{
                duration: 4.5 + i * 1.5,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: i * 0.6,
              }}
            />
          ))}
        </div>
      )}

      <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
        
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Category Pill */}
          <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full pastel-pill text-xs font-mono uppercase tracking-wider mb-6 shadow-soft-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-lavender animate-pulse" />
            <span className="text-brand-lavender font-semibold">{config.EVENT_NAME || "GOOGLE PLAY ARENA"}</span>
            <span className="text-brand-border">•</span>
            <span className="text-brand-muted">{config.EVENT_CATEGORY || "AI-POWERED GAME IDEATHON"}</span>
          </motion.div>

          {/* Title */}
          <motion.h1 
            variants={itemVariants} 
            className="font-display font-black text-4xl sm:text-6xl md:text-7xl tracking-tight leading-[1.08] text-brand-text uppercase"
          >
            GAME ON <span className="bg-gradient-to-r from-brand-lavender via-[#9C8ABF] to-brand-sage bg-clip-text text-transparent">NIGHT</span>
          </motion.h1>

          {/* Tagline */}
          <motion.p 
            variants={itemVariants} 
            className="mt-4 font-display font-bold text-base sm:text-xl uppercase tracking-wider text-brand-lavender"
          >
            {config.TAGLINE || "Imagine It. Design It. Pitch It."}
          </motion.p>

          {/* Hero Supporting Text */}
          <motion.p 
            variants={itemVariants} 
            className="mt-4 text-sm sm:text-base md:text-lg text-brand-muted max-w-2xl mx-auto leading-relaxed font-sans"
          >
            Turn your imagination into a game concept. Design it with Gemini. Pitch it in 60 seconds.
          </motion.p>

          {/* Confirmed Schedule Pill (shown only if provided) */}
          {hasDateOrTime && (
            <motion.div 
              variants={itemVariants}
              className="mt-6 inline-flex flex-wrap items-center justify-center gap-4 px-4 py-2 rounded-xl bg-brand-alt border border-brand-border text-xs text-brand-muted font-mono shadow-soft-xs"
            >
              {config.EVENT_DATE && (
                <div className="flex items-center gap-1.5 text-brand-text">
                  <Calendar className="w-3.5 h-3.5 text-brand-lavender" />
                  <span>{config.EVENT_DATE}</span>
                </div>
              )}
              {config.EVENT_TIME && (
                <div className="flex items-center gap-1.5 text-brand-text">
                  <Clock className="w-3.5 h-3.5 text-[#C28267]" />
                  <span>{config.EVENT_TIME}</span>
                </div>
              )}
              <div className="flex items-center gap-1.5 text-brand-lavender">
                <MapPin className="w-3.5 h-3.5" />
                <span>{config.EVENT_MODE}</span>
              </div>
            </motion.div>
          )}

          {/* 4 PROMINENT HIGHLIGHTS WITH SOFT PASTEL CARDS */}
          <motion.div 
            variants={itemVariants}
            className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto"
          >
            {/* 1. Free Entry */}
            <motion.div 
              whileHover={prefersReducedMotion ? {} : { y: -4, transition: { duration: 0.2 } }}
              className="light-card p-4 rounded-xl flex flex-col items-center text-center transition-all hover:border-brand-sage hover:shadow-soft-md"
            >
              <div className="w-9 h-9 rounded-lg bg-brand-sage-light border border-brand-sage/30 flex items-center justify-center text-brand-sage mb-2.5">
                <Zap className="w-4 h-4 text-brand-sage" />
              </div>
              <span className="font-display font-extrabold text-xs sm:text-sm text-brand-text">
                FREE ENTRY
              </span>
              <span className="text-[11px] text-brand-muted mt-0.5">Open to all students</span>
            </motion.div>

            {/* 2. Pixel Phone National Winner */}
            <motion.div 
              whileHover={prefersReducedMotion ? {} : { y: -4, transition: { duration: 0.2 } }}
              className="p-4 rounded-xl flex flex-col items-center text-center border border-brand-peach/80 bg-gradient-to-b from-brand-peach-light to-white transition-all hover:border-brand-peach hover:shadow-soft-peach"
            >
              <div className="w-9 h-9 rounded-lg bg-brand-peach border border-brand-peach/40 flex items-center justify-center text-[#8C5542] mb-2.5">
                <Smartphone className="w-4 h-4 text-[#8C5542]" />
              </div>
              <span className="font-display font-extrabold text-xs sm:text-sm text-brand-text leading-tight">
                GOOGLE PIXEL PHONE
              </span>
              <span className="text-[11px] text-[#A6634E] font-medium mt-0.5">For National Winner*</span>
            </motion.div>

            {/* 3. Winner Certificate */}
            <motion.div 
              whileHover={prefersReducedMotion ? {} : { y: -4, transition: { duration: 0.2 } }}
              className="light-card p-4 rounded-xl flex flex-col items-center text-center transition-all hover:border-brand-lavender hover:shadow-soft-md"
            >
              <div className="w-9 h-9 rounded-lg bg-brand-lavender-light border border-brand-lavender/30 flex items-center justify-center text-brand-lavender mb-2.5">
                <Award className="w-4 h-4 text-brand-lavender" />
              </div>
              <span className="font-display font-extrabold text-xs sm:text-sm text-brand-text">
                WINNER CERTIFICATE
              </span>
              <span className="text-[11px] text-brand-muted mt-0.5">Top-evaluated pitches</span>
            </motion.div>

            {/* 4. Participation Certificate */}
            <motion.div 
              whileHover={prefersReducedMotion ? {} : { y: -4, transition: { duration: 0.2 } }}
              className="light-card p-4 rounded-xl flex flex-col items-center text-center transition-all hover:border-brand-sage hover:shadow-soft-md"
            >
              <div className="w-9 h-9 rounded-lg bg-brand-sage-light border border-brand-sage/30 flex items-center justify-center text-brand-sage mb-2.5">
                <ScrollText className="w-4 h-4 text-brand-sage" />
              </div>
              <span className="font-display font-extrabold text-xs sm:text-sm text-brand-text">
                PARTICIPATION CERTIFICATE
              </span>
              <span className="text-[11px] text-brand-muted mt-0.5">All verified pitches</span>
            </motion.div>
          </motion.div>

          {/* Hero CTAs */}
          <motion.div 
            variants={itemVariants}
            className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3"
          >
            <motion.button
              whileHover={prefersReducedMotion ? {} : { scale: 1.02 }}
              whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
              onClick={() => scrollToSection('creation-guide')}
              className="w-full sm:w-auto px-6 py-3 rounded-xl font-display font-bold text-xs uppercase tracking-wider btn-primary flex items-center justify-center gap-2 group"
            >
              <span>Explore The Challenge</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </motion.button>

            <motion.button
              whileHover={prefersReducedMotion ? {} : { scale: 1.02 }}
              whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
              onClick={handleJoinClick}
              className={`w-full sm:w-auto px-6 py-3 rounded-xl font-display font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 ${
                isMeetConfigured
                  ? 'btn-sage font-extrabold'
                  : 'btn-secondary text-brand-lavender'
              }`}
            >
              <Video className="w-4 h-4" />
              <span>Join The Arena</span>
            </motion.button>
          </motion.div>

          <motion.p variants={itemVariants} className="mt-4 text-[11px] font-mono text-brand-muted">
            * An Ideathon, NOT a hackathon — Zero coding required. Pixel reward subject to national GSA criteria.
          </motion.p>
        </motion.div>

      </div>

    </section>
  );
}
