import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Lock, 
  ShieldCheck, 
  Database, 
  Save, 
  LogOut, 
  CheckCircle2, 
  AlertCircle, 
  Calendar, 
  Link as LinkIcon, 
  Layers, 
  Sparkles,
  RefreshCw
} from 'lucide-react';
import { useEvent } from '../context/EventContext';

export default function AdminModal() {
  const { 
    config, 
    isLiveDb, 
    adminToken, 
    adminUser, 
    isAdminModalOpen, 
    setIsAdminModalOpen, 
    loginAdmin, 
    logoutAdmin, 
    updateConfig,
    refreshConfig
  } = useEvent();

  const [activeTab, setActiveTab] = useState('schedule');
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [saveStatus, setSaveStatus] = useState(null); // { type: 'success' | 'error', message: '' }
  const [isSaving, setIsSaving] = useState(false);

  // Form state initialized with current config
  const [formData, setFormData] = useState({
    EVENT_DATE: '',
    EVENT_TIME: '',
    EVENT_MODE: '',
    EVENT_DURATION: '',
    GOOGLE_MEET_URL: '',
    PRE_SURVEY_URL: '',
    POST_SURVEY_URL: '',
    EVENT_GUIDELINES_URL: '',
    EVENT_NAME: '',
    EVENT_TITLE: '',
    TAGLINE: '',
    HOST_NAME: '',
    HOST_CONTACT: '',
    announcementBadge: '',
    nationalPixelPrizeNote: '',
  });

  // Sync form data when config changes or modal opens
  useEffect(() => {
    if (config) {
      setFormData({
        EVENT_DATE: config.EVENT_DATE || '',
        EVENT_TIME: config.EVENT_TIME || '',
        EVENT_MODE: config.EVENT_MODE || 'Virtual / Online via Google Meet',
        EVENT_DURATION: config.EVENT_DURATION || '2 Hours (60s Pitch per participant)',
        GOOGLE_MEET_URL: config.GOOGLE_MEET_URL || '',
        PRE_SURVEY_URL: config.PRE_SURVEY_URL || '',
        POST_SURVEY_URL: config.POST_SURVEY_URL || '',
        EVENT_GUIDELINES_URL: config.EVENT_GUIDELINES_URL || '',
        EVENT_NAME: config.EVENT_NAME || 'GOOGLE PLAY ARENA',
        EVENT_TITLE: config.EVENT_TITLE || 'GAME ON NIGHT',
        TAGLINE: config.TAGLINE || 'IMAGINE IT. DESIGN IT. PITCH IT.',
        HOST_NAME: config.HOST_NAME || 'Google Student Ambassador',
        HOST_CONTACT: config.HOST_CONTACT || '',
        announcementBadge: config.ADDITIONAL_EVENT_INFORMATION?.announcementBadge || '',
        nationalPixelPrizeNote: config.CERTIFICATE_INFORMATION?.nationalPixelPrizeNote || '',
      });
    }
  }, [config, isAdminModalOpen]);

  // Check URL query param ?admin=true on mount or keyboard shortcut
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('admin') === 'true') {
      setIsAdminModalOpen(true);
    }

    const handleKeyDown = (e) => {
      // Press Ctrl+Shift+A or Cmd+Shift+A to toggle admin modal
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === 'a') {
        e.preventDefault();
        setIsAdminModalOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setIsAdminModalOpen]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError('');
    setIsLoggingIn(true);
    const res = await loginAdmin(username, password);
    setIsLoggingIn(false);
    if (!res.success) {
      setLoginError(res.error || 'Authentication failed');
    } else {
      setPassword('');
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    setSaveStatus(null);

    const updatedConfig = {
      ...formData,
      CERTIFICATE_INFORMATION: {
        ...config.CERTIFICATE_INFORMATION,
        nationalPixelPrizeNote: formData.nationalPixelPrizeNote,
      },
      ADDITIONAL_EVENT_INFORMATION: {
        ...config.ADDITIONAL_EVENT_INFORMATION,
        announcementBadge: formData.announcementBadge,
      }
    };

    const res = await updateConfig(updatedConfig);
    setIsSaving(false);
    if (res.success) {
      setSaveStatus({ type: 'success', message: 'Event details saved and updated successfully in MongoDB!' });
      setTimeout(() => setSaveStatus(null), 4000);
    } else {
      setSaveStatus({ type: 'error', message: res.error || 'Failed to save configuration.' });
    }
  };

  if (!isAdminModalOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
        
        {/* Backdrop click to close */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0"
          onClick={() => setIsAdminModalOpen(false)}
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className="relative w-full max-w-2xl max-h-[90vh] bg-[#0c071d] border border-violet-500/30 rounded-2xl shadow-2xl overflow-hidden flex flex-col z-10"
        >
          {/* Top Bar */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-violet-900/40 bg-[#080414]">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-violet-950 border border-violet-700/50 flex items-center justify-center text-cyan-400">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-display font-bold text-sm text-white">
                  Event Administration Panel
                </h3>
                <div className="flex items-center gap-2 text-[10px] font-mono text-slate-400">
                  <span className={`w-1.5 h-1.5 rounded-full ${isLiveDb ? 'bg-emerald-400' : 'bg-amber-400'}`} />
                  <span>{isLiveDb ? 'Connected to MongoDB' : 'Local Fallback Mode'}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {adminToken && (
                <button
                  onClick={logoutAdmin}
                  className="px-2.5 py-1 text-[11px] font-mono text-rose-300 hover:text-rose-200 bg-rose-950/40 border border-rose-800/40 rounded-lg flex items-center gap-1"
                >
                  <LogOut className="w-3 h-3" />
                  <span>Logout</span>
                </button>
              )}
              <button
                onClick={() => setIsAdminModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-violet-900/40 transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Modal Content */}
          <div className="p-6 overflow-y-auto flex-1">
            {!adminToken ? (
              /* LOGIN VIEW */
              <div className="max-w-sm mx-auto py-6">
                <div className="text-center mb-6">
                  <div className="w-12 h-12 mx-auto rounded-xl bg-violet-900/30 border border-violet-500/40 flex items-center justify-center text-cyan-400 mb-3">
                    <Lock className="w-6 h-6" />
                  </div>
                  <h4 className="font-display font-extrabold text-base text-white">
                    Administrator Authentication
                  </h4>
                  <p className="text-xs text-slate-400 mt-1">
                    Enter your credentials to update live event details, URLs, and schedules.
                  </p>
                </div>

                {loginError && (
                  <div className="p-3 mb-4 rounded-xl bg-rose-950/50 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{loginError}</span>
                  </div>
                )}

                <form onSubmit={handleLogin} className="space-y-4">
                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1">
                      Username
                    </label>
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-violet-900/60 text-white text-xs font-mono focus:border-cyan-400 focus:outline-none"
                      placeholder="admin"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1">
                      Password
                    </label>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-violet-900/60 text-white text-xs font-mono focus:border-cyan-400 focus:outline-none"
                      placeholder="••••••••"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isLoggingIn}
                    className="w-full py-2.5 rounded-xl text-xs font-bold font-display uppercase tracking-wider btn-primary text-white flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {isLoggingIn ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Lock className="w-3.5 h-3.5" />}
                    <span>{isLoggingIn ? 'Authenticating...' : 'Sign In as Admin'}</span>
                  </button>

                  <p className="text-[10px] text-center font-mono text-slate-500 pt-2">
                    Default dev password: <code className="text-violet-300">gsa_admin_2026</code>
                  </p>
                </form>
              </div>
            ) : (
              /* ADMIN DASHBOARD VIEW */
              <form onSubmit={handleSave} className="space-y-6">
                
                {/* Tabs */}
                <div className="flex items-center gap-1 border-b border-violet-900/40 pb-2">
                  <button
                    type="button"
                    onClick={() => setActiveTab('schedule')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-colors ${
                      activeTab === 'schedule'
                        ? 'bg-violet-900/60 text-cyan-400 border border-violet-700/50'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    1. Schedule & Venue
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('links')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-colors ${
                      activeTab === 'links'
                        ? 'bg-violet-900/60 text-cyan-400 border border-violet-700/50'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    2. Official URLs
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('identity')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-colors ${
                      activeTab === 'identity'
                        ? 'bg-violet-900/60 text-cyan-400 border border-violet-700/50'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    3. Identity & Host
                  </button>
                </div>

                {saveStatus && (
                  <div className={`p-3 rounded-xl text-xs flex items-center gap-2 ${
                    saveStatus.type === 'success' 
                      ? 'bg-emerald-950/60 border border-emerald-500/40 text-emerald-300' 
                      : 'bg-rose-950/60 border border-rose-500/40 text-rose-300'
                  }`}>
                    {saveStatus.type === 'success' ? <CheckCircle2 className="w-4 h-4 shrink-0" /> : <AlertCircle className="w-4 h-4 shrink-0" />}
                    <span>{saveStatus.message}</span>
                  </div>
                )}

                {/* TAB 1: SCHEDULE & VENUE */}
                {activeTab === 'schedule' && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-mono text-slate-300 mb-1">
                          Event Date (Shown when confirmed)
                        </label>
                        <input
                          type="text"
                          value={formData.EVENT_DATE}
                          onChange={(e) => setFormData({ ...formData, EVENT_DATE: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl bg-black/50 border border-violet-900/60 text-white text-xs font-mono focus:border-cyan-400 focus:outline-none"
                          placeholder="e.g. Saturday, November 28, 2026"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-mono text-slate-300 mb-1">
                          Event Time (Shown when confirmed)
                        </label>
                        <input
                          type="text"
                          value={formData.EVENT_TIME}
                          onChange={(e) => setFormData({ ...formData, EVENT_TIME: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl bg-black/50 border border-violet-900/60 text-white text-xs font-mono focus:border-cyan-400 focus:outline-none"
                          placeholder="e.g. 6:00 PM – 8:00 PM IST"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-mono text-slate-300 mb-1">
                          Event Mode
                        </label>
                        <input
                          type="text"
                          value={formData.EVENT_MODE}
                          onChange={(e) => setFormData({ ...formData, EVENT_MODE: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl bg-black/50 border border-violet-900/60 text-white text-xs font-mono focus:border-cyan-400 focus:outline-none"
                          placeholder="Virtual / Online via Google Meet"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-mono text-slate-300 mb-1">
                          Duration
                        </label>
                        <input
                          type="text"
                          value={formData.EVENT_DURATION}
                          onChange={(e) => setFormData({ ...formData, EVENT_DURATION: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl bg-black/50 border border-violet-900/60 text-white text-xs font-mono focus:border-cyan-400 focus:outline-none"
                          placeholder="2 Hours (60s Pitch per participant)"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-slate-300 mb-1">
                        Top Announcement Badge
                      </label>
                      <input
                        type="text"
                        value={formData.announcementBadge}
                        onChange={(e) => setFormData({ ...formData, announcementBadge: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-black/50 border border-violet-900/60 text-white text-xs font-mono focus:border-cyan-400 focus:outline-none"
                        placeholder="FREE ENTRY • NATIONAL PIXEL CHANCE • OFFICIAL CERTIFICATES"
                      />
                    </div>
                  </div>
                )}

                {/* TAB 2: OFFICIAL URLS */}
                {activeTab === 'links' && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-mono text-slate-300 mb-1">
                        Official Google Meet URL (Leave empty if unannounced)
                      </label>
                      <input
                        type="url"
                        value={formData.GOOGLE_MEET_URL}
                        onChange={(e) => setFormData({ ...formData, GOOGLE_MEET_URL: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-black/50 border border-violet-900/60 text-white text-xs font-mono focus:border-cyan-400 focus:outline-none"
                        placeholder="https://meet.google.com/xyz-abcd-efg"
                      />
                      <span className="text-[10px] text-slate-400 mt-0.5 block">
                        If left blank, "Join Meet" buttons safely show "Announced soon".
                      </span>
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-slate-300 mb-1">
                        Pre-Event Survey URL (Mandatory before Meet)
                      </label>
                      <input
                        type="url"
                        value={formData.PRE_SURVEY_URL}
                        onChange={(e) => setFormData({ ...formData, PRE_SURVEY_URL: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-black/50 border border-violet-900/60 text-white text-xs font-mono focus:border-cyan-400 focus:outline-none"
                        placeholder="https://producttrialsurvey.geministudentambassador.com/"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-slate-300 mb-1">
                        Post-Event Feedback & Submission Form URL
                      </label>
                      <input
                        type="url"
                        value={formData.POST_SURVEY_URL}
                        onChange={(e) => setFormData({ ...formData, POST_SURVEY_URL: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-black/50 border border-violet-900/60 text-white text-xs font-mono focus:border-cyan-400 focus:outline-none"
                        placeholder="https://producttrialfeedback.geministudentambassador.com/"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-slate-300 mb-1">
                        Event Guidelines Document URL (Optional)
                      </label>
                      <input
                        type="url"
                        value={formData.EVENT_GUIDELINES_URL}
                        onChange={(e) => setFormData({ ...formData, EVENT_GUIDELINES_URL: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-black/50 border border-violet-900/60 text-white text-xs font-mono focus:border-cyan-400 focus:outline-none"
                        placeholder="https://docs.google.com/..."
                      />
                    </div>
                  </div>
                )}

                {/* TAB 3: IDENTITY & HOST */}
                {activeTab === 'identity' && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-mono text-slate-300 mb-1">
                          Event Name
                        </label>
                        <input
                          type="text"
                          value={formData.EVENT_NAME}
                          onChange={(e) => setFormData({ ...formData, EVENT_NAME: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl bg-black/50 border border-violet-900/60 text-white text-xs font-mono focus:border-cyan-400 focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-mono text-slate-300 mb-1">
                          Event Title
                        </label>
                        <input
                          type="text"
                          value={formData.EVENT_TITLE}
                          onChange={(e) => setFormData({ ...formData, EVENT_TITLE: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl bg-black/50 border border-violet-900/60 text-white text-xs font-mono focus:border-cyan-400 focus:outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-slate-300 mb-1">
                        Tagline
                      </label>
                      <input
                        type="text"
                        value={formData.TAGLINE}
                        onChange={(e) => setFormData({ ...formData, TAGLINE: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-black/50 border border-violet-900/60 text-white text-xs font-mono focus:border-cyan-400 focus:outline-none"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-mono text-slate-300 mb-1">
                          Host Name
                        </label>
                        <input
                          type="text"
                          value={formData.HOST_NAME}
                          onChange={(e) => setFormData({ ...formData, HOST_NAME: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl bg-black/50 border border-violet-900/60 text-white text-xs font-mono focus:border-cyan-400 focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-mono text-slate-300 mb-1">
                          Host Contact Email (Optional)
                        </label>
                        <input
                          type="email"
                          value={formData.HOST_CONTACT}
                          onChange={(e) => setFormData({ ...formData, HOST_CONTACT: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl bg-black/50 border border-violet-900/60 text-white text-xs font-mono focus:border-cyan-400 focus:outline-none"
                          placeholder="gsa.lead@college.edu"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Submit Bar */}
                <div className="flex items-center justify-between pt-4 border-t border-violet-900/40">
                  <span className="text-[11px] font-mono text-slate-400">
                    Saves directly to MongoDB collection <code className="text-cyan-400">event_config</code>
                  </span>
                  <button
                    type="submit"
                    disabled={isSaving}
                    className="px-5 py-2.5 rounded-xl text-xs font-bold font-display uppercase tracking-wider btn-primary text-white flex items-center gap-2 disabled:opacity-50"
                  >
                    {isSaving ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
                    <span>{isSaving ? 'Saving...' : 'Save Changes'}</span>
                  </button>
                </div>

              </form>
            )}
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
}
