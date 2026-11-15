import React, { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { 
  Gamepad2, 
  Tag, 
  Target, 
  ShieldAlert, 
  Users, 
  Sliders, 
  Flame, 
  ChevronDown, 
  ChevronUp, 
  Copy, 
  Check, 
  CheckCircle2, 
  Sparkles,
  FileText
} from 'lucide-react';
import { copyToClipboard } from '../utils/helpers';

export default function ChallengeSection() {
  const [isGuideOpen, setIsGuideOpen] = useState(false);
  const [copiedPrompt, setCopiedPrompt] = useState(false);
  const [copiedTemplate, setCopiedTemplate] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const elements = [
    {
      num: "01",
      title: "Game Name",
      desc: "A catchy, original, and memorable title reflecting your game's world.",
      icon: Gamepad2,
      accent: "text-brand-lavender",
      bg: "bg-brand-lavender-light"
    },
    {
      num: "02",
      title: "Tagline",
      desc: "A short, exciting phrase (5–10 words) that captures the emotion or action.",
      icon: Tag,
      accent: "text-brand-sage",
      bg: "bg-brand-sage-light"
    },
    {
      num: "03",
      title: "Mission",
      desc: "The specific, achievable objective. Avoid vague tropes—state clear win goals.",
      icon: Target,
      accent: "text-[#C28267]",
      bg: "bg-brand-peach-light"
    },
    {
      num: "04",
      title: "Enemies / Challenges",
      desc: "Non-violent obstacles: gravity shifts, weather puzzles, timers, or rivals.",
      icon: ShieldAlert,
      accent: "text-[#C47D8A]",
      bg: "bg-[#FDF0F2]"
    },
    {
      num: "05",
      title: "Characters",
      desc: "Protagonists and companions: unique visual styles, roles, and personalities.",
      icon: Users,
      accent: "text-brand-lavender",
      bg: "bg-brand-lavender-light"
    },
    {
      num: "06",
      title: "Game Mode",
      desc: "Single-player adventure, 2-player co-op puzzle, strategy, or time trial.",
      icon: Sliders,
      accent: "text-brand-sage",
      bg: "bg-brand-sage-light"
    },
    {
      num: "07",
      title: "Why Players Would Jump In",
      desc: "The core emotional hook, unique mechanic, and reason it's irresistible to play.",
      icon: Flame,
      accent: "text-[#C28267]",
      bg: "bg-brand-peach-light"
    }
  ];

  const guidelines = [
    "Original ideas only.",
    "Specific and achievable mission.",
    "Interesting non-violent challenges.",
    "No guns, weapons or violence.",
    "Professional and readable poster.",
    "All seven game elements must be covered."
  ];

  const samplePrompt = `A high-end cinematic video game announcement teaser poster titled "LUMINA: THE LOST HORIZON".
Style: Futuristic eco-punk art style, vibrant cinematic lighting, raytraced volumetric fog, octane render.
Main Title: Bold typography reading "LUMINA: THE LOST HORIZON". Subtitle: "Restore the Celestial Canopy".
Visual Scene: A brave explorer in glowing teal biosuit with a floating companion drone named Pip over floating sky islands.
Challenges: Dangerous anti-gravity wind vortices and storm clouds (Strictly non-violent, zero guns, no weapons).
Composition: Balanced 3:4 vertical poster, clean professional branding, 8k resolution.`;

  const docTemplate = `GOOGLE PLAY ARENA – GAME ON NIGHT
Participant Name: [Your Name] | College: [Your College]
Game Name: [Title] | Tagline: [Tagline]

1. Game Mission: [Specific and clear objectives]
2. Enemies / Challenges: [Non-violent obstacles, puzzles, or timers]
3. Main Characters: [Visual design, personality, and abilities]
4. Game Mode: [Single-player, co-op, speed challenge, etc.]
5. Why Would Players Jump In?: [Core hook and appeal]
6. AI-Generated Poster: [Insert generated image]
7. Gemini Prompt Used: [Paste your exact text prompt]`;

  const handleCopyPrompt = async () => {
    const ok = await copyToClipboard(samplePrompt);
    if (ok) {
      setCopiedPrompt(true);
      setTimeout(() => setCopiedPrompt(false), 2500);
    }
  };

  const handleCopyTemplate = async () => {
    const ok = await copyToClipboard(docTemplate);
    if (ok) {
      setCopiedTemplate(true);
      setTimeout(() => setCopiedTemplate(false), 2500);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: 'easeOut' }
    }
  };

  return (
    <section id="challenge" className="py-16 sm:py-20 relative bg-brand-bg">
      
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
            SECTION 3
          </span>
          <h2 className="font-display font-black text-2xl sm:text-4xl text-brand-text uppercase tracking-tight">
            THE CREATION CHALLENGE
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-brand-muted">
            Every submitted game concept must clearly define these 7 required elements.
          </p>
        </motion.div>

        {/* 7 Elements Compact Grid with Stagger */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 mb-8"
        >
          {elements.map((el) => {
            const Icon = el.icon;
            return (
              <motion.div 
                key={el.num}
                variants={itemVariants}
                whileHover={prefersReducedMotion ? {} : { y: -3, transition: { duration: 0.2 } }}
                className="light-card p-4 rounded-xl flex items-start gap-3 hover:border-brand-lavender/50 transition-all hover:shadow-soft-sm group"
              >
                <div className={`w-8 h-8 rounded-lg ${el.bg} flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-105 transition-transform`}>
                  <Icon className={`w-4 h-4 ${el.accent}`} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[10px] text-brand-muted font-bold">{el.num}</span>
                    <h3 className="font-display font-bold text-xs sm:text-sm text-brand-text">
                      {el.title}
                    </h3>
                  </div>
                  <p className="text-[11px] text-brand-muted mt-0.5 leading-relaxed">
                    {el.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}

          {/* Compact Creative Guidelines Box */}
          <motion.div 
            variants={itemVariants}
            className="p-4 rounded-xl border border-brand-border bg-brand-alt sm:col-span-2 lg:col-span-2 flex flex-col justify-center"
          >
            <span className="text-[10px] font-mono uppercase font-bold text-brand-lavender tracking-wider mb-2">
              COMPACT CREATIVE GUIDELINES
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1.5 text-xs text-brand-text">
              {guidelines.map((g, i) => (
                <div key={i} className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-brand-sage shrink-0" />
                  <span className="text-[11px] text-brand-muted">{g}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Single Button to Reveal Compact Expandable Guide */}
        <div className="text-center">
          <motion.button
            whileHover={prefersReducedMotion ? {} : { scale: 1.02 }}
            whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
            onClick={() => setIsGuideOpen(!isGuideOpen)}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-display font-bold text-xs uppercase tracking-wider btn-secondary"
          >
            <span>{isGuideOpen ? "Hide Creation Guidelines" : "View Creation Guidelines"}</span>
            {isGuideOpen ? <ChevronUp className="w-4 h-4 text-brand-lavender" /> : <ChevronDown className="w-4 h-4 text-brand-lavender" />}
          </motion.button>
        </div>

        {/* Compact Expandable Guide Container with Framer Motion AnimatePresence */}
        <AnimatePresence>
          {isGuideOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="overflow-hidden mt-8"
            >
              <div className="p-6 rounded-2xl bg-brand-alt border border-brand-border shadow-soft-sm">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  
                  {/* Ready Gemini Prompt */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold font-display uppercase tracking-wider text-brand-lavender flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Sample Gemini Nano Banana Prompt</span>
                      </span>
                      <button
                        onClick={handleCopyPrompt}
                        className="text-[11px] font-mono text-brand-muted hover:text-brand-lavender flex items-center gap-1 transition-colors"
                      >
                        {copiedPrompt ? <Check className="w-3.5 h-3.5 text-brand-sage" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copiedPrompt ? "Copied!" : "Copy Prompt"}</span>
                      </button>
                    </div>
                    <div className="p-3.5 rounded-xl bg-white border border-brand-border text-[11px] font-mono text-brand-text leading-relaxed max-h-48 overflow-y-auto select-all shadow-soft-xs">
                      {samplePrompt}
                    </div>
                  </div>

                  {/* Ready Google Docs Template */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold font-display uppercase tracking-wider text-brand-lavender flex items-center gap-1.5">
                        <FileText className="w-3.5 h-3.5" />
                        <span>Google Docs Quick Template</span>
                      </span>
                      <button
                        onClick={handleCopyTemplate}
                        className="text-[11px] font-mono text-brand-muted hover:text-brand-lavender flex items-center gap-1 transition-colors"
                      >
                        {copiedTemplate ? <Check className="w-3.5 h-3.5 text-brand-sage" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copiedTemplate ? "Copied!" : "Copy Template"}</span>
                      </button>
                    </div>
                    <div className="p-3.5 rounded-xl bg-white border border-brand-border text-[11px] font-mono text-brand-text leading-relaxed max-h-48 overflow-y-auto select-all shadow-soft-xs">
                      {docTemplate}
                    </div>
                  </div>

                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>

    </section>
  );
}
