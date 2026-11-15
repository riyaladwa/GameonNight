import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ExternalLink, Video, ClipboardList, CheckCircle2, Clock } from 'lucide-react';
import { useEvent } from '../context/EventContext';
import { isUrlConfigured } from '../config/eventConfig';

export default function SurveysAndAccessSection() {
  const { config } = useEvent();
  const prefersReducedMotion = useReducedMotion();

  const isPreConfigured = isUrlConfigured(config.PRE_SURVEY_URL);
  const isPostConfigured = isUrlConfigured(config.POST_SURVEY_URL);
  const isMeetConfigured = isUrlConfigured(config.GOOGLE_MEET_URL);

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
            Access the official Google Forms and the live Google Meet room.
          </p>
        </motion.div>

        {/* Clear Explanation Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10 max-w-4xl mx-auto">
          
          <motion.div 
            initial={{ opacity: 0, x: prefersReducedMotion ? 0 : -15 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="p-5 rounded-2xl bg-brand-lavender-light/50 border border-brand-lavender/30"
          >
            <span className="text-[10px] font-mono uppercase font-bold text-brand-lavender tracking-wider block mb-1">
              BEFORE THE SESSION
            </span>
            <h3 className="font-display font-bold text-base text-brand-text mb-2">
              Pre-Survey (Mandatory)
            </h3>
            <p className="text-xs text-brand-muted leading-relaxed">
              The <strong className="text-brand-text">Pre-Survey must be completed before attending</strong> the Google Meet session. 
              It registers your attendance and confirms your participation eligibility.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: prefersReducedMotion ? 0 : 15 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="p-5 rounded-2xl bg-brand-peach-light/60 border border-brand-peach/80"
          >
            <span className="text-[10px] font-mono uppercase font-bold text-[#A6634E] tracking-wider block mb-1">
              AFTER THE SESSION
            </span>
            <h3 className="font-display font-bold text-base text-brand-text mb-2">
              Post-Survey & Feedback
            </h3>
            <p className="text-xs text-brand-muted leading-relaxed">
              The <strong className="text-brand-text">Post-Survey must be completed after the event</strong>. 
              Participants must submit their game details and public <strong className="text-brand-text">Google Docs link</strong> here for certificate verification.
            </p>
          </motion.div>

        </div>

        {/* THREE CLEAN, PROMINENT BUTTONS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
          
          {/* Button 1: Complete Pre-Survey */}
          <div className="flex flex-col">
            {isPreConfigured ? (
              <motion.a
                whileHover={prefersReducedMotion ? {} : { scale: 1.02 }}
                whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
                href={config.PRE_SURVEY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 px-4 rounded-xl text-xs font-bold font-display uppercase tracking-wider btn-primary flex items-center justify-center gap-2 text-center"
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
            <span className="text-[10px] font-mono text-brand-muted text-center mt-1.5">
              Complete before Google Meet
            </span>
          </div>

          {/* Button 2: Complete Post-Survey */}
          <div className="flex flex-col">
            {isPostConfigured ? (
              <motion.a
                whileHover={prefersReducedMotion ? {} : { scale: 1.02 }}
                whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
                href={config.POST_SURVEY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 px-4 rounded-xl text-xs font-bold font-display uppercase tracking-wider btn-peach flex items-center justify-center gap-2 text-center font-extrabold"
              >
                <CheckCircle2 className="w-4 h-4 text-[#8C5542]" />
                <span>Complete Post-Survey</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-80" />
              </motion.a>
            ) : (
              <div className="w-full py-4 px-4 rounded-xl bg-brand-alt border border-brand-border text-xs font-mono text-brand-muted flex items-center justify-center gap-2 text-center">
                <Clock className="w-4 h-4 text-brand-lavender" />
                <span>Post-Survey opens after session</span>
              </div>
            )}
            <span className="text-[10px] font-mono text-brand-muted text-center mt-1.5">
              Submit Google Docs link here
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

      </div>

    </section>
  );
}
