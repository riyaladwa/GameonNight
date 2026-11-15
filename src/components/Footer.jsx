import React from 'react';
import { Mail, Calendar, Lock } from 'lucide-react';
import { useEvent } from '../context/EventContext';

export default function Footer() {
  const { config, setIsAdminModalOpen, adminUser } = useEvent();

  const hasContact = Boolean(config.HOST_CONTACT && config.HOST_CONTACT.trim().length > 0);
  const hasDate = Boolean(config.EVENT_DATE && config.EVENT_DATE.trim().length > 0);

  return (
    <footer className="border-t border-brand-border bg-brand-alt py-10 text-brand-muted">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          
          <div>
            <div className="font-display font-bold text-sm text-brand-text tracking-wide">
              {config.EVENT_NAME || "GOOGLE PLAY ARENA"} – {config.EVENT_TITLE || "GAME ON NIGHT"}
            </div>
            <p className="text-xs text-brand-muted mt-0.5">
              Hosted by {config.HOST_NAME || "Google Student Ambassador"}
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center sm:justify-end gap-4 text-xs font-mono text-brand-muted">
            {hasDate && (
              <div className="flex items-center gap-1.5 text-brand-text">
                <Calendar className="w-3.5 h-3.5 text-brand-lavender" />
                <span>{config.EVENT_DATE}</span>
              </div>
            )}
            {hasContact && (
              <div className="flex items-center gap-1.5 text-brand-text">
                <Mail className="w-3.5 h-3.5 text-brand-sage" />
                <span>{config.HOST_CONTACT}</span>
              </div>
            )}
            
            {/* Discreet Admin Login Trigger */}
            <button
              onClick={() => setIsAdminModalOpen(true)}
              className="text-brand-muted hover:text-brand-lavender flex items-center gap-1 transition-colors"
              title="Organizer Admin Portal"
            >
              <Lock className="w-3 h-3 text-brand-lavender" />
              <span>{adminUser ? 'Admin: ' + adminUser.username : 'Organizer Login'}</span>
            </button>

            <span>© {new Date().getFullYear()}</span>
          </div>

        </div>

      </div>
    </footer>
  );
}
