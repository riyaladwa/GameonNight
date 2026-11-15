import React, { useState } from 'react';
import { motion, useReducedMotion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Video, ClipboardList, CheckCircle2, Clock, Lock, Award, Info, Sparkles } from 'lucide-react';
import { useEvent } from '../context/EventContext';
import { isUrlConfigured } from '../config/eventConfig';
import CertificateGenerator from './CertificateGenerator';

export default function SurveysAndAccessSection() {
  const { config } = useEvent();
  const prefersReducedMotion = useReducedMotion();
  const [showLockedMessage, setShowLockedMessage] = useState(false);
  const [hasCompletedFeedback, setHasCompletedFeedback] = useState(false);

  const isPreConfigured = isUrlConfigured(config.PRE_SURVEY_URL);
  const isPostConfigured = isUrlConfigured(config.POST_SURVEY_URL);
  const isMeetConfigured = isUrlConfigured(config.GOOGLE_MEET_URL);
  
  // Post-Survey is only enabled if explicitly unlocked by the organizer after Google Meet session
  const isPostUnlocked = Boolean(config.POST_SURVEY_UNLOCKED);

  return (
    <section id="surveys-access" className="py-16 sm:py-20 relative bg-brand-bg">
      
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto mb-10"
        >
          <span className="text-[11px] font-mono uppercase tracking-widest text-brand-lavender font-semibold block mb-1">
            SECTION 5
          </span>
          <h2 className="font-display font-black text-2xl sm:text-4xl text-brand-text uppercase tracking-tight">
            SURVEYS & EVENT ACCESS
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-brand-muted">
            Access the official Google Forms, live Google Meet room, and generate your certificate.
          </p>
        </motion.div>

        {/* Clear Explanation Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10 max-w-4xl mx-auto">
          
          {/* Card 1: Pre-Survey (ENABLED NOW) */}
          <motion.div 
            initial={{ opacity: 0, x: prefersReducedMotion ? 0 : -15 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="p-5 rounded-2xl bg-brand-lavender-light/50 border border-brand-lavender/30 relative overflow-hidden"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-mono uppercase font-bold text-brand-lavender tracking-wider">
                BEFORE THE SESSION
              </span>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-brand-lavender text-white">
                <CheckCircle2 className="w-3 h-3" />
                <span>OPEN NOW</span>
              </span>
            </div>
            <h3 className="font-display font-bold text-base text-brand-text mb-2">
              Pre-Survey (Mandatory)
            </h3>
            <p className="text-xs text-brand-muted leading-relaxed">
              The <strong className="text-brand-text">Pre-Survey is active right now</strong>. You must complete it before entering the live Google Meet session to confirm your attendance and participation eligibility.
            </p>
          </motion.div>

          {/* Card 2: Post-Survey (LOCKED UNTIL AFTER MEET) */}
          <motion.div 
            initial={{ opacity: 0, x: prefersReducedMotion ? 0 : 15 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className={`p-5 rounded-2xl border relative overflow-hidden transition-all ${
              isPostUnlocked 
                ? 'bg-brand-peach-light/60 border-brand-peach/80' 
                : 'bg-brand-alt/80 border-brand-border'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-mono uppercase font-bold text-[#A6634E] tracking-wider">
                AFTER THE SESSION
              </span>
              <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                isPostUnlocked 
                  ? 'bg-brand-sage text-white' 
                  : 'bg-brand-border text-brand-muted'
              }`}>
                {isPostUnlocked ? (
                  <>
                    <CheckCircle2 className="w-3 h-3" />
                    <span>SESSION COMPLETE • UNLOCKED</span>
                  </>
                ) : (
                  <>
                    <Lock className="w-3 h-3" />
                    <span>LOCKED UNTIL MEET CONCLUDES</span>
                  </>
                )}
              </span>
            </div>
            <h3 className="font-display font-bold text-base text-brand-text mb-2">
              Post-Survey & Feedback
            </h3>
            <p className="text-xs text-brand-muted leading-relaxed">
              The <strong className="text-brand-text">Post-Survey unlocks after the Google Meet session ends</strong>. 
              Participants submit their game details and Google Docs link here to unlock their official Certificate.
            </p>
          </motion.div>

        </div>

        {/* Locked Notification Alert */}
        <AnimatePresence>
          {showLockedMessage && !isPostUnlocked && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-6 p-4 rounded-xl bg-brand-peach-light border border-brand-peach max-w-4xl mx-auto flex items-start gap-3 shadow-soft-xs"
            >
              <Info className="w-5 h-5 text-[#A6634E] shrink-0 mt-0.5" />
              <div className="flex-1 text-xs text-brand-text leading-relaxed">
                <p className="font-bold text-[#8C5542] mb-0.5">Post-Survey is currently locked</p>
                <p className="text-brand-muted">
                  The Post-Survey & Feedback form will be unlocked immediately after the live Google Meet session finishes. 
                  Please complete the <strong className="text-brand-lavender font-semibold">Pre-Survey</strong> first so your attendance is recorded!
                </p>
              </div>
              <button 
                onClick={() => setShowLockedMessage(false)}
                className="text-xs text-brand-muted hover:text-brand-text font-mono font-bold"
              >
                ✕
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* THREE CLEAN BUTTONS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto mb-14">
          
          {/* Button 1: Complete Pre-Survey (ENABLED NOW) */}
          <div className="flex flex-col">
            {isPreConfigured ? (
              <motion.a
                whileHover={prefersReducedMotion ? {} : { scale: 1.02 }}
                whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
                href={config.PRE_SURVEY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 px-4 rounded-xl text-xs font-bold font-display uppercase tracking-wider btn-primary flex items-center justify-center gap-2 text-center shadow-soft-xs"
              >
                <ClipboardList className="w-4 h-4" />
                <span>Complete Pre-Survey</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-80" />
              </motion.a>
            ) : (
              <div className="w-full py-4 px-4 rounded-xl bg-brand-alt border border-brand-border text-xs font-mono text-brand-muted flex items-center justify-center gap-2 text-center">
                <Clock className="w-4 h-4 text-brand-lavender" />
                <span>Pre-Survey link announced soon</span>
              </div>
            )}
            <span className="text-[10px] font-mono text-brand-lavender text-center mt-1.5 font-semibold">
              ● Open Now • Fill before Google Meet
            </span>
          </div>

          {/* Button 2: Complete Post-Survey (LOCKED UNTIL MEET CONCLUDES) */}
          <div className="flex flex-col">
            {isPostUnlocked && isPostConfigured ? (
              <motion.a
                whileHover={prefersReducedMotion ? {} : { scale: 1.02 }}
                whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
                href={config.POST_SURVEY_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setHasCompletedFeedback(true)}
                className="w-full py-4 px-4 rounded-xl text-xs font-bold font-display uppercase tracking-wider btn-peach flex items-center justify-center gap-2 text-center font-extrabold shadow-soft-xs"
              >
                <CheckCircle2 className="w-4 h-4 text-[#8C5542]" />
                <span>Complete Post-Survey</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-80" />
              </motion.a>
            ) : (
              <button
                type="button"
                onClick={() => setShowLockedMessage(true)}
                className="w-full py-4 px-4 rounded-xl bg-brand-alt border border-brand-border/80 text-xs font-mono text-brand-muted flex items-center justify-center gap-2 text-center cursor-not-allowed hover:border-brand-peach/60 transition-colors"
                title="Unlocks once Google Meet session is complete"
              >
                <Lock className="w-4 h-4 text-brand-muted" />
                <span>Post-Survey (Locked)</span>
              </button>
            )}
            <span className="text-[10px] font-mono text-brand-muted text-center mt-1.5">
              {isPostUnlocked ? 'Submit Google Doc & Feedback' : 'Unlocks after Google Meet session'}
            </span>
          </div>

          {/* Button 3: Join Google Meet */}
          <div className="flex flex-col">
            {isMeetConfigured ? (
              <motion.a
                whileHover={prefersReducedMotion ? {} : { scale: 1.02 }}
                whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
                href={config.GOOGLE_MEET_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 px-4 rounded-xl text-xs font-bold font-display uppercase tracking-wider btn-sage flex items-center justify-center gap-2 text-center font-bold"
              >
                <Video className="w-4 h-4" />
                <span>Join Google Meet</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-80" />
              </motion.a>
            ) : (
              <div className="w-full py-4 px-4 rounded-xl bg-brand-alt border border-brand-border text-xs font-mono text-brand-muted flex items-center justify-center gap-2 text-center">
                <Clock className="w-4 h-4 text-brand-sage" />
                <span>Meet link announced soon</span>
              </div>
            )}
            <span className="text-[10px] font-mono text-brand-muted text-center mt-1.5">
              Live Game On Night Room
            </span>
          </div>

        </div>

        {/* CERTIFICATE GENERATOR MODULE */}
        <CertificateGenerator 
          isPostUnlocked={isPostUnlocked}
          hasCompletedFeedback={hasCompletedFeedback}
          setHasCompletedFeedback={setHasCompletedFeedback}
        />

      </div>

    </section>
  );
}
