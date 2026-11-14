import React from 'react';
import { Mail, Calendar, Lock } from 'lucide-react';
import { useEvent } from '../context/EventContext';

export default function Footer() {
  const { config, setIsAdminModalOpen, adminUser } = useEvent();

  const hasContact = Boolean(config.HOST_CONTACT && config.HOST_CONTACT.trim().length > 0);
  const hasDate = Boolean(config.EVENT_DATE && config.EVENT_DATE.trim().length > 0);

  return (
    <footer className="border-t border-violet-950/40 bg-[#04020a] py-10 text-slate-400">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          
          <div>
            <div className="font-display font-bold text-sm text-white tracking-wide">
              {config.EVENT_NAME || "GOOGLE PLAY ARENA"} – {config.EVENT_TITLE || "GAME ON NIGHT"}
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Hosted by {config.HOST_NAME || "Google Student Ambassador"}
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center sm:justify-end gap-4 text-xs font-mono text-slate-400">
            {hasDate && (
              <div className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                <span>{config.EVENT_DATE}</span>
              </div>
            )}
            {hasContact && (
              <div className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-violet-400" />
                <span>{config.HOST_CONTACT}</span>
              </div>
            )}
            
            {/* Discreet Admin Login Trigger */}
            <button
              onClick={() => setIsAdminModalOpen(true)}
              className="text-slate-500 hover:text-cyan-400 flex items-center gap-1 transition-colors"
              title="Organizer Admin Portal"
            >
              <Lock className="w-3 h-3" />
              <span>{adminUser ? 'Admin: ' + adminUser.username : 'Organizer Login'}</span>
            </button>

            <span>© {new Date().getFullYear()}</span>
          </div>

        </div>

      </div>
    </footer>
  );
}
