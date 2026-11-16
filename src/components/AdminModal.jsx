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
    POST_SURVEY_UNLOCKED: false,
    CERTIFICATE_DATE: '',
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
        POST_SURVEY_UNLOCKED: Boolean(config.POST_SURVEY_UNLOCKED),
        CERTIFICATE_DATE: config.CERTIFICATE_DATE || '',
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
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/35 backdrop-blur-sm">
        
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
          className="relative w-full max-w-2xl max-h-[90vh] bg-white border border-brand-border rounded-2xl shadow-soft-lg overflow-hidden flex flex-col z-10"
        >
          {/* Top Bar */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-brand-border bg-brand-alt">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-brand-lavender-light border border-brand-lavender/30 flex items-center justify-center text-brand-lavender">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-display font-bold text-sm text-brand-text">
                  Event Administration Panel
                </h3>
                <div className="flex items-center gap-2 text-[10px] font-mono text-brand-muted">
                  <span className={`w-1.5 h-1.5 rounded-full ${isLiveDb ? 'bg-brand-sage' : 'bg-[#D98A6C]'}`} />
                  <span>{isLiveDb ? 'Connected to MongoDB' : 'Local Fallback Mode'}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {adminToken && (
                <button
                  onClick={logoutAdmin}
                  className="px-2.5 py-1 text-[11px] font-mono text-[#A6634E] hover:text-[#8C5542] bg-brand-peach-light border border-brand-peach/80 rounded-lg flex items-center gap-1 transition-colors"
                >
                  <LogOut className="w-3 h-3" />
                  <span>Logout</span>
                </button>
              )}
              <button
                onClick={() => setIsAdminModalOpen(false)}
                className="p-1.5 text-brand-muted hover:text-brand-text rounded-lg hover:bg-brand-alt transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Modal Content */}
          <div className="p-6 overflow-y-auto flex-1 bg-white">
            {!adminToken ? (
              /* LOGIN VIEW */
              <div className="max-w-sm mx-auto py-6">
                <div className="text-center mb-6">
                  <div className="w-12 h-12 mx-auto rounded-xl bg-brand-lavender-light border border-brand-lavender/30 flex items-center justify-center text-brand-lavender mb-3 shadow-soft-xs">
                    <Lock className="w-6 h-6" />
                  </div>
                  <h4 className="font-display font-extrabold text-base text-brand-text">
                    Administrator Authentication
                  </h4>
                  <p className="text-xs text-brand-muted mt-1">
                    Enter your credentials to update live event details, URLs, and schedules.
                  </p>
                </div>

                {loginError && (
                  <div className="p-3 mb-4 rounded-xl bg-brand-peach-light border border-brand-peach text-[#A6634E] text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{loginError}</span>
                  </div>
                )}

                <form onSubmit={handleLogin} className="space-y-4">
                  <div>
                    <label className="block text-xs font-mono text-brand-text font-medium mb-1">
                      Username
                    </label>
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-brand-alt border border-brand-border text-brand-text text-xs font-mono focus:border-brand-lavender focus:bg-white focus:outline-none transition-colors"
                      placeholder="admin"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-brand-text font-medium mb-1">
                      Password
                    </label>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-brand-alt border border-brand-border text-brand-text text-xs font-mono focus:border-brand-lavender focus:bg-white focus:outline-none transition-colors"
                      placeholder="••••••••"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isLoggingIn}
                    className="w-full py-2.5 rounded-xl text-xs font-bold font-display uppercase tracking-wider btn-primary flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {isLoggingIn ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Lock className="w-3.5 h-3.5" />}
                    <span>{isLoggingIn ? 'Authenticating...' : 'Sign In as Admin'}</span>
                  </button>
                </form>
              </div>
            ) : (
              /* ADMIN DASHBOARD VIEW */
              <form onSubmit={handleSave} className="space-y-6">
                
                {/* Tabs */}
                <div className="flex items-center gap-1 border-b border-brand-border pb-2">
                  <button
                    type="button"
                    onClick={() => setActiveTab('schedule')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-colors ${
                      activeTab === 'schedule'
                        ? 'bg-brand-lavender-light text-brand-lavender border border-brand-lavender/30 font-semibold'
                        : 'text-brand-muted hover:text-brand-text'
                    }`}
                  >
                    1. Schedule & Venue
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('links')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-colors ${
                      activeTab === 'links'
                        ? 'bg-brand-lavender-light text-brand-lavender border border-brand-lavender/30 font-semibold'
                        : 'text-brand-muted hover:text-brand-text'
                    }`}
                  >
                    2. Official URLs
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('identity')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-colors ${
                      activeTab === 'identity'
                        ? 'bg-brand-lavender-light text-brand-lavender border border-brand-lavender/30 font-semibold'
                        : 'text-brand-muted hover:text-brand-text'
                    }`}
                  >
                    3. Identity & Host
                  </button>
                </div>

                {saveStatus && (
                  <div className={`p-3 rounded-xl text-xs flex items-center gap-2 ${
                    saveStatus.type === 'success' 
                      ? 'bg-brand-sage-light border border-brand-sage text-[#4E6B4A]' 
                      : 'bg-brand-peach-light border border-brand-peach text-[#A6634E]'
                  }`}>
                    {saveStatus.type === 'success' ? <CheckCircle2 className="w-4 h-4 shrink-0 text-brand-sage" /> : <AlertCircle className="w-4 h-4 shrink-0" />}
                    <span>{saveStatus.message}</span>
                  </div>
                )}

                {/* TAB 1: SCHEDULE & VENUE */}
                {activeTab === 'schedule' && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-mono text-brand-text font-medium mb-1">
                          Event Date (Shown when confirmed)
                        </label>
                        <input
                          type="text"
                          value={formData.EVENT_DATE}
                          onChange={(e) => setFormData({ ...formData, EVENT_DATE: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl bg-brand-alt border border-brand-border text-brand-text text-xs font-mono focus:border-brand-lavender focus:bg-white focus:outline-none transition-colors"
                          placeholder="e.g. Saturday, November 28, 2026"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-mono text-brand-text font-medium mb-1">
                          Event Time (Shown when confirmed)
                        </label>
                        <input
                          type="text"
                          value={formData.EVENT_TIME}
                          onChange={(e) => setFormData({ ...formData, EVENT_TIME: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl bg-brand-alt border border-brand-border text-brand-text text-xs font-mono focus:border-brand-lavender focus:bg-white focus:outline-none transition-colors"
                          placeholder="e.g. 6:00 PM – 8:00 PM IST"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-mono text-brand-text font-medium mb-1">
                          Event Mode
                        </label>
                        <input
                          type="text"
                          value={formData.EVENT_MODE}
                          onChange={(e) => setFormData({ ...formData, EVENT_MODE: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl bg-brand-alt border border-brand-border text-brand-text text-xs font-mono focus:border-brand-lavender focus:bg-white focus:outline-none transition-colors"
                          placeholder="Virtual / Online via Google Meet"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-mono text-brand-text font-medium mb-1">
                          Duration
                        </label>
                        <input
                          type="text"
                          value={formData.EVENT_DURATION}
                          onChange={(e) => setFormData({ ...formData, EVENT_DURATION: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl bg-brand-alt border border-brand-border text-brand-text text-xs font-mono focus:border-brand-lavender focus:bg-white focus:outline-none transition-colors"
                          placeholder="2 Hours (60s Pitch per participant)"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-brand-text font-medium mb-1">
                        Top Announcement Badge
                      </label>
                      <input
                        type="text"
                        value={formData.announcementBadge}
                        onChange={(e) => setFormData({ ...formData, announcementBadge: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-brand-alt border border-brand-border text-brand-text text-xs font-mono focus:border-brand-lavender focus:bg-white focus:outline-none transition-colors"
                        placeholder="FREE ENTRY • NATIONAL PIXEL CHANCE • OFFICIAL CERTIFICATES"
                      />
                    </div>
                  </div>
                )}

                {/* TAB 2: OFFICIAL URLS & SURVEY STATUS */}
                {activeTab === 'links' && (
                  <div className="space-y-4">
                    {/* POST-SURVEY & CERTIFICATE UNLOCK CONTROL */}
                    <div className="p-4 rounded-xl border border-brand-border bg-brand-alt/80">
                      <div className="flex items-center justify-between mb-2">
                        <label className="text-xs font-mono font-bold text-brand-text flex items-center gap-1.5">
                          <Lock className="w-3.5 h-3.5 text-brand-lavender" />
                          <span>Post-Survey & Certificate Access Status</span>
                        </label>
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                          formData.POST_SURVEY_UNLOCKED
                            ? 'bg-brand-sage text-white'
                            : 'bg-brand-peach-light text-[#A6634E] border border-brand-peach'
                        }`}>
                          {formData.POST_SURVEY_UNLOCKED ? 'UNLOCKED (Session Ended)' : 'LOCKED (Pre-Session)'}
                        </span>
                      </div>
                      
                      <p className="text-xs text-brand-muted mb-3">
                        {formData.POST_SURVEY_UNLOCKED
                          ? 'Post-Survey and Certificate Generator are currently OPEN for participants to submit feedback and generate their certificate.'
                          : 'Only Pre-Survey is currently enabled for visitors. Once the live Google Meet session finishes, click "Unlock Post-Survey" below.'}
                      </p>

                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, POST_SURVEY_UNLOCKED: !formData.POST_SURVEY_UNLOCKED })}
                        className={`w-full py-2 px-3 rounded-lg text-xs font-mono font-bold flex items-center justify-center gap-2 transition-all ${
                          formData.POST_SURVEY_UNLOCKED
                            ? 'bg-white border border-brand-border text-brand-text hover:bg-brand-peach-light hover:text-[#A6634E]'
                            : 'btn-peach text-[#8C5542] font-black shadow-soft-xs'
                        }`}
                      >
                        {formData.POST_SURVEY_UNLOCKED ? (
                          <>
                            <Lock className="w-3.5 h-3.5" />
                            <span>Click to Lock Post-Survey Again</span>
                          </>
                        ) : (
                          <>
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#8C5542]" />
                            <span>Unlock Post-Survey & Certificate Now</span>
                          </>
                        )}
                      </button>
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-brand-text font-medium mb-1">
                        Certificate Issue Date (Optional)
                      </label>
                      <input
                        type="text"
                        value={formData.CERTIFICATE_DATE}
                        onChange={(e) => setFormData({ ...formData, CERTIFICATE_DATE: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-brand-alt border border-brand-border text-brand-text text-xs font-mono focus:border-brand-lavender focus:bg-white focus:outline-none transition-colors"
                        placeholder="Leave empty for dynamic current day's date (e.g. November 15, 2026)"
                      />
                      <span className="text-[10px] text-brand-muted mt-0.5 block">
                        If left blank, certificates are automatically stamped with the participant's current day date.
                      </span>
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-brand-text font-medium mb-1">
                        Official Google Meet URL (Leave empty if unannounced)
                      </label>
                      <input
                        type="url"
                        value={formData.GOOGLE_MEET_URL}
                        onChange={(e) => setFormData({ ...formData, GOOGLE_MEET_URL: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-brand-alt border border-brand-border text-brand-text text-xs font-mono focus:border-brand-lavender focus:bg-white focus:outline-none transition-colors"
                        placeholder="https://meet.google.com/xyz-abcd-efg"
                      />
                      <span className="text-[10px] text-brand-muted mt-0.5 block">
                        If left blank, "Join Meet" buttons safely show "Announced soon".
                      </span>
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-brand-text font-medium mb-1">
                        Pre-Event Survey URL (Mandatory before Meet)
                      </label>
                      <input
                        type="url"
                        value={formData.PRE_SURVEY_URL}
                        onChange={(e) => setFormData({ ...formData, PRE_SURVEY_URL: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-brand-alt border border-brand-border text-brand-text text-xs font-mono focus:border-brand-lavender focus:bg-white focus:outline-none transition-colors"
                        placeholder="https://producttrialsurvey.geministudentambassador.com/"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-brand-text font-medium mb-1">
                        Post-Event Feedback & Submission Form URL
                      </label>
                      <input
                        type="url"
                        value={formData.POST_SURVEY_URL}
                        onChange={(e) => setFormData({ ...formData, POST_SURVEY_URL: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-brand-alt border border-brand-border text-brand-text text-xs font-mono focus:border-brand-lavender focus:bg-white focus:outline-none transition-colors"
                        placeholder="https://producttrialfeedback.geministudentambassador.com/"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-brand-text font-medium mb-1">
                        Event Guidelines Document URL (Optional)
                      </label>
                      <input
                        type="url"
                        value={formData.EVENT_GUIDELINES_URL}
                        onChange={(e) => setFormData({ ...formData, EVENT_GUIDELINES_URL: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-brand-alt border border-brand-border text-brand-text text-xs font-mono focus:border-brand-lavender focus:bg-white focus:outline-none transition-colors"
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
                        <label className="block text-xs font-mono text-brand-text font-medium mb-1">
                          Event Name
                        </label>
                        <input
                          type="text"
                          value={formData.EVENT_NAME}
                          onChange={(e) => setFormData({ ...formData, EVENT_NAME: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl bg-brand-alt border border-brand-border text-brand-text text-xs font-mono focus:border-brand-lavender focus:bg-white focus:outline-none transition-colors"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-mono text-brand-text font-medium mb-1">
                          Event Title
                        </label>
                        <input
                          type="text"
                          value={formData.EVENT_TITLE}
                          onChange={(e) => setFormData({ ...formData, EVENT_TITLE: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl bg-brand-alt border border-brand-border text-brand-text text-xs font-mono focus:border-brand-lavender focus:bg-white focus:outline-none transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-brand-text font-medium mb-1">
                        Tagline
                      </label>
                      <input
                        type="text"
                        value={formData.TAGLINE}
                        onChange={(e) => setFormData({ ...formData, TAGLINE: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-brand-alt border border-brand-border text-brand-text text-xs font-mono focus:border-brand-lavender focus:bg-white focus:outline-none transition-colors"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-mono text-brand-text font-medium mb-1">
                          Host Name
                        </label>
                        <input
                          type="text"
                          value={formData.HOST_NAME}
                          onChange={(e) => setFormData({ ...formData, HOST_NAME: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl bg-brand-alt border border-brand-border text-brand-text text-xs font-mono focus:border-brand-lavender focus:bg-white focus:outline-none transition-colors"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-mono text-brand-text font-medium mb-1">
                          Host Contact Email (Optional)
                        </label>
                        <input
                          type="email"
                          value={formData.HOST_CONTACT}
                          onChange={(e) => setFormData({ ...formData, HOST_CONTACT: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl bg-brand-alt border border-brand-border text-brand-text text-xs font-mono focus:border-brand-lavender focus:bg-white focus:outline-none transition-colors"
                          placeholder="gsa.lead@college.edu"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Submit Bar */}
                <div className="flex items-center justify-between pt-4 border-t border-brand-border">
                  <span className="text-[11px] font-mono text-brand-muted">
                    Saves directly to MongoDB collection <code className="text-brand-lavender font-semibold">event_config</code>
                  </span>
                  <button
                    type="submit"
                    disabled={isSaving}
                    className="px-5 py-2.5 rounded-xl text-xs font-bold font-display uppercase tracking-wider btn-primary flex items-center gap-2 disabled:opacity-50"
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
