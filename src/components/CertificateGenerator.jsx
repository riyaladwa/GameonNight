import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, Download, CheckCircle2, Lock, Sparkles, RefreshCw, FileText, UserCheck, Calendar } from 'lucide-react';
import confetti from 'canvas-confetti';
import { jsPDF } from 'jspdf';
import { useEvent } from '../context/EventContext';

export default function CertificateGenerator({ isPostUnlocked, hasCompletedFeedback, setHasCompletedFeedback }) {
  const { config } = useEvent();
  const [participantName, setParticipantName] = useState('');
  const [collegeName, setCollegeName] = useState('');
  const [certificateId, setCertificateId] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [hasGenerated, setHasGenerated] = useState(false);
  const canvasRef = useRef(null);

  // Get dynamic current day's date or custom config date
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

  // Generate unique Certificate ID on mount
  useEffect(() => {
    const randomHex = Math.floor(100000 + Math.random() * 900000);
    setCertificateId(`GSA-GPA-2026-${randomHex}`);
  }, []);

  // Redraw canvas whenever name, college, or date changes
  useEffect(() => {
    renderCertificate();
  }, [participantName, collegeName, currentDate, certificateId]);

  const renderCertificate = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // High resolution canvas for sharp printing & PDF export
    const width = 1920;
    const height = 1080;
    canvas.width = width;
    canvas.height = height;

    // Check if background template exists, otherwise render crisp vector certificate
    const templateImg = new Image();
    templateImg.crossOrigin = 'anonymous';
    templateImg.src = '/certificate-template.png';

    const drawCustomVectorCertificate = () => {
      // 1. Background Fill
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, 0, width, height);

      // Subtle ambient background pattern
      ctx.fillStyle = '#FAF8FC';
      ctx.fillRect(40, 40, width - 80, height - 80);

      // 2. Double Border with Google / Lavender Accent
      ctx.strokeStyle = '#8B78B8';
      ctx.lineWidth = 14;
      ctx.strokeRect(50, 50, width - 100, height - 100);

      ctx.strokeStyle = '#A8BFA5';
      ctx.lineWidth = 3;
      ctx.strokeRect(70, 70, width - 140, height - 140);

      // Corner Accents
      const drawCorner = (x, y) => {
        ctx.fillStyle = '#8B78B8';
        ctx.beginPath();
        ctx.arc(x, y, 12, 0, Math.PI * 2);
        ctx.fill();
      };
      drawCorner(70, 70);
      drawCorner(width - 70, 70);
      drawCorner(70, height - 70);
      drawCorner(width - 70, height - 70);

      // 3. Header: Google Student Ambassador Branding
      ctx.textAlign = 'center';

      // Google 4-Color Accent Bar
      const barY = 120;
      const barW = 320;
      const barH = 6;
      const colors = ['#4285F4', '#EA4335', '#FBBC05', '#34A853'];
      colors.forEach((c, i) => {
        ctx.fillStyle = c;
        ctx.fillRect((width / 2) - (barW / 2) + (i * (barW / 4)), barY, barW / 4, barH);
      });

      ctx.font = 'bold 26px "Plus Jakarta Sans", sans-serif';
      ctx.fillStyle = '#777780';
      ctx.letterSpacing = '6px';
      ctx.fillText('GOOGLE STUDENT AMBASSADOR PROGRAM', width / 2, 175);

      // Event Main Title
      ctx.font = '900 68px "Space Grotesk", sans-serif';
      ctx.fillStyle = '#34343B';
      ctx.letterSpacing = '2px';
      ctx.fillText('CERTIFICATE OF PARTICIPATION', width / 2, 260);

      // Event Category Subtitle
      ctx.font = '600 24px "Plus Jakarta Sans", sans-serif';
      ctx.fillStyle = '#8B78B8';
      ctx.letterSpacing = '4px';
      ctx.fillText('GOOGLE PLAY ARENA • GAME ON NIGHT', width / 2, 305);

      ctx.font = 'italic 20px "Plus Jakarta Sans", sans-serif';
      ctx.fillStyle = '#777780';
      ctx.fillText('AI-Powered Game Ideathon • Imagine It. Design It. Pitch It.', width / 2, 335);

      // 4. "This is proudly presented to"
      ctx.font = '500 22px "Plus Jakarta Sans", sans-serif';
      ctx.fillStyle = '#777780';
      ctx.letterSpacing = '1px';
      ctx.fillText('This is proudly presented to', width / 2, 410);

      // 5. Participant Name (Dynamic & Prominent)
      const displayName = participantName.trim() || 'Your Name Here';
      ctx.font = 'bold 74px "Playfair Display", "Georgia", serif';
      ctx.fillStyle = '#8B78B8';
      ctx.letterSpacing = '1px';
      ctx.fillText(displayName, width / 2, 500);

      // Decorative Underline under name
      ctx.strokeStyle = '#F5D6C6';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(width / 2 - 280, 525);
      ctx.lineTo(width / 2 + 280, 525);
      ctx.stroke();

      // College name if provided
      if (collegeName.trim()) {
        ctx.font = '600 22px "Plus Jakarta Sans", sans-serif';
        ctx.fillStyle = '#555560';
        ctx.fillText(collegeName.trim(), width / 2, 565);
      }

      // 6. Citation Statement
      ctx.font = '400 22px "Plus Jakarta Sans", sans-serif';
      ctx.fillStyle = '#555560';
      const startTextY = collegeName.trim() ? 615 : 595;
      ctx.fillText('For active and creative participation in the AI-Powered Game Ideathon,', width / 2, startTextY);
      ctx.fillText('inventing an original game concept with Google Gemini, crafting its visual poster with Nano Banana,', width / 2, startTextY + 32);
      ctx.fillText('and pitching it during the live Google Meet Game On Night session.', width / 2, startTextY + 64);

      // 7. Footer: Signatures & Date
      const footerY = 880;

      // Left Column: Date (DYNAMIC CURRENT DAY'S DATE)
      ctx.textAlign = 'left';
      ctx.font = 'bold 24px "Plus Jakarta Sans", sans-serif';
      ctx.fillStyle = '#34343B';
      ctx.fillText(currentDate, 220, footerY);

      ctx.strokeStyle = '#EAE7ED';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(220, footerY + 12);
      ctx.lineTo(500, footerY + 12);
      ctx.stroke();

      ctx.font = '500 16px "Plus Jakarta Sans", sans-serif';
      ctx.fillStyle = '#777780';
      ctx.fillText('DATE OF ISSUE', 220, footerY + 38);

      // Center Column: Official GSA Verification Seal
      ctx.textAlign = 'center';
      ctx.fillStyle = '#F7F4FA';
      ctx.beginPath();
      ctx.arc(width / 2, footerY - 10, 55, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#8B78B8';
      ctx.lineWidth = 3;
      ctx.stroke();

      ctx.font = 'bold 13px "JetBrains Mono", monospace';
      ctx.fillStyle = '#8B78B8';
      ctx.fillText('OFFICIAL GSA', width / 2, footerY - 20);
      ctx.fillText('VERIFIED', width / 2, footerY);
      ctx.fillText('★ 2026 ★', width / 2, footerY + 20);

      // Right Column: Organizer Signature
      ctx.textAlign = 'right';
      ctx.font = 'italic bold 28px "Georgia", serif';
      ctx.fillStyle = '#34343B';
      ctx.fillText('Riya P Ladwa', width - 220, footerY);

      ctx.strokeStyle = '#EAE7ED';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(width - 500, footerY + 12);
      ctx.lineTo(width - 220, footerY + 12);
      ctx.stroke();

      ctx.font = '600 16px "Plus Jakarta Sans", sans-serif';
      ctx.fillStyle = '#8B78B8';
      ctx.fillText('Google Student Ambassador', width - 220, footerY + 38);
      ctx.font = '400 14px "Plus Jakarta Sans", sans-serif';
      ctx.fillStyle = '#777780';
      ctx.fillText('Campus Lead & Event Organizer', width - 220, footerY + 58);

      // Bottom Bar: Verification ID
      ctx.textAlign = 'center';
      ctx.font = '12px "JetBrains Mono", monospace';
      ctx.fillStyle = '#A0A0A8';
      ctx.fillText(`Certificate ID: ${certificateId} • Verified Digital Credential`, width / 2, height - 70);
    };

    templateImg.onload = () => {
      // Draw background image
      ctx.drawImage(templateImg, 0, 0, width, height);

      // Overlay Dynamic Participant Name
      const displayName = participantName.trim() || 'Your Name Here';
      ctx.textAlign = 'center';
      ctx.font = 'bold 64px "Playfair Display", "Georgia", serif';
      ctx.fillStyle = '#2A2A32';
      ctx.fillText(displayName, width / 2, height * 0.46);

      // Dynamic Date stamped on template
      ctx.textAlign = 'left';
      ctx.font = 'bold 22px "Plus Jakarta Sans", sans-serif';
      ctx.fillStyle = '#34343B';
      ctx.fillText(currentDate, width * 0.18, height * 0.84);

      // Verification ID
      ctx.textAlign = 'center';
      ctx.font = '13px "JetBrains Mono", monospace';
      ctx.fillStyle = '#555560';
      ctx.fillText(`Certificate ID: ${certificateId}`, width / 2, height * 0.94);
    };

    templateImg.onerror = () => {
      // If template image is not present or fails to load, render clean vector certificate
      drawCustomVectorCertificate();
    };
  };

  const handleDownloadPNG = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    setIsGenerating(true);

    const safeName = (participantName.trim() || 'Participant').replace(/[^a-zA-Z0-9]/g, '_');
    const imageURL = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = `Google_Play_Arena_Certificate_${safeName}.png`;
    link.href = imageURL;
    link.click();

    triggerConfetti();
    setIsGenerating(false);
    setHasGenerated(true);
  };

  const handleDownloadPDF = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    setIsGenerating(true);

    const safeName = (participantName.trim() || 'Participant').replace(/[^a-zA-Z0-9]/g, '_');
    const imgData = canvas.toDataURL('image/png', 1.0);

    // Landscape A4 PDF: 297mm x 210mm
    const pdf = new jsPDF({
      orientation: 'landscape',
      unit: 'mm',
      format: 'a4',
    });

    pdf.addImage(imgData, 'PNG', 0, 0, 297, 210, undefined, 'FAST');
    pdf.save(`Google_Play_Arena_Certificate_${safeName}.pdf`);

    triggerConfetti();
    setIsGenerating(false);
    setHasGenerated(true);
  };

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#8B78B8', '#A8BFA5', '#F5D6C6', '#4285F4'],
      });
    } catch (e) {
      // Fallback safe
    }
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
            <div className="flex items-center gap-2">
              <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold ${
                isPostUnlocked
                  ? 'bg-brand-sage-light text-[#4E6B4A] border border-brand-sage'
                  : 'bg-brand-peach-light text-[#A6634E] border border-brand-peach'
              }`}>
                {isPostUnlocked ? (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5 text-brand-sage" />
                    <span>Unlocked • Ready to Generate</span>
                  </>
                ) : (
                  <>
                    <Lock className="w-3.5 h-3.5 text-[#A6634E]" />
                    <span>Unlocks After Google Meet Session</span>
                  </>
                )}
              </span>
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8">
          {!isPostUnlocked ? (
            /* LOCKED STATE VIEW */
            <div className="text-center py-8 max-w-lg mx-auto">
              <div className="w-16 h-16 mx-auto rounded-2xl bg-brand-alt border border-brand-border flex items-center justify-center text-brand-muted mb-4 shadow-soft-xs">
                <Lock className="w-8 h-8 text-brand-lavender/70" />
              </div>
              <h4 className="font-display font-bold text-lg text-brand-text mb-2">
                Certificate Generation Opens After Google Meet
              </h4>
              <p className="text-xs text-brand-muted leading-relaxed mb-6">
                To receive your verified Google Student Ambassador Certificate:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-left mb-6">
                <div className="p-3.5 rounded-xl bg-brand-alt border border-brand-border">
                  <span className="text-[10px] font-mono font-bold text-brand-lavender block mb-1">STEP 1</span>
                  <p className="text-xs font-semibold text-brand-text">Complete Pre-Survey</p>
                  <p className="text-[11px] text-brand-muted mt-0.5">Registers your attendance</p>
                </div>
                <div className="p-3.5 rounded-xl bg-brand-alt border border-brand-border">
                  <span className="text-[10px] font-mono font-bold text-brand-sage block mb-1">STEP 2</span>
                  <p className="text-xs font-semibold text-brand-text">Pitch in Google Meet</p>
                  <p className="text-[11px] text-brand-muted mt-0.5">60s concept pitch</p>
                </div>
                <div className="p-3.5 rounded-xl bg-brand-alt border border-brand-border">
                  <span className="text-[10px] font-mono font-bold text-[#A6634E] block mb-1">STEP 3</span>
                  <p className="text-xs font-semibold text-brand-text">Submit Feedback</p>
                  <p className="text-[11px] text-brand-muted mt-0.5">Unlocks certificate</p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-brand-lavender-light/60 border border-brand-lavender/30 flex items-center justify-center gap-2 text-xs text-brand-lavender font-mono font-semibold">
                <Calendar className="w-4 h-4" />
                <span>Certificate will be stamped with the live date: {currentDate}</span>
              </div>
            </div>
          ) : (
            /* UNLOCKED GENERATOR VIEW */
            <div className="space-y-6">
              
              {/* Feedback Confirmation Banner */}
              <div className="p-4 rounded-2xl bg-brand-peach-light/50 border border-brand-peach/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <FileText className="w-5 h-5 text-[#8C5542] shrink-0" />
                  <div className="text-xs">
                    <span className="font-bold text-[#8C5542] block">Requirement: Complete Feedback Form First</span>
                    <span className="text-brand-muted">
                      Please make sure you have filled the official Google Feedback Form before generating your certificate.
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => setHasCompletedFeedback(!hasCompletedFeedback)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold flex items-center gap-1.5 transition-colors shrink-0 ${
                    hasCompletedFeedback 
                      ? 'bg-brand-sage text-white' 
                      : 'bg-white border border-brand-border text-brand-text hover:border-brand-peach'
                  }`}
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{hasCompletedFeedback ? 'Feedback Completed ✓' : 'I Have Filled Feedback'}</span>
                </button>
              </div>

              {/* Form Input Section */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-brand-text font-semibold mb-1.5">
                    Your Full Name (Appears on Certificate) *
                  </label>
                  <input
                    type="text"
                    value={participantName}
                    onChange={(e) => setParticipantName(e.target.value)}
                    placeholder="e.g. Jane Doe"
                    className="w-full px-4 py-3 rounded-xl bg-brand-alt border border-brand-border text-brand-text text-sm font-sans focus:border-brand-lavender focus:bg-white focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-brand-text font-semibold mb-1.5">
                    College / Institution (Optional)
                  </label>
                  <input
                    type="text"
                    value={collegeName}
                    onChange={(e) => setCollegeName(e.target.value)}
                    placeholder="e.g. University School of Engineering"
                    className="w-full px-4 py-3 rounded-xl bg-brand-alt border border-brand-border text-brand-text text-sm font-sans focus:border-brand-lavender focus:bg-white focus:outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Certificate Date & Info Bar */}
              <div className="flex flex-wrap items-center justify-between text-xs font-mono text-brand-muted gap-2 py-1 border-y border-brand-border">
                <span className="flex items-center gap-1.5 text-brand-lavender font-semibold">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Current Issue Date: {currentDate}</span>
                </span>
                <span className="text-[11px]">
                  Credential ID: <strong className="text-brand-text">{certificateId}</strong>
                </span>
              </div>

              {/* Live Canvas Preview */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-mono text-brand-muted uppercase tracking-wider font-semibold">
                    Live Certificate Preview
                  </span>
                  <span className="text-[10px] font-mono text-brand-sage font-bold flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    <span>Real-time rendering</span>
                  </span>
                </div>

                <div className="relative rounded-2xl border border-brand-border overflow-hidden bg-brand-alt shadow-soft-sm">
                  <canvas 
                    ref={canvasRef} 
                    className="w-full h-auto block"
                    style={{ aspectRatio: '16/9' }}
                  />
                </div>
              </div>

              {/* Download Action Buttons */}
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
                  <span>Download Official Certificate (PDF)</span>
                </button>
              </div>

              {!participantName.trim() && (
                <p className="text-[11px] font-mono text-center text-brand-muted">
                  Type your name above to enable certificate download.
                </p>
              )}

              {hasGenerated && (
                <div className="p-3 rounded-xl bg-brand-sage-light border border-brand-sage text-[#4E6B4A] text-xs font-mono text-center flex items-center justify-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-brand-sage" />
                  <span>Certificate successfully generated and downloaded! Congratulations!</span>
                </div>
              )}

            </div>
          )}
        </div>

      </div>

    </div>
  );
}
