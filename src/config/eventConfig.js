/**
 * ============================================================================
 * GOOGLE PLAY ARENA – GAME ON NIGHT
 * OFFICIAL EVENT CONFIGURATION FILE
 * ============================================================================
 * 
 * INSTRUCTIONS FOR HOST / ORGANIZER:
 * Replace the values below with your official event details and links.
 * 
 * CRITICAL SAFETY RULES:
 * 1. If an official URL is not yet available, leave it as an empty string ("").
 *    The website will automatically display a clean "Link will be announced soon"
 *    badge and disable the button safely.
 * 2. Never put dummy, invented, or fake links here.
 * 3. The entire website dynamically reads from this file.
 */

export const EVENT_CONFIG = {
  // Brand & Event Identity
  EVENT_NAME: "GOOGLE PLAY ARENA",
  EVENT_TITLE: "GAME ON NIGHT",
  EVENT_CATEGORY: "AI-POWERED GAME IDEATHON",
  TAGLINE: "IMAGINE IT. DESIGN IT. PITCH IT.",
  SUB_TAGLINE: "An official Google Student Ambassador initiative powered by Google Gemini & Nano Banana.",

  // Event Schedule & Venue (Update with your confirmed details)
  // If date or time is not yet announced, leave as "" or "To be announced"
  EVENT_DATE: "", // e.g., "Saturday, November 28, 2026"
  EVENT_TIME: "", // e.g., "6:00 PM – 8:00 PM IST"
  EVENT_MODE: "Virtual / Online via Google Meet",
  EVENT_DURATION: "2 Hours (60s Pitch per participant)",

  // Host & Organizer Details (Add only your official details)
  HOST_NAME: "Google Student Ambassador",
  HOST_ROLE: "Campus Lead & Event Organizer",
  HOST_CONTACT: "", // e.g., "gsa.lead@yourcollege.edu" or leave empty if contact details are not provided

  // Official External URLs
  // Leave empty ("") if pending official link generation.
  // The UI will gracefully disable the button and show "Link will be announced soon".
  PRE_SURVEY_URL: "https://producttrialsurvey.geministudentambassador.com/",       // Official Pre-Event Survey
  POST_SURVEY_URL: "https://producttrialfeedback.geministudentambassador.com/",     // Official Post-Event Feedback & Submission
  GOOGLE_MEET_URL: "",      // Official Google Meet link for the live Game On Night session
  EVENT_GUIDELINES_URL: "", // Optional official Google Docs/Drive link for detailed guidelines

  // Certificate & Reward Official Statements
  CERTIFICATE_INFORMATION: {
    participationCriteria: "Awarded to all verified attendees who complete the official Pre-Survey, attend the live Google Meet session, pitch their concept, and submit their complete Google Doc via the official Post-Survey form.",
    winnerCriteria: "Awarded to the top-evaluated game concepts judged on originality, specific mission design, non-violent mechanics, creative visual poster, and 60-second pitch delivery.",
    nationalPixelPrizeNote: "Top national finalists stand a chance for the National Winner to win a Google Pixel Phone, subject to official Google Student Ambassador national evaluation and terms.",
    verificationNote: "Official digital certificates are issued directly by Google Student Ambassador program leads following post-event verification."
  },

  // Additional Event Notes / Announcements banner
  ADDITIONAL_EVENT_INFORMATION: {
    announcementBadge: "FREE ENTRY • NATIONAL PIXEL CHANCE • OFFICIAL CERTIFICATES",
    toolsRequired: "Google Gemini (Free), Google Docs, Google Meet",
    noCodingNote: "100% Concept & Ideation — Zero coding required. Your creativity and prompt craft are your superpowers."
  }
};

/**
 * Helper to check if a URL is provided and valid (non-empty)
 * @param {string} url 
 * @returns {boolean}
 */
export const isUrlConfigured = (url) => {
  return typeof url === 'string' && url.trim().length > 0 && !url.includes("placeholder") && !url.includes("example.com");
};

/**
 * Formats date/time display nicely when blank
 * @param {string} value 
 * @param {string} fallback 
 * @returns {string}
 */
export const formatEventDetail = (value, fallback = "To be announced soon") => {
  return (value && value.trim().length > 0) ? value : fallback;
};

