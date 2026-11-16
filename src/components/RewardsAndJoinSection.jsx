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
  Sparkles,
  AlertTriangle
} from 'lucide-react';
import { useEvent } from '../context/EventContext';
import { isUrlConfigured } from '../config/eventConfig';
import CertificateGenerator from './CertificateGenerator';

export default function RewardsAndJoinSection() {
  const { config } = useEvent();
  const prefersReducedMotion = useReducedMotion();
  const [feedbackLockAlert, setFeedbackLockAlert] = useState(false);

  // Form progression state persisted in localStorage
  const [hasFilledPreSurvey, setHasFilledPreSurveyState] = useState(() => {
    try {
      return localStorage.getItem('gsa_presurvey_done') === 'true';
    } catch (e) {
      return false;
    }
  });

  const [hasFilledFeedback, setHasFilledFeedbackState] = useState(() => {
    try {
      return localStorage.getItem('gsa_feedback_done') === 'true';
    } catch (e) {
      return false;
    }
  });

  const setHasFilledPreSurvey = (val) => {
    setHasFilledPreSurveyState(val);
    try {
      localStorage.setItem('gsa_presurvey_done', String(val));
    } catch (e) {}
  };

  const setHasFilledFeedback = (val) => {
    setHasFilledFeedbackState(val);
    try {
      localStorage.setItem('gsa_feedback_done', String(val));
    } catch (e) {}
  };

  const isPreConfigured = isUrlConfigured(config.PRE_SURVEY_URL);
  const isPostConfigured = isUrlConfigured(config.POST_SURVEY_URL);
  const isMeetConfigured = isUrlConfigured(config.GOOGLE_MEET_URL);

  const handlePreSurveyClick = () => {
    // Open Pre-Survey form and mark step 1 completed
    setHasFilledPreSurvey(true);
    setFeedbackLockAlert(false);
  };

  const handleFeedbackClick = (e) => {
    if (!hasFilledPreSurvey) {
      e.preventDefault();
      setFeedbackLockAlert(true);
      return;
    }
    // Mark step 2 completed
    setHasFilledFeedback(true);
  };

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
            Review prize opportunities, complete the mandatory event forms in sequence, and join the live Google Meet room.
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
                Official Participation Certificate
              </h3>
              <p className="text-xs text-brand-muted leading-relaxed">
                Official digital credentials issued under the Google Student Ambassador Program 2026. Unlocked once you fill both the Pre-Survey and Feedback forms.
              </p>
            </div>
            <span className="text-[10px] font-mono text-brand-lavender mt-4 block font-medium">
              * Stamped with your name and today's date upon completion.
            </span>
          </div>

        </div>

        {/* Sequential Step Guide Banner */}
        <div className="mb-6 p-4 rounded-2xl bg-white border border-brand-border shadow-soft-xs">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
            <span className="font-mono font-bold text-brand-text uppercase tracking-wider text-[11px] flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-brand-lavender" />
              <span>Step-by-Step Participation Flow:</span>
            </span>
            <div className="flex flex-wrap items-center gap-2 font-mono text-[11px]">
              <span className={`px-2.5 py-1 rounded-lg border ${
                hasFilledPreSurvey 
                  ? 'bg-brand-sage-light text-[#4E6B4A] border-brand-sage' 
                  : 'bg-brand-lavender-light text-brand-lavender border-brand-lavender/40 font-bold'
              }`}>
                1. Pre-Survey {hasFilledPreSurvey ? '✓' : '(Open)'}
              </span>
              <span className="text-brand-border">→</span>
              <span className={`px-2.5 py-1 rounded-lg border ${
                hasFilledFeedback 
                  ? 'bg-brand-sage-light text-[#4E6B4A] border-brand-sage font-bold' 
                  : hasFilledPreSurvey 
                    ? 'bg-brand-peach-light text-[#8C5542] border-brand-peach font-bold' 
                    : 'bg-brand-alt text-brand-muted border-brand-border'
              }`}>
                2. Feedback Form {hasFilledFeedback ? '✓' : hasFilledPreSurvey ? '(Unlocked)' : '(Locked)'}
              </span>
              <span className="text-brand-border">→</span>
              <span className={`px-2.5 py-1 rounded-lg border ${
                hasFilledPreSurvey && hasFilledFeedback 
                  ? 'bg-brand-sage-light text-[#4E6B4A] border-brand-sage font-bold' 
                  : 'bg-brand-alt text-brand-muted border-brand-border'
              }`}>
                3. Certificate {hasFilledPreSurvey && hasFilledFeedback ? '✓ Unlocked' : '🔒 Locked'}
              </span>
            </div>
          </div>
        </div>

        {/* Locked Feedback Alert Banner */}
        <AnimatePresence>
          {feedbackLockAlert && !hasFilledPreSurvey && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-6 p-4 rounded-xl bg-brand-peach-light border border-brand-peach flex items-start gap-3 shadow-soft-xs"
            >
              <AlertTriangle className="w-5 h-5 text-[#A6634E] shrink-0 mt-0.5" />
              <div className="flex-1 text-xs text-brand-text leading-relaxed">
                <p className="font-bold text-[#8C5542] mb-0.5">Pre-Survey Required First</p>
                <p className="text-brand-muted">
                  The Feedback Form is only accessible after participants complete the <strong className="text-brand-lavender font-semibold">Pre-Survey Form</strong>. Please complete Step 1 first to record your attendance.
                </p>
              </div>
              <button 
                onClick={() => setFeedbackLockAlert(false)}
                className="text-xs text-brand-muted hover:text-brand-text font-mono font-bold px-2 py-1"
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
                onClick={handlePreSurveyClick}
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
            
            <div className="flex items-center justify-between mt-1.5 px-1">
              <span className="text-[10px] font-mono text-brand-lavender font-semibold">
                ● Step 1 • Open Now
              </span>
              <button
                type="button"
                onClick={() => setHasFilledPreSurvey(!hasFilledPreSurvey)}
                className={`text-[10px] font-mono transition-colors ${
                  hasFilledPreSurvey ? 'text-[#4E6B4A] font-bold' : 'text-brand-muted hover:text-brand-text'
                }`}
              >
                {hasFilledPreSurvey ? '✓ Filled' : 'Mark as filled'}
              </button>
            </div>
          </div>

          {/* Button 2: Complete Feedback Form (GATED: ONLY AVAILABLE WHEN PRE-SURVEY IS FILLED) */}
          <div className="flex flex-col">
            {hasFilledPreSurvey && isPostConfigured ? (
              <motion.a
                whileHover={prefersReducedMotion ? {} : { scale: 1.02 }}
                whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
                href={config.POST_SURVEY_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleFeedbackClick}
                className="w-full py-4 px-4 rounded-xl text-xs font-bold font-display uppercase tracking-wider btn-peach flex items-center justify-center gap-2 text-center font-extrabold shadow-soft-xs"
              >
                <CheckCircle2 className="w-4 h-4 text-[#8C5542]" />
                <span>Complete Feedback Form</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-80" />
              </motion.a>
            ) : (
              <button
                type="button"
                onClick={handleFeedbackClick}
                className="w-full py-4 px-4 rounded-xl bg-brand-alt border border-brand-border/80 text-xs font-mono text-brand-muted flex items-center justify-center gap-2 text-center cursor-pointer hover:border-brand-peach/60 transition-colors group"
                title="Available to click only when participants fill out the Pre-Survey form"
              >
                <Lock className="w-4 h-4 text-brand-muted group-hover:text-[#8C5542] transition-colors" />
                <span>Feedback Form (Fill Pre-Survey First)</span>
              </button>
            )}

            <div className="flex items-center justify-between mt-1.5 px-1">
              <span className="text-[10px] font-mono text-brand-muted">
                {hasFilledPreSurvey ? '● Step 2 • Unlocked' : '🔒 Unlocks after Pre-Survey'}
              </span>
              {hasFilledPreSurvey && (
                <button
                  type="button"
                  onClick={() => setHasFilledFeedback(!hasFilledFeedback)}
                  className={`text-[10px] font-mono transition-colors ${
                    hasFilledFeedback ? 'text-[#4E6B4A] font-bold' : 'text-brand-muted hover:text-brand-text'
                  }`}
                >
                  {hasFilledFeedback ? '✓ Submitted' : 'Mark as submitted'}
                </button>
              )}
            </div>
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
            <div className="flex items-center justify-between mt-1.5 px-1">
              <span className="text-[10px] font-mono text-brand-muted">
                Live Game On Night Room
              </span>
              <span className="text-[10px] font-mono text-brand-sage font-semibold">
                meet.google.com
              </span>
            </div>
          </div>

        </div>

        {/* Certificate Generator Module (GATED: ONLY AVAILABLE AFTER BOTH FORMS ARE FILLED) */}
        <CertificateGenerator 
          hasFilledPreSurvey={hasFilledPreSurvey}
          setHasFilledPreSurvey={setHasFilledPreSurvey}
          hasFilledFeedback={hasFilledFeedback}
          setHasFilledFeedback={setHasFilledFeedback}
        />

      </div>

    </section>
  );
}
