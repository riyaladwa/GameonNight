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
      color: "text-amber-400",
    },
    {
      num: "02",
      title: "Create your poster",
      desc: "Use Gemini and Nano Banana image generation to craft a theatrical announcement game poster.",
      icon: ImageIcon,
      color: "text-cyan-400",
    },
    {
      num: "03",
      title: "Document in Google Docs",
      desc: "Structure all seven mandatory game elements and embed your final poster image.",
      icon: FileText,
      color: "text-violet-400",
    },
    {
      num: "04",
      title: "Pitch it in 60 seconds",
      desc: "Deliver a concise, energetic pitch live in Google Meet to our judges and community.",
      icon: Mic,
      color: "text-emerald-400",
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
    <section id="about" className="py-16 sm:py-20 relative border-t border-violet-950/40">
      
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        
        {/* Section Header with Scroll Trigger */}
        <motion.div 
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto mb-12"
        >
          <span className="text-[11px] font-mono uppercase tracking-widest text-cyan-400 block mb-1">
            ABOUT THE EVENT
          </span>
          <h2 className="font-display font-black text-2xl sm:text-4xl text-white uppercase tracking-tight">
            NO CODE. JUST CREATIVITY.
          </h2>
          <p className="mt-4 text-sm sm:text-base text-slate-300 leading-relaxed font-sans">
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
                className="subtle-glass p-5 rounded-2xl flex flex-col justify-between hover:border-violet-600/40 transition-shadow hover:shadow-lg hover:shadow-violet-500/10"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-mono text-xs font-bold text-violet-400">
                      STEP {st.num}
                    </span>
                    <Icon className={`w-5 h-5 ${st.color}`} />
                  </div>
                  <h3 className="font-display font-bold text-sm text-white mb-1.5">
                    {st.title}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
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
