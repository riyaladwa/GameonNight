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
      scrollToSection('surveys-access');
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
    <section id="hero" className="relative pt-28 pb-16 sm:pt-36 sm:pb-24 overflow-hidden">
      
      {/* Dynamic Animated Ambient Backdrops */}
      <motion.div 
        animate={prefersReducedMotion ? {} : {
          scale: [1, 1.1, 1],
          opacity: [0.12, 0.18, 0.12],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] sm:w-[700px] h-[350px] sm:h-[450px] bg-gradient-to-tr from-violet-600/20 via-indigo-600/15 to-cyan-500/15 blur-[120px] rounded-full pointer-events-none -z-10" 
      />
      
      <div className="absolute top-16 right-10 w-48 h-48 bg-orange-500/5 blur-[80px] rounded-full pointer-events-none -z-10" />
      <div className="absolute inset-0 subtle-grid pointer-events-none opacity-30 -z-10" />

      {/* Floating Ambient Gaming Particles */}
      {!prefersReducedMotion && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1.5 h-1.5 rounded-full bg-cyan-400/30"
              style={{
                top: `${20 + i * 14}%`,
                left: `${15 + (i * 17) % 70}%`,
              }}
              animate={{
                y: [0, -25, 0],
                opacity: [0.2, 0.7, 0.2],
                scale: [0.8, 1.2, 0.8],
              }}
              transition={{
                duration: 4 + i * 1.5,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: i * 0.7,
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
          <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-3 py-1 rounded-full premium-pill text-xs font-mono uppercase tracking-wider mb-6 text-slate-300">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-violet-300 font-semibold">{config.EVENT_NAME || "GOOGLE PLAY ARENA"}</span>
            <span className="text-slate-600">•</span>
            <span className="text-cyan-400">{config.EVENT_CATEGORY || "AI-POWERED GAME IDEATHON"}</span>
          </motion.div>

          {/* Title */}
          <motion.h1 
            variants={itemVariants} 
            className="font-display font-black text-4xl sm:text-6xl md:text-7xl tracking-tight leading-[1.08] text-white uppercase"
          >
            GAME ON <span className="bg-gradient-to-r from-violet-400 via-indigo-300 to-cyan-400 bg-clip-text text-transparent">NIGHT</span>
          </motion.h1>

          {/* Tagline */}
          <motion.p 
            variants={itemVariants} 
            className="mt-4 font-display font-bold text-base sm:text-xl uppercase tracking-wider text-slate-200"
          >
            {config.TAGLINE || "Imagine It. Design It. Pitch It."}
          </motion.p>

          {/* Hero Supporting Text */}
          <motion.p 
            variants={itemVariants} 
            className="mt-4 text-sm sm:text-base md:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed font-sans"
          >
            Turn your imagination into a game concept. Design it with Gemini. Pitch it in 60 seconds.
          </motion.p>

          {/* Confirmed Schedule Pill (shown only if provided) */}
          {hasDateOrTime && (
            <motion.div 
              variants={itemVariants}
              className="mt-6 inline-flex flex-wrap items-center justify-center gap-4 px-4 py-2 rounded-xl subtle-glass text-xs text-slate-300 font-mono"
            >
              {config.EVENT_DATE && (
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{config.EVENT_DATE}</span>
                </div>
              )}
              {config.EVENT_TIME && (
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-orange-400" />
                  <span>{config.EVENT_TIME}</span>
                </div>
              )}
              <div className="flex items-center gap-1.5 text-violet-300">
                <MapPin className="w-3.5 h-3.5" />
                <span>{config.EVENT_MODE}</span>
              </div>
            </motion.div>
          )}

          {/* 4 PROMINENT HIGHLIGHTS WITH FRAMER MOTION HOVER & STAGGER */}
          <motion.div 
            variants={itemVariants}
            className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto"
          >
            {/* 1. Free Entry */}
            <motion.div 
              whileHover={prefersReducedMotion ? {} : { y: -4, transition: { duration: 0.2 } }}
              className="subtle-glass p-4 rounded-xl flex flex-col items-center text-center transition-shadow hover:shadow-lg hover:shadow-cyan-500/10 hover:border-cyan-500/30"
            >
              <div className="w-9 h-9 rounded-lg bg-violet-950/60 border border-violet-800/40 flex items-center justify-center text-cyan-400 mb-2.5">
                <Zap className="w-4 h-4 text-cyan-400" />
              </div>
              <span className="font-display font-extrabold text-xs sm:text-sm text-white">
                FREE ENTRY
              </span>
              <span className="text-[11px] text-slate-400 mt-0.5">Open to all students</span>
            </motion.div>

            {/* 2. Pixel Phone National Winner */}
            <motion.div 
              whileHover={prefersReducedMotion ? {} : { y: -4, transition: { duration: 0.2 } }}
              className="subtle-glass p-4 rounded-xl flex flex-col items-center text-center border-orange-500/30 bg-gradient-to-b from-orange-950/15 to-transparent hover:border-orange-500/50 hover:shadow-lg hover:shadow-orange-500/10"
            >
              <div className="w-9 h-9 rounded-lg bg-orange-950/40 border border-orange-500/30 flex items-center justify-center text-orange-400 mb-2.5">
                <Smartphone className="w-4 h-4 text-orange-400" />
              </div>
              <span className="font-display font-extrabold text-xs sm:text-sm text-white leading-tight">
                GOOGLE PIXEL PHONE
              </span>
              <span className="text-[11px] text-orange-300/90 mt-0.5">For National Winner*</span>
            </motion.div>

            {/* 3. Winner Certificate */}
            <motion.div 
              whileHover={prefersReducedMotion ? {} : { y: -4, transition: { duration: 0.2 } }}
              className="subtle-glass p-4 rounded-xl flex flex-col items-center text-center hover:border-violet-600/40 hover:shadow-lg hover:shadow-violet-500/10"
            >
              <div className="w-9 h-9 rounded-lg bg-violet-950/60 border border-violet-800/40 flex items-center justify-center text-violet-300 mb-2.5">
                <Award className="w-4 h-4 text-violet-300" />
              </div>
              <span className="font-display font-extrabold text-xs sm:text-sm text-white">
                WINNER CERTIFICATE
              </span>
              <span className="text-[11px] text-slate-400 mt-0.5">Top-evaluated pitches</span>
            </motion.div>

            {/* 4. Participation Certificate */}
            <motion.div 
              whileHover={prefersReducedMotion ? {} : { y: -4, transition: { duration: 0.2 } }}
              className="subtle-glass p-4 rounded-xl flex flex-col items-center text-center hover:border-indigo-600/40 hover:shadow-lg hover:shadow-indigo-500/10"
            >
              <div className="w-9 h-9 rounded-lg bg-violet-950/60 border border-violet-800/40 flex items-center justify-center text-indigo-300 mb-2.5">
                <ScrollText className="w-4 h-4 text-indigo-300" />
              </div>
              <span className="font-display font-extrabold text-xs sm:text-sm text-white">
                PARTICIPATION CERTIFICATE
              </span>
              <span className="text-[11px] text-slate-400 mt-0.5">All verified pitches</span>
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
              onClick={() => scrollToSection('about')}
              className="w-full sm:w-auto px-6 py-3 rounded-xl font-display font-bold text-xs uppercase tracking-wider btn-primary text-white flex items-center justify-center gap-2 group"
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
                  ? 'btn-cyan text-slate-950 font-extrabold'
                  : 'btn-secondary text-cyan-400'
              }`}
            >
              <Video className="w-4 h-4" />
              <span>Join The Arena</span>
            </motion.button>
          </motion.div>

          <motion.p variants={itemVariants} className="mt-4 text-[11px] font-mono text-slate-400">
            * An Ideathon, NOT a hackathon — Zero coding required. Pixel reward subject to national GSA criteria.
          </motion.p>
        </motion.div>

      </div>

    </section>
  );
}
