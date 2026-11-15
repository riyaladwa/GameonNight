import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Sparkles, FileText, Send, AlertCircle } from 'lucide-react';

export default function SubmissionSection() {
  const prefersReducedMotion = useReducedMotion();

  const steps = [
    {
      num: "01",
      title: "Generate Poster",
      desc: "Use Gemini and Nano Banana to create your game announcement poster with no violence or weapons.",
      icon: Sparkles,
      accent: "text-brand-lavender",
      bg: "bg-brand-lavender-light"
    },
    {
      num: "02",
      title: "Prepare Google Doc",
      desc: "Structure your concept covering all seven elements and embed your final generated poster image.",
      icon: FileText,
      accent: "text-brand-sage",
      bg: "bg-brand-sage-light"
    },
    {
      num: "03",
      title: "Submit in Post-Survey",
      desc: "Paste your public Google Docs link in the official post-event feedback form to verify participation.",
      icon: Send,
      accent: "text-[#C28267]",
      bg: "bg-brand-peach-light"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.45, ease: 'easeOut' }
    }
  };

  return (
    <section id="submission" className="py-16 sm:py-20 relative bg-brand-alt border-y border-brand-border">
      
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
            SECTION 4
          </span>
          <h2 className="font-display font-black text-2xl sm:text-4xl text-brand-text uppercase tracking-tight">
            SUBMISSION PROCESS
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-brand-muted">
            Submit your concept in three simple steps following the live session.
          </p>
        </motion.div>

        {/* 3 Simple Steps with Staggered Entrance */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6"
        >
          {steps.map((s) => {
            const Icon = s.icon;
            return (
              <motion.div 
                key={s.num}
                variants={itemVariants}
                whileHover={prefersReducedMotion ? {} : { y: -4, transition: { duration: 0.2 } }}
                className="light-card p-5 rounded-2xl flex flex-col justify-between hover:border-brand-lavender/50 transition-all hover:shadow-soft-md group"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-mono text-xs font-bold text-brand-muted">
                      STEP {s.num}
                    </span>
                    <div className={`w-8 h-8 rounded-lg ${s.bg} flex items-center justify-center`}>
                      <Icon className={`w-4 h-4 ${s.accent}`} />
                    </div>
                  </div>
                  <h3 className="font-display font-bold text-sm sm:text-base text-brand-text mb-1.5">
                    {s.title}
                  </h3>
                  <p className="text-xs text-brand-muted leading-relaxed">
                    {s.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Document Sharing Permission Reminder */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="p-4 rounded-xl bg-white border border-brand-peach/80 flex items-start gap-3 text-xs text-brand-text max-w-3xl mx-auto shadow-soft-xs"
        >
          <AlertCircle className="w-4 h-4 text-[#C28267] shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold text-brand-text block">
              Sharing Permission Reminder:
            </span>
            <p className="text-brand-muted text-[11px] mt-0.5">
              Set your Google Docs link to <strong>"Anyone with the link – Viewer"</strong> and test it in an incognito window before submitting. 
              Submissions that cannot be viewed by judges cannot be verified for certificates.
            </p>
          </div>
        </motion.div>

      </div>

    </section>
  );
}
