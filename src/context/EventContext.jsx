import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { EVENT_CONFIG } from '../config/eventConfig';

const EventContext = createContext(null);

export function EventProvider({ children }) {
  const [config, setConfig] = useState(EVENT_CONFIG);
  const [isLoading, setIsLoading] = useState(true);
  const [isLiveDb, setIsLiveDb] = useState(false);
  const [adminToken, setAdminToken] = useState(() => localStorage.getItem('gsa_admin_token') || null);
  const [adminUser, setAdminUser] = useState(null);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);

  // Fetch latest event config from backend API
  const fetchConfig = useCallback(async () => {
    try {
      const res = await fetch('/api/event-config');
      if (res.ok) {
        const data = await res.json();
        // Merge with defaults to ensure all fields are present
        setConfig(prev => ({
          ...prev,
          ...data,
          CERTIFICATE_INFORMATION: {
            ...prev.CERTIFICATE_INFORMATION,
            ...(data.CERTIFICATE_INFORMATION || data.certificate_info || {})
          },
          ADDITIONAL_EVENT_INFORMATION: {
            ...prev.ADDITIONAL_EVENT_INFORMATION,
            ...(data.ADDITIONAL_EVENT_INFORMATION || {})
          }
        }));
        setIsLiveDb(data._source === 'mongodb');
      }
    } catch (err) {
      console.warn('[EventContext] Could not reach backend API, using local configuration fallback.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Verify stored admin token on mount
  const verifyToken = useCallback(async (token) => {
    if (!token) return;
    try {
      const res = await fetch('/api/admin-auth', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        if (data.valid) {
          setAdminUser(data.user);
          return;
        }
      }
      // If token invalid, clean up
      localStorage.removeItem('gsa_admin_token');
      setAdminToken(null);
      setAdminUser(null);
    } catch (e) {
      console.warn('[EventContext] Auth verification error:', e.message);
    }
  }, []);

  useEffect(() => {
    fetchConfig();
    if (adminToken) {
      verifyToken(adminToken);
    }
  }, [fetchConfig, adminToken, verifyToken]);

  // Admin Login
  const loginAdmin = async (username, password) => {
    try {
      const res = await fetch('/api/admin-auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        localStorage.setItem('gsa_admin_token', data.token);
        setAdminToken(data.token);
        setAdminUser(data.user);
        return { success: true };
      }
      return { success: false, error: data.error || 'Authentication failed' };
    } catch (err) {
      return { success: false, error: 'Network error communicating with backend' };
    }
  };

  // Admin Logout
  const logoutAdmin = () => {
    localStorage.removeItem('gsa_admin_token');
    setAdminToken(null);
    setAdminUser(null);
  };

  // Update Event Config in MongoDB
  const updateConfig = async (newFields) => {
    if (!adminToken) {
      return { success: false, error: 'Unauthorized: Admin login required' };
    }
    try {
      const res = await fetch('/api/event-config', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${adminToken}`
        },
        body: JSON.stringify(newFields)
      });
      const data = await res.json();
      if (res.ok && data.success) {
        // Refresh local state with updated doc
        setConfig(prev => ({
          ...prev,
          ...newFields
        }));
        setIsLiveDb(true);
        return { success: true };
      }
      return { success: false, error: data.error || 'Failed to update configuration' };
    } catch (err) {
      return { success: false, error: 'Network error saving to MongoDB' };
    }
  };

  return (
    <EventContext.Provider value={{
      config,
      isLoading,
      isLiveDb,
      adminToken,
      adminUser,
      isAdminModalOpen,
      setIsAdminModalOpen,
      loginAdmin,
      logoutAdmin,
      updateConfig,
      refreshConfig: fetchConfig
    }}>
      {children}
    </EventContext.Provider>
  );
}

export function useEvent() {
  const context = useContext(EventContext);
  if (!context) {
    throw new Error('useEvent must be used within an EventProvider');
  }
  return context;
}

