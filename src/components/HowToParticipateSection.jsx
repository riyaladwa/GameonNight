import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Lightbulb, Image as ImageIcon, Mic, ArrowRight, ShieldCheck } from 'lucide-react';

export default function HowToParticipateSection() {
  const prefersReducedMotion = useReducedMotion();

  const steps = [
    {
      num: "01",
      title: "Imagine & Prompt",
      tool: "Google Gemini",
      desc: "Conceive an original game concept, storyline, and non-violent gameplay mechanics. Use Gemini to write and refine your concept prompts.",
      icon: Lightbulb,
      color: "text-[#C28267]",
      bg: "bg-brand-peach-light",
      border: "border-brand-peach/80",
    },
    {
      num: "02",
      title: "Design & Document",
      tool: "Nano Banana + Google Docs",
      desc: "Generate an eye-catching poster using Nano Banana. Record your 7 required game elements and embed your poster in a public Google Doc.",
      icon: ImageIcon,
      color: "text-brand-lavender",
      bg: "bg-brand-lavender-light",
      border: "border-brand-lavender/40",
    },
    {
      num: "03",
      title: "Pitch in 60 Seconds",
      tool: "Google Meet",
      desc: "Join the live Game On Night session, screen-share your Nano Banana poster, and deliver your 1-minute concept pitch.",
      icon: Mic,
      color: "text-brand-sage",
      bg: "bg-brand-sage-light",
      border: "border-brand-sage/40",
    }
  ];

  return (
    <section id="how-to-participate" className="py-16 sm:py-20 relative bg-brand-bg">
      
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
            SECTION 02 • PROCESS
          </span>
          <h2 className="font-display font-black text-2xl sm:text-4xl text-brand-text uppercase tracking-tight">
            HOW TO PARTICIPATE
          </h2>
          <p className="mt-3 text-sm sm:text-base text-brand-muted leading-relaxed font-sans">
            Go from an idea to a live pitch in three straightforward milestones.
          </p>
        </motion.div>

        {/* 3 Step Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
          {steps.map((st, idx) => {
            const Icon = st.icon;
            return (
              <motion.div 
                key={st.num}
                initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: idx * 0.1 }}
                whileHover={prefersReducedMotion ? {} : { y: -4, transition: { duration: 0.2 } }}
                className={`light-card p-6 rounded-2xl flex flex-col justify-between transition-all hover:shadow-soft-md ${st.border}`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-xs font-bold text-brand-lavender">
                      STEP {st.num}
                    </span>
                    <div className={`w-9 h-9 rounded-xl ${st.bg} flex items-center justify-center`}>
                      <Icon className={`w-4 h-4 ${st.color}`} />
                    </div>
                  </div>

                  <span className="text-[10px] font-mono font-semibold uppercase text-brand-muted tracking-wider block mb-1">
                    {st.tool}
                  </span>
                  <h3 className="font-display font-bold text-base text-brand-text mb-2">
                    {st.title}
                  </h3>
                  <p className="text-xs text-brand-muted leading-relaxed">
                    {st.desc}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-brand-border/60 flex items-center text-[11px] font-mono font-semibold text-brand-lavender">
                  <span>Milestone {st.num} of 03</span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Public Sharing Reminder */}
        <div className="p-4 rounded-xl bg-brand-alt border border-brand-border text-center max-w-2xl mx-auto flex items-center justify-center gap-2 text-xs text-brand-muted">
          <ShieldCheck className="w-4 h-4 text-brand-sage shrink-0" />
          <span>
            Reminder: Ensure your Google Doc sharing permission is set to <strong>"Anyone with the link can view"</strong>.
          </span>
        </div>

      </div>

    </section>
  );
}