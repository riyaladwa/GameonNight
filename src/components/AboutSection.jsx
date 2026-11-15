import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Lightbulb, Image as ImageIcon, FileText, Mic } from 'lucide-react';

export default function AboutSection() {
  const prefersReducedMotion = useReducedMotion();

  const steps = [
    {
      num: "01",
      title: "Imagine your game",
      desc: "Conceive an original game universe, specific mission, and engaging non-violent challenges.",
      icon: Lightbulb,
      color: "text-[#C28267]",
      bg: "bg-brand-peach-light",
    },
    {
      num: "02",
      title: "Create your poster",
      desc: "Use Gemini and Nano Banana image generation to craft a theatrical announcement game poster.",
      icon: ImageIcon,
      color: "text-brand-lavender",
      bg: "bg-brand-lavender-light",
    },
    {
      num: "03",
      title: "Document in Google Docs",
      desc: "Structure all seven mandatory game elements and embed your final poster image.",
      icon: FileText,
      color: "text-brand-sage",
      bg: "bg-brand-sage-light",
    },
    {
      num: "04",
      title: "Pitch it in 60 seconds",
      desc: "Deliver a concise, energetic pitch live in Google Meet to our judges and community.",
      icon: Mic,
      color: "text-brand-lavender",
      bg: "bg-brand-lavender-light",
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.45, ease: 'easeOut' }
    }
  };

  return (
    <section id="about" className="py-16 sm:py-20 relative bg-brand-alt border-y border-brand-border">
      
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        
        {/* Section Header with Scroll Trigger */}
        <motion.div 
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto mb-12"
        >
          <span className="text-[11px] font-mono uppercase tracking-widest text-brand-lavender font-semibold block mb-1">
            ABOUT THE EVENT
          </span>
          <h2 className="font-display font-black text-2xl sm:text-4xl text-brand-text uppercase tracking-tight">
            NO CODE. JUST CREATIVITY.
          </h2>
          <p className="mt-4 text-sm sm:text-base text-brand-muted leading-relaxed font-sans">
            "Imagine creating your own game without writing a single line of code. Use Gemini and Nano Banana to design an original game concept, create its poster and pitch your idea in 60 seconds."
          </p>
        </motion.div>

        {/* 4 Steps Grid with Staggered Entrance */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {steps.map((st) => {
            const Icon = st.icon;
            return (
              <motion.div 
                key={st.num}
                variants={itemVariants}
                whileHover={prefersReducedMotion ? {} : { y: -4, transition: { duration: 0.2 } }}
                className="light-card p-5 rounded-2xl flex flex-col justify-between hover:border-brand-lavender/50 transition-all hover:shadow-soft-md group"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-mono text-xs font-bold text-brand-lavender">
                      STEP {st.num}
                    </span>
                    <div className={`w-8 h-8 rounded-lg ${st.bg} flex items-center justify-center`}>
                      <Icon className={`w-4 h-4 ${st.color}`} />
                    </div>
                  </div>
                  <h3 className="font-display font-bold text-sm text-brand-text mb-1.5">
                    {st.title}
                  </h3>
                  <p className="text-xs text-brand-muted leading-relaxed">
                    {st.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

      </div>

    </section>
  );
}
