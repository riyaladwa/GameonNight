import React from 'react';
import { Mail, Calendar, Lock, Shield, User, Award, ExternalLink } from 'lucide-react';
import { useEvent } from '../context/EventContext';

export default function Footer() {
  const { config, setIsAdminModalOpen, adminUser } = useEvent();

  const organizerEmail = config.HOST_CONTACT && config.HOST_CONTACT.trim().length > 0 
    ? config.HOST_CONTACT 
    : 'riyaladwa9@gmail.com';

  return (
    <footer className="border-t border-brand-border bg-brand-alt py-12 text-brand-muted">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        
        {/* OFFICIAL ORGANIZER CREDENTIALS SECTION */}
        <div className="mb-10 p-5 sm:p-6 rounded-2xl bg-white border border-brand-border shadow-soft-xs">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-brand-lavender-light border border-brand-lavender/30 flex items-center justify-center text-brand-lavender shrink-0 mt-0.5">
                <Shield className="w-5 h-5 text-brand-lavender" />
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase font-bold tracking-wider text-brand-lavender block mb-0.5">
                  EVENT LEAD & OFFICIAL ORGANIZER
                </span>
                <h4 className="font-display font-black text-base text-brand-text">
                  Riya P Ladwa
                </h4>
                <p className="text-xs text-brand-muted mt-0.5">
                  Google Student Ambassador | 2026 Semester 2
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 text-xs font-mono">
              {/* Ambassador GID Badge (Organizer Credentials Only) */}
              <div className="px-3 py-1.5 rounded-lg bg-brand-alt border border-brand-border flex items-center gap-1.5 text-brand-text">
                <span className="text-brand-muted">GID:</span>
                <span className="font-bold text-brand-lavender">16535</span>
              </div>

              {/* Official Contact Email */}
              <a
                href={`mailto:${organizerEmail}`}
                className="px-3 py-1.5 rounded-lg bg-brand-lavender-light border border-brand-lavender/30 text-brand-lavender hover:bg-brand-lavender/20 flex items-center gap-1.5 transition-colors font-medium"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>{organizerEmail}</span>
              </a>
            </div>

          </div>
        </div>

        {/* BOTTOM METADATA & ADMIN ACCESS */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left text-xs font-mono text-brand-muted pt-4 border-t border-brand-border/60">
          
          <div>
            <span className="font-display font-bold text-brand-text">
              {config.EVENT_NAME || "GOOGLE PLAY ARENA"}
            </span>
            <span className="mx-2">•</span>
            <span>Game On Night</span>
            <span className="mx-2">•</span>
            <span>AI-Powered Game Ideathon</span>
          </div>

          <div className="flex items-center gap-4">
            {/* Discreet Admin Login Trigger */}
            <button
              onClick={() => setIsAdminModalOpen(true)}
              className="text-brand-muted hover:text-brand-lavender flex items-center gap-1 transition-colors"
              title="Organizer Admin Portal (Ctrl + Shift + A)"
            >
              <Lock className="w-3 h-3 text-brand-lavender" />
              <span>{adminUser ? `Admin: ${adminUser.username}` : 'Organizer Portal'}</span>
            </button>

            <span>© {new Date().getFullYear()} GSA Program</span>
          </div>

        </div>

      </div>
    </footer>
  );
}