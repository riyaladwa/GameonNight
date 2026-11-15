import React, { useState } from 'react';
import { motion, useReducedMotion, AnimatePresence } from 'framer-motion';
import { 
  ExternalLink, 
  Video, 
  ClipboardList, 
  CheckCircle2, 
  Clock, 
  Lock, 
  Smartphone, 
  Award, 
  Info,
  Sparkles
} from 'lucide-react';
import { useEvent } from '../context/EventContext';
import { isUrlConfigured } from '../config/eventConfig';
import CertificateGenerator from './CertificateGenerator';

export default function RewardsAndJoinSection() {
  const { config } = useEvent();
  const prefersReducedMotion = useReducedMotion();
  const [showLockedMessage, setShowLockedMessage] = useState(false);
  const [hasCompletedFeedback, setHasCompletedFeedback] = useState(false);

  const isPreConfigured = isUrlConfigured(config.PRE_SURVEY_URL);
  const isPostConfigured = isUrlConfigured(config.POST_SURVEY_URL);
  const isMeetConfigured = isUrlConfigured(config.GOOGLE_MEET_URL);
  const isPostUnlocked = Boolean(config.POST_SURVEY_UNLOCKED);

  return (
    <section id="rewards-join" className="py-16 sm:py-20 relative bg-brand-bg">
      
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto mb-12"
        >
          <span className="text-[11px] font-mono uppercase tracking-widest text-brand-lavender font-semibold block mb-1">
            SECTION 04 • REWARDS & ACCESS
          </span>
          <h2 className="font-display font-black text-2xl sm:text-4xl text-brand-text uppercase tracking-tight">
            REWARDS & EVENT ACCESS
          </h2>
          <p className="mt-3 text-sm sm:text-base text-brand-muted leading-relaxed font-sans">
            Review prize opportunities, complete the mandatory surveys, and join the live Google Meet room.
          </p>
        </motion.div>

        {/* 2 Prize & Recognition Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
          
          {/* Card 1: Pixel Phone */}
          <div className="p-6 rounded-2xl bg-gradient-to-b from-brand-peach-light to-white border border-brand-peach/80 shadow-soft-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-brand-peach border border-brand-peach/50 flex items-center justify-center text-[#8C5542]">
                  <Smartphone className="w-5 h-5 text-[#8C5542]" />
                </div>
                <span className="text-[10px] font-mono uppercase font-bold text-[#A6634E] px-2.5 py-0.5 rounded-full bg-white border border-brand-peach">
                  NATIONAL GRAND PRIZE
                </span>
              </div>
              <h3 className="font-display font-black text-lg text-brand-text mb-1.5">
                Google Pixel Phone
              </h3>
              <p className="text-xs text-brand-muted leading-relaxed">
                Top national finalists stand a chance for the National Winner to win a Google Pixel Phone, subject to national Google Student Ambassador evaluation.
              </p>
            </div>
            <span className="text-[10px] font-mono text-[#A6634E] mt-4 block font-medium">
              * Evaluated across originality, mission design, and pitch clarity.
            </span>
          </div>

          {/* Card 2: Certificates */}
          <div className="p-6 rounded-2xl bg-gradient-to-b from-brand-lavender-light/50 to-white border border-brand-lavender/30 shadow-soft-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-brand-lavender-light border border-brand-lavender/40 flex items-center justify-center text-brand-lavender">
                  <Award className="w-5 h-5 text-brand-lavender" />
                </div>
                <span className="text-[10px] font-mono uppercase font-bold text-brand-lavender px-2.5 py-0.5 rounded-full bg-white border border-brand-lavender/30">
                  OFFICIAL CREDENTIALS
                </span>
              </div>
              <h3 className="font-display font-black text-lg text-brand-text mb-1.5">
                Winner & Participation Certificates
              </h3>
              <p className="text-xs text-brand-muted leading-relaxed">
                Official digital certificates issued under the Google Student Ambassador Program 2026 for all verified pitches and attendees.
              </p>
            </div>
            <span className="text-[10px] font-mono text-brand-lavender mt-4 block font-medium">
              * Issued upon attendance verification and feedback submission.
            </span>
          </div>

        </div>

        {/* Locked Alert Notification */}
        <AnimatePresence>
          {showLockedMessage && !isPostUnlocked && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-6 p-4 rounded-xl bg-brand-peach-light border border-brand-peach flex items-start gap-3 shadow-soft-xs"
            >
              <Info className="w-5 h-5 text-[#A6634E] shrink-0 mt-0.5" />
              <div className="flex-1 text-xs text-brand-text leading-relaxed">
                <p className="font-bold text-[#8C5542] mb-0.5">Post-Survey is currently locked</p>
                <p className="text-brand-muted">
                  The Post-Survey will be unlocked immediately after the live Google Meet session finishes. 
                  Please ensure you complete the <strong className="text-brand-lavender font-semibold">Pre-Survey</strong> first so your attendance is recorded!
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

        {/* 3 Prominent Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          
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
                <span>Pre-Survey announced soon</span>
              </div>
            )}
            <span className="text-[10px] font-mono text-brand-lavender text-center mt-1.5 font-semibold">
              ● Open Now • Fill before Google Meet
            </span>
          </div>

          {/* Button 2: Complete Post-Survey (GATED UNTIL MEET ENDS) */}
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
                title="Unlocks once Google Meet session concludes"
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

        {/* Certificate Generator Module */}
        <CertificateGenerator 
          isPostUnlocked={isPostUnlocked}
          hasCompletedFeedback={hasCompletedFeedback}
          setHasCompletedFeedback={setHasCompletedFeedback}
        />

      </div>

    </section>
  );
}