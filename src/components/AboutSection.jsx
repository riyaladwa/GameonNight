import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Sparkles, Brain, Cpu, Clock, CheckCircle2 } from 'lucide-react';

export default function AboutSection() {
  const prefersReducedMotion = useReducedMotion();

  const highlights = [
    {
      title: "100% Concept & Ideation",
      desc: "Zero coding or game engine development required. Focus entirely on original world-building, storyline, and gameplay.",
      icon: Brain,
      color: "text-[#C28267]",
      bg: "bg-brand-peach-light",
    },
    {
      title: "Powered by Google AI",
      desc: "Craft game lore and mechanics using Google Gemini, and bring your world to life visually with Nano Banana.",
      icon: Cpu,
      color: "text-brand-lavender",
      bg: "bg-brand-lavender-light",
    },
    {
      title: "60-Second Live Pitch",
      desc: "Present your concept and screen-share your game poster live in a structured 1-minute Google Meet presentation.",
      icon: Clock,
      color: "text-brand-sage",
      bg: "bg-brand-sage-light",
    }
  ];

  return (
    <section id="about" className="py-16 sm:py-20 relative bg-brand-alt border-y border-brand-border">
      
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
            SECTION 01 • ABOUT
          </span>
          <h2 className="font-display font-black text-2xl sm:text-4xl text-brand-text uppercase tracking-tight">
            WHAT IS GAME ON NIGHT?
          </h2>
          <p className="mt-3 text-sm sm:text-base text-brand-muted leading-relaxed font-sans">
            An official <strong className="text-brand-text font-semibold">Google Student Ambassador</strong> initiative where participants use <strong className="text-brand-text font-semibold">Google Gemini</strong> and <strong className="text-brand-text font-semibold">Nano Banana</strong> to invent an original video game concept, design its visual poster, and pitch it in 60 seconds.
          </p>
        </motion.div>

        {/* 3 Core Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {highlights.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="light-card p-6 rounded-2xl flex flex-col justify-between hover:border-brand-lavender/40 transition-all hover:shadow-soft-md"
              >
                <div>
                  <div className={`w-10 h-10 rounded-xl ${item.bg} flex items-center justify-center mb-3.5`}>
                    <Icon className={`w-5 h-5 ${item.color}`} />
                  </div>
                  <h3 className="font-display font-bold text-base text-brand-text mb-1.5">
                    {item.title}
                  </h3>
                  <p className="text-xs text-brand-muted leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Reassurance Banner: Ideathon vs Hackathon */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="p-4 sm:p-5 rounded-2xl bg-white border border-brand-border flex flex-col sm:flex-row items-center justify-between gap-3 shadow-soft-xs text-center sm:text-left"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-brand-sage-light border border-brand-sage/30 flex items-center justify-center text-brand-sage shrink-0">
              <CheckCircle2 className="w-4 h-4 text-brand-sage" />
            </div>
            <div>
              <span className="text-xs font-bold text-brand-text font-display block">
                Ideathon, NOT a Hackathon
              </span>
              <span className="text-[11px] text-brand-muted">
                No coding, software development, or prior gaming industry experience required.
              </span>
            </div>
          </div>
          <span className="text-[10px] font-mono uppercase font-semibold px-2.5 py-1 rounded-md bg-brand-lavender-light text-brand-lavender border border-brand-lavender/30 whitespace-nowrap">
            100% Free & Open
          </span>
        </motion.div>

      </div>

    </section>
  );
}