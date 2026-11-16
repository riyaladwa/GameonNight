import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Award, 
  Download, 
  CheckCircle2, 
  Lock, 
  Sparkles, 
  RefreshCw, 
  FileText, 
  UserCheck, 
  Calendar,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  ShieldAlert
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { jsPDF } from 'jspdf';
import { useEvent } from '../context/EventContext';

export default function CertificateGenerator({ 
  hasFilledPreSurvey, 
  setHasFilledPreSurvey, 
  hasFilledFeedback, 
  setHasFilledFeedback 
}) {
  const { config } = useEvent();
  const [participantName, setParticipantName] = useState('Alex Johnson');
  const [certificateId, setCertificateId] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [hasGenerated, setHasGenerated] = useState(false);
  const canvasRef = useRef(null);

  // Both forms must be completed to unlock certificate generation
  const isBothFormsFilled = Boolean(hasFilledPreSurvey && hasFilledFeedback);

  // Dynamic current day's date or custom override
  const getTodayFormatted = () => {
    if (config.CERTIFICATE_DATE && config.CERTIFICATE_DATE.trim().length > 0) {
      return config.CERTIFICATE_DATE.trim();
    }
    const today = new Date();
    return today.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const currentDate = getTodayFormatted();

  // Unique Certificate ID
  useEffect(() => {
    const randomHex = Math.floor(100000 + Math.random() * 900000);
    setCertificateId(`GSA-GPA-2026-${randomHex}`);
  }, []);

  // Redraw canvas whenever name, date, or cert ID changes and component is unlocked
  useEffect(() => {
    if (isBothFormsFilled) {
      renderCertificate();
    }
  }, [participantName, currentDate, certificateId, isBothFormsFilled]);

  const renderCertificate = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Native resolution matching the official PDF template geometry: 2400 x 1730
    const width = 2400;
    const height = 1730;
    canvas.width = width;
    canvas.height = height;

    const templateImg = new Image();
    templateImg.crossOrigin = 'anonymous';
    templateImg.src = '/certificate-template.png';

    const drawTextOverlays = () => {
      // 1. Overlay Dynamic Participant Name directly above the designated underline
      // Baseline sits right above underline at y = 918 (y = 904), centered at x = 1200
      ctx.textAlign = 'center';
      ctx.textBaseline = 'bottom';

      if (participantName.trim().length > 0) {
        ctx.font = 'bold 74px "Georgia", "Playfair Display", "Times New Roman", serif';
        ctx.fillStyle = '#1A73E8'; // Google Blue
        ctx.fillText(participantName.trim(), 1200, 904);
      } else {
        // Prevents blank template exposure by watermarking placeholder on canvas
        ctx.font = 'italic 58px "Georgia", "Playfair Display", serif';
        ctx.fillStyle = '#9AA0A6'; // Muted placeholder grey
        ctx.fillText('[ Enter Your Name in the Input Field Above ]', 1200, 904);
      }

      // 2. Overlay Dynamic Current Day Date directly above the Date line
      // Baseline sits right above underline at y = 1473 (y = 1460), centered at x = 441
      ctx.textAlign = 'center';
      ctx.textBaseline = 'bottom';
      ctx.font = '600 36px "Plus Jakarta Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
      ctx.fillStyle = '#202124'; // Neutral dark
      ctx.fillText(currentDate, 441, 1460);
    };

    templateImg.onload = () => {
      ctx.drawImage(templateImg, 0, 0, width, height);
      drawTextOverlays();
    };

    templateImg.onerror = () => {
      // Fallback clean template if image is still loading
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, 0, width, height);
      ctx.strokeStyle = '#4285F4';
      ctx.lineWidth = 12;
      ctx.strokeRect(40, 40, width - 80, height - 80);
      drawTextOverlays();
    };
  };

  const handleDownloadPNG = () => {
    if (!participantName.trim()) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    setIsGenerating(true);

    const safeName = participantName.trim().replace(/[^a-zA-Z0-9]/g, '_');
    const imageURL = canvas.toDataURL('image/png', 1.0);
    const link = document.createElement('a');
    link.download = `Certificate_Participation_${safeName}.png`;
    link.href = imageURL;
    link.click();

    triggerConfetti();
    setIsGenerating(false);
    setHasGenerated(true);
  };

  const handleDownloadPDF = () => {
    if (!participantName.trim()) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    setIsGenerating(true);

    const safeName = participantName.trim().replace(/[^a-zA-Z0-9]/g, '_');
    const imgData = canvas.toDataURL('image/png', 1.0);

    // Landscape A4 PDF: 297mm x 210mm
    const pdf = new jsPDF({
      orientation: 'landscape',
      unit: 'mm',
      format: 'a4',
    });

    const imgRatio = 2400 / 1730; // ~1.38728
    let pdfH = 210;
    let pdfW = 210 * imgRatio; // ~291.33mm
    let pdfX = (297 - pdfW) / 2; // ~2.83mm margin on both sides
    let pdfY = 0;

    pdf.addImage(imgData, 'PNG', pdfX, pdfY, pdfW, pdfH, undefined, 'FAST');
    pdf.save(`Certificate_Participation_${safeName}.pdf`);

    triggerConfetti();
    setIsGenerating(false);
    setHasGenerated(true);
  };

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 90,
        spread: 75,
        origin: { y: 0.6 },
        colors: ['#4285F4', '#EA4335', '#FBBC05', '#34A853', '#8B78B8'],
      });
    } catch (e) {}
  };

  const unlockBothFormsDemo = () => {
    setHasFilledPreSurvey(true);
    setHasFilledFeedback(true);
  };

  const resetFormsDemo = () => {
    setHasFilledPreSurvey(false);
    setHasFilledFeedback(false);
    setHasGenerated(false);
  };

  return (
    <div id="certificate-generator" className="mt-12 max-w-4xl mx-auto">
      
      {/* Container Card */}
      <div className="rounded-3xl border border-brand-border bg-white shadow-soft-md overflow-hidden">
        
        {/* Header */}
        <div className="p-6 sm:p-8 border-b border-brand-border bg-brand-alt/60">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-brand-lavender-light border border-brand-lavender/30 flex items-center justify-center text-brand-lavender shadow-soft-xs">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase font-bold text-brand-lavender tracking-wider block">
                  OFFICIAL EVENT CREDENTIAL
                </span>
                <h3 className="font-display font-black text-xl text-brand-text">
                  Certificate of Participation
                </h3>
              </div>
            </div>

            {/* Dynamic Status Pill */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-white border border-brand-border text-brand-muted flex items-center gap-1.5 shadow-soft-xs">
                <ShieldCheck className="w-3.5 h-3.5 text-brand-lavender" />
                <span>Personalized Credentials Only</span>
              </span>

              <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold ${
                isBothFormsFilled
                  ? 'bg-brand-sage-light text-[#4E6B4A] border border-brand-sage'
                  : 'bg-brand-peach-light text-[#A6634E] border border-brand-peach'
              }`}>
                {isBothFormsFilled ? (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5 text-brand-sage" />
                    <span>Unlocked & Verified</span>
                  </>
                ) : (
                  <>
                    <Lock className="w-3.5 h-3.5 text-[#A6634E]" />
                    <span>Locked (Complete Both Forms)</span>
                  </>
                )}
              </span>
            </div>

          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8">
          
          {!isBothFormsFilled ? (
            /* ========================================================
               LOCKED STATE: FORM GATING PROGRESS CHECKLIST
               ======================================================== */
            <div className="py-4 max-w-2xl mx-auto">
              
              <div className="text-center mb-8">
                <div className="w-16 h-16 mx-auto rounded-2xl bg-brand-peach-light border border-brand-peach flex items-center justify-center text-[#A6634E] mb-3.5 shadow-soft-xs">
                  <Lock className="w-8 h-8" />
                </div>
                <h4 className="font-display font-black text-xl text-brand-text mb-2">
                  Complete Both Forms to Unlock Your Certificate
                </h4>
                <p className="text-xs sm:text-sm text-brand-muted leading-relaxed max-w-md mx-auto">
                  Per official Google Student Ambassador guidelines, certificate generation becomes available once both the Pre-Survey and Feedback forms are submitted.
                </p>
              </div>

              {/* Sequential Progress Cards */}
              <div className="space-y-3 mb-8">
                
                {/* Step 1 Check */}
                <div className={`p-4 rounded-2xl border flex items-center justify-between gap-3 transition-colors ${
                  hasFilledPreSurvey 
                    ? 'bg-brand-sage-light/40 border-brand-sage text-[#4E6B4A]' 
                    : 'bg-white border-brand-border text-brand-text'
                }`}>
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-mono font-bold text-xs ${
                      hasFilledPreSurvey 
                        ? 'bg-brand-sage text-white' 
                        : 'bg-brand-lavender-light text-brand-lavender border border-brand-lavender/30'
                    }`}>
                      {hasFilledPreSurvey ? '✓' : '1'}
                    </div>
                    <div>
                      <h5 className="font-display font-bold text-sm">
                        Step 1: Pre-Survey Form
                      </h5>
                      <p className="text-[11px] text-brand-muted">
                        Mandatory to register event attendance and unlock Step 2.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {hasFilledPreSurvey ? (
                      <span className="text-xs font-mono font-bold text-[#4E6B4A] flex items-center gap-1">
                        <CheckCircle2 className="w-4 h-4 text-brand-sage" />
                        <span>Completed</span>
                      </span>
                    ) : (
                      <button
                        onClick={() => setHasFilledPreSurvey(true)}
                        className="px-3 py-1.5 rounded-lg text-xs font-mono font-bold btn-primary"
                      >
                        Complete Step 1
                      </button>
                    )}
                  </div>
                </div>

                {/* Step 2 Check */}
                <div className={`p-4 rounded-2xl border flex items-center justify-between gap-3 transition-colors ${
                  hasFilledFeedback 
                    ? 'bg-brand-sage-light/40 border-brand-sage text-[#4E6B4A]' 
                    : hasFilledPreSurvey 
                      ? 'bg-white border-brand-peach text-brand-text' 
                      : 'bg-brand-alt/60 border-brand-border text-brand-muted opacity-80'
                }`}>
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-mono font-bold text-xs ${
                      hasFilledFeedback 
                        ? 'bg-brand-sage text-white' 
                        : hasFilledPreSurvey 
                          ? 'bg-brand-peach-light text-[#8C5542] border border-brand-peach' 
                          : 'bg-brand-alt text-brand-muted border border-brand-border'
                    }`}>
                      {hasFilledFeedback ? '✓' : hasFilledPreSurvey ? '2' : <Lock className="w-3.5 h-3.5" />}
                    </div>
                    <div>
                      <h5 className="font-display font-bold text-sm">
                        Step 2: Feedback Form
                      </h5>
                      <p className="text-[11px] text-brand-muted">
                        {!hasFilledPreSurvey 
                          ? 'Locked until you complete Step 1 (Pre-Survey).' 
                          : 'Submit your Google Doc pitch link and event feedback.'}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {hasFilledFeedback ? (
                      <span className="text-xs font-mono font-bold text-[#4E6B4A] flex items-center gap-1">
                        <CheckCircle2 className="w-4 h-4 text-brand-sage" />
                        <span>Completed</span>
                      </span>
                    ) : hasFilledPreSurvey ? (
                      <button
                        onClick={() => setHasFilledFeedback(true)}
                        className="px-3 py-1.5 rounded-lg text-xs font-mono font-bold btn-peach"
                      >
                        Complete Step 2
                      </button>
                    ) : (
                      <span className="text-xs font-mono text-brand-muted flex items-center gap-1">
                        <Lock className="w-3.5 h-3.5" />
                        <span>Locked</span>
                      </span>
                    )}
                  </div>
                </div>

                {/* Step 3: Certificate Form */}
                <div className="p-4 rounded-2xl border border-brand-border bg-brand-alt/50 flex items-center justify-between gap-3 opacity-90">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-brand-alt border border-brand-border flex items-center justify-center text-brand-muted">
                      <Lock className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <h5 className="font-display font-bold text-sm text-brand-muted">
                        Step 3: Certificate Generation Form
                      </h5>
                      <p className="text-[11px] text-brand-muted">
                        Generates high-res PDF stamped with your personalized name and date ({currentDate}).
                      </p>
                    </div>
                  </div>

                  <span className="text-xs font-mono text-brand-muted flex items-center gap-1">
                    <Lock className="w-3.5 h-3.5" />
                    <span>Locked</span>
                  </span>
                </div>

              </div>

              {/* Instant Localhost Demo Controls */}
              <div className="p-4 rounded-2xl bg-brand-lavender-light/40 border border-brand-lavender/30 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2 text-brand-lavender font-semibold">
                  <Sparkles className="w-4 h-4 shrink-0" />
                  <span>Localhost Demo Mode: Test certificate generator instantly</span>
                </div>
                
                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={unlockBothFormsDemo}
                    className="flex-1 sm:flex-none px-4 py-2 rounded-xl text-xs font-bold font-display uppercase tracking-wider btn-primary shadow-soft-xs text-center"
                  >
                    ⚡ Demo: Unlock Both Forms
                  </button>
                </div>
              </div>

            </div>
          ) : (
            /* ========================================================
               UNLOCKED STATE: LIVE CERTIFICATE GENERATOR
               ======================================================== */
            <div className="space-y-6">
              
              {/* Unlocked Banner */}
              <div className="p-4 rounded-2xl bg-brand-sage-light/60 border border-brand-sage flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <ShieldCheck className="w-5 h-5 text-brand-sage shrink-0" />
                  <div className="text-xs">
                    <span className="font-bold text-[#4E6B4A] block">
                      Verification Complete • Certificate Generator Active
                    </span>
                    <span className="text-brand-muted">
                      Both Pre-Survey and Feedback forms have been recorded. Enter your name below to generate your personalized certificate.
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={resetFormsDemo}
                    className="px-2.5 py-1 rounded-lg text-[10px] font-mono text-brand-muted hover:text-brand-text border border-brand-border bg-white transition-colors"
                    title="Lock forms to test the gating sequence again"
                  >
                    ↺ Reset & Test Locking
                  </button>
                </div>
              </div>

              {/* Name Input Controls */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-mono text-brand-text font-semibold">
                    Participant Full Name (Stamped on Certificate) *
                  </label>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setParticipantName('Alex Johnson')}
                      className="text-[11px] font-mono text-brand-lavender hover:underline"
                    >
                      Demo: Alex Johnson
                    </button>
                    <span className="text-brand-border">•</span>
                    <button
                      type="button"
                      onClick={() => setParticipantName('Riya P Ladwa')}
                      className="text-[11px] font-mono text-brand-lavender hover:underline"
                    >
                      Demo: Riya P Ladwa
                    </button>
                  </div>
                </div>
                
                <input
                  type="text"
                  value={participantName}
                  onChange={(e) => setParticipantName(e.target.value)}
                  placeholder="Type participant name here (e.g. Jane Doe)..."
                  className="w-full px-4 py-3 rounded-xl bg-brand-alt border border-brand-border text-brand-text text-sm font-sans focus:border-brand-lavender focus:bg-white focus:outline-none transition-colors"
                />
              </div>

              {/* Date & Metadata Bar */}
              <div className="flex flex-wrap items-center justify-between text-xs font-mono text-brand-muted gap-2 py-2 border-y border-brand-border">
                <span className="flex items-center gap-1.5 text-brand-lavender font-semibold">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Dynamic Date Stamped: <strong>{currentDate}</strong></span>
                </span>
                <span className="text-[11px]">
                  Official Signature: <strong className="text-brand-text">Riya P Ladwa (Google Student Ambassador)</strong>
                </span>
              </div>

              {/* Live Canvas Preview */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-mono text-brand-muted uppercase tracking-wider font-semibold">
                    Live Certificate Preview (Personalized)
                  </span>
                  <span className="text-[10px] font-mono text-brand-sage font-bold flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    <span>Real-time render • 2400 x 1730 Native</span>
                  </span>
                </div>

                <div className="relative rounded-2xl border border-brand-border overflow-hidden bg-brand-alt shadow-soft-sm">
                  <canvas 
                    ref={canvasRef} 
                    className="w-full h-auto block"
                    style={{ aspectRatio: '2400 / 1730' }}
                  />
                </div>
              </div>

              {/* Action Buttons: PDF & PNG Only (No Blank Template Link) */}
              <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-2">
                <button
                  onClick={handleDownloadPNG}
                  disabled={!participantName.trim() || isGenerating}
                  className="w-full sm:w-auto px-5 py-3 rounded-xl text-xs font-bold font-display uppercase tracking-wider btn-secondary flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  <Download className="w-4 h-4 text-brand-lavender" />
                  <span>Download Image (PNG)</span>
                </button>

                <button
                  onClick={handleDownloadPDF}
                  disabled={!participantName.trim() || isGenerating}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl text-xs font-bold font-display uppercase tracking-wider btn-primary flex items-center justify-center gap-2 disabled:opacity-50 shadow-soft-sm"
                >
                  <Award className="w-4 h-4" />
                  <span>Download Certificate (PDF)</span>
                </button>
              </div>

              {!participantName.trim() && (
                <p className="text-[11px] font-mono text-center text-brand-peach">
                  ⚠️ Please enter a participant name above to enable certificate generation.
                </p>
              )}

              {hasGenerated && (
                <div className="p-3 rounded-xl bg-brand-sage-light border border-brand-sage text-[#4E6B4A] text-xs font-mono text-center flex items-center justify-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-brand-sage" />
                  <span>Certificate successfully generated with dynamic date ({currentDate})!</span>
                </div>
              )}

            </div>
          )}

        </div>

      </div>

    </div>
  );
}
