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
      accent: "text-cyan-400"
    },
    {
      num: "02",
      title: "Prepare Google Doc",
      desc: "Structure your concept covering all seven elements and embed your final generated poster image.",
      icon: FileText,
      accent: "text-violet-400"
    },
    {
      num: "03",
      title: "Submit in Post-Survey",
      desc: "Paste your public Google Docs link in the official post-event feedback form to verify participation.",
      icon: Send,
      accent: "text-orange-400"
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
    <section id="submission" className="py-16 sm:py-20 relative border-t border-violet-950/40">
      
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
            SECTION 4
          </span>
          <h2 className="font-display font-black text-2xl sm:text-4xl text-white uppercase tracking-tight">
            SUBMISSION PROCESS
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-slate-300">
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
                className="subtle-glass p-5 rounded-xl flex flex-col justify-between hover:border-violet-600/40 transition-shadow hover:shadow-lg hover:shadow-violet-500/10"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-mono text-xs font-bold text-slate-500">
                      STEP {s.num}
                    </span>
                    <Icon className={`w-5 h-5 ${s.accent}`} />
                  </div>
                  <h3 className="font-display font-bold text-sm sm:text-base text-white mb-1.5">
                    {s.title}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
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
          className="p-4 rounded-xl subtle-glass border border-orange-500/30 flex items-start gap-3 text-xs text-slate-300 max-w-3xl mx-auto shadow-md shadow-orange-950/20"
        >
          <AlertCircle className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold text-white block">
              Sharing Permission Reminder:
            </span>
            <p className="text-slate-400 text-[11px] mt-0.5">
              Set your Google Docs link to <strong>"Anyone with the link – Viewer"</strong> and test it in an incognito window before submitting. 
              Submissions that cannot be viewed by judges cannot be verified for certificates.
            </p>
          </div>
        </motion.div>

      </div>

    </section>
  );
}
