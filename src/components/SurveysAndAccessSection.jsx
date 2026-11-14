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
    <section id="surveys-access" className="py-16 sm:py-20 relative border-t border-violet-950/40">
      
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto mb-10"
        >
          <span className="text-[11px] font-mono uppercase tracking-widest text-cyan-400 block mb-1">
            SECTION 5
          </span>
          <h2 className="font-display font-black text-2xl sm:text-4xl text-white uppercase tracking-tight">
            SURVEYS & EVENT ACCESS
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-slate-300">
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
            className="subtle-glass p-5 rounded-2xl border-cyan-500/20"
          >
            <span className="text-[10px] font-mono uppercase font-bold text-cyan-400 tracking-wider block mb-1">
              BEFORE THE SESSION
            </span>
            <h3 className="font-display font-bold text-base text-white mb-2">
              Pre-Survey (Mandatory)
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              The <strong>Pre-Survey must be completed before attending</strong> the Google Meet session. 
              It registers your attendance and confirms your participation eligibility.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: prefersReducedMotion ? 0 : 15 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="subtle-glass p-5 rounded-2xl border-orange-500/20"
          >
            <span className="text-[10px] font-mono uppercase font-bold text-orange-400 tracking-wider block mb-1">
              AFTER THE SESSION
            </span>
            <h3 className="font-display font-bold text-base text-white mb-2">
              Post-Survey & Feedback
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              The <strong>Post-Survey must be completed after the event</strong>. 
              Participants must submit their game details and public <strong>Google Docs link</strong> here for certificate verification.
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
                className="w-full py-4 px-4 rounded-xl text-xs font-bold font-display uppercase tracking-wider btn-primary text-white flex items-center justify-center gap-2 text-center shadow-lg shadow-violet-950/40"
              >
                <ClipboardList className="w-4 h-4" />
                <span>Complete Pre-Survey</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-80" />
              </motion.a>
            ) : (
              <div className="w-full py-4 px-4 rounded-xl subtle-glass text-xs font-mono text-slate-400 flex items-center justify-center gap-2 text-center border-violet-900/40">
                <Clock className="w-4 h-4 text-violet-400" />
                <span>Pre-Survey link announced soon</span>
              </div>
            )}
            <span className="text-[10px] font-mono text-slate-400 text-center mt-1.5">
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
                className="w-full py-4 px-4 rounded-xl text-xs font-bold font-display uppercase tracking-wider bg-gradient-to-r from-orange-500 to-amber-500 text-slate-950 flex items-center justify-center gap-2 text-center hover:opacity-95 transition-opacity shadow-lg shadow-orange-950/40 font-extrabold"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Complete Post-Survey</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-80" />
              </motion.a>
            ) : (
              <div className="w-full py-4 px-4 rounded-xl subtle-glass text-xs font-mono text-slate-400 flex items-center justify-center gap-2 text-center border-violet-900/40">
                <Clock className="w-4 h-4 text-violet-400" />
                <span>Post-Survey opens after session</span>
              </div>
            )}
            <span className="text-[10px] font-mono text-slate-400 text-center mt-1.5">
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
                className="w-full py-4 px-4 rounded-xl text-xs font-bold font-display uppercase tracking-wider btn-cyan text-slate-950 flex items-center justify-center gap-2 text-center shadow-lg shadow-cyan-950/40"
              >
                <Video className="w-4 h-4" />
                <span>Join Google Meet</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-80" />
              </motion.a>
            ) : (
              <div className="w-full py-4 px-4 rounded-xl subtle-glass text-xs font-mono text-slate-400 flex items-center justify-center gap-2 text-center border-violet-900/40">
                <Clock className="w-4 h-4 text-cyan-400" />
                <span>Meet link announced soon</span>
              </div>
            )}
            <span className="text-[10px] font-mono text-slate-400 text-center mt-1.5">
              Live Game On Night Room
            </span>
          </div>

        </div>

      </div>

    </section>
  );
}
