import React, { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { 
  FileText, 
  Gamepad2, 
  Image as ImageIcon, 
  Sparkles, 
  Clock, 
  CheckCircle2, 
  ChevronDown, 
  Copy, 
  Check, 
  ExternalLink,
  Target,
  BookOpen
} from 'lucide-react';
import { copyToClipboard } from '../utils/helpers';

export default function CreationGuideSection() {
  const prefersReducedMotion = useReducedMotion();
  const [isGuideExpanded, setIsGuideExpanded] = useState(false);
  const [copiedPrompt, setCopiedPrompt] = useState(false);

  const samplePrompt = `Act as an award-winning game designer. Help me create an original, non-violent video game concept. 

Provide:
1. Game Title & Tagline
2. Story Premise & Lore
3. Clear Player Objective & Specific Mission
4. Creative Non-Violent Core Mechanics (puzzles, physics, exploration)
5. A detailed prompt to generate its promotional poster in Nano Banana.`;

  const handleCopyPrompt = async () => {
    const success = await copyToClipboard(samplePrompt);
    if (success) {
      setCopiedPrompt(true);
      setTimeout(() => setCopiedPrompt(false), 2500);
    }
  };

  const requirements = [
    { id: 1, title: "Game Title & Tagline", desc: "A catchy, original game name and a one-sentence hook." },
    { id: 2, title: "Story Premise & Lore", desc: "The setting, atmosphere, world-building, and character motive." },
    { id: 3, title: "Specific Mission", desc: "The concrete in-game goal the player must accomplish." },
    { id: 4, title: "Non-Violent Mechanics", desc: "Creative gameplay loop based on puzzles, physics, or discovery." },
    { id: 5, title: "Gemini Prompts Used", desc: "The exact AI prompts you crafted to brainstorm the concept." },
    { id: 6, title: "Nano Banana Poster", desc: "A high-resolution promotional poster embedded in your doc." },
    { id: 7, title: "60-Second Pitch Script", desc: "A concise spoken script formatted for your 1-minute pitch." },
  ];

  const pitchTiming = [
    { time: "0:00 – 0:15", label: "The Hook & Title", desc: "Hook the audience, announce your game title, and state the core premise." },
    { time: "0:15 – 0:40", label: "Gameplay & Mission", desc: "Explain the player's primary goal, environment, and non-violent mechanics." },
    { time: "0:40 – 1:00", label: "Poster & Closing", desc: "Highlight your Nano Banana visual poster and close with a punchy conclusion." },
  ];

  return (
    <section id="creation-guide" className="py-16 sm:py-20 relative bg-brand-alt border-y border-brand-border">
      
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
            SECTION 03 • GUIDE
          </span>
          <h2 className="font-display font-black text-2xl sm:text-4xl text-brand-text uppercase tracking-tight">
            GAME CREATION GUIDE
          </h2>
          <p className="mt-3 text-sm sm:text-base text-brand-muted leading-relaxed font-sans">
            The 7 essential requirements for your concept doc and your 60-second pitch blueprint.
          </p>
        </motion.div>

        {/* 7 Required Elements Grid */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-brand-text flex items-center gap-2">
              <FileText className="w-4 h-4 text-brand-lavender" />
              <span>7 Mandatory Document Elements</span>
            </span>
            <span className="text-[11px] font-mono text-brand-muted">Include all in your Google Doc</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
            {requirements.map((req) => (
              <div 
                key={req.id}
                className="light-card p-4 rounded-xl flex flex-col justify-between hover:border-brand-lavender/50 transition-all hover:shadow-soft-sm"
              >
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-5 h-5 rounded-md bg-brand-lavender-light text-brand-lavender font-mono text-[11px] font-bold flex items-center justify-center">
                      {req.id}
                    </span>
                    <h3 className="font-display font-bold text-xs sm:text-sm text-brand-text">
                      {req.title}
                    </h3>
                  </div>
                  <p className="text-[11px] text-brand-muted leading-relaxed">
                    {req.desc}
                  </p>
                </div>
              </div>
            ))}

            {/* Special Highlight on Non-Violent rule */}
            <div className="light-card p-4 rounded-xl flex flex-col justify-center bg-brand-peach-light/50 border-brand-peach/80">
              <span className="text-[10px] font-mono font-bold text-[#A6634E] uppercase block mb-1">
                GOLDEN RULE
              </span>
              <p className="text-xs font-bold text-brand-text mb-1">Non-Violent Only</p>
              <p className="text-[11px] text-brand-muted leading-relaxed">
                Games must prioritize creative mechanics, puzzle-solving, or exploration. No gratuitous combat.
              </p>
            </div>
          </div>
        </div>

        {/* 60-Second Pitch Blueprint */}
        <div className="mb-8 p-6 rounded-2xl bg-white border border-brand-border shadow-soft-sm">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-brand-sage-light border border-brand-sage/30 flex items-center justify-center text-brand-sage">
                <Clock className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-display font-bold text-sm text-brand-text">
                  60-Second Pitch Blueprint
                </h3>
                <p className="text-[11px] text-brand-muted">
                  How to structure your live 1-minute presentation in Google Meet
                </p>
              </div>
            </div>
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-brand-sage-light text-[#4E6B4A]">
              STRICT 60 SECONDS
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {pitchTiming.map((pt, idx) => (
              <div key={idx} className="p-3.5 rounded-xl bg-brand-alt border border-brand-border">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-mono font-bold text-brand-lavender">
                    {pt.time}
                  </span>
                  <span className="text-[10px] font-mono text-brand-muted">Part {idx + 1}</span>
                </div>
                <h4 className="font-display font-bold text-xs text-brand-text mb-1">
                  {pt.label}
                </h4>
                <p className="text-[11px] text-brand-muted leading-relaxed">
                  {pt.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Expandable Helper: Sample Prompt & Doc Template */}
        <div className="text-center">
          <button
            onClick={() => setIsGuideExpanded(!isGuideExpanded)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-brand-border text-xs font-mono font-bold text-brand-text hover:text-brand-lavender hover:border-brand-lavender transition-all shadow-soft-xs"
          >
            <Sparkles className="w-3.5 h-3.5 text-brand-lavender" />
            <span>{isGuideExpanded ? 'Hide Sample Prompt & Template' : 'View Sample Gemini Prompt & Doc Template'}</span>
            <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isGuideExpanded ? 'rotate-180' : ''}`} />
          </button>
        </div>

        <AnimatePresence>
          {isGuideExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden mt-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                {/* Sample Prompt Box */}
                <div className="p-5 rounded-2xl bg-white border border-brand-border shadow-soft-xs">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono font-bold text-brand-text">Sample Gemini Prompt</span>
                    <button
                      onClick={handleCopyPrompt}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-mono text-brand-lavender hover:bg-brand-lavender-light border border-brand-lavender/30 transition-colors"
                    >
                      {copiedPrompt ? <Check className="w-3 h-3 text-brand-sage" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedPrompt ? 'Copied!' : 'Copy Prompt'}</span>
                    </button>
                  </div>
                  <pre className="p-3 rounded-xl bg-brand-alt text-[11px] font-mono text-brand-text whitespace-pre-wrap leading-relaxed border border-brand-border">
                    {samplePrompt}
                  </pre>
                </div>

                {/* Google Doc Structure */}
                <div className="p-5 rounded-2xl bg-white border border-brand-border shadow-soft-xs">
                  <span className="text-xs font-mono font-bold text-brand-text block mb-2">
                    Recommended Google Doc Layout
                  </span>
                  <div className="p-3 rounded-xl bg-brand-alt text-xs text-brand-muted space-y-1.5 border border-brand-border font-mono text-[11px]">
                    <p className="text-brand-text font-bold">1. Game Title & Tagline</p>
                    <p className="text-brand-text font-bold">2. Story Premise (2–3 paragraphs)</p>
                    <p className="text-brand-text font-bold">3. Specific Mission & Core Objective</p>
                    <p className="text-brand-text font-bold">4. Non-Violent Gameplay Mechanics</p>
                    <p className="text-brand-text font-bold">5. Exact Gemini Prompts Used</p>
                    <p className="text-brand-text font-bold">6. Embedded Nano Banana Game Poster</p>
                    <p className="text-brand-text font-bold">7. 60-Second Pitch Script</p>
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