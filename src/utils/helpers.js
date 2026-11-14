/**
 * Helper utilities for Google Play Arena Website
 */

/**
 * Copy text to clipboard with modern API and fallback
 * @param {string} text 
 * @returns {Promise<boolean>}
 */
export const copyToClipboard = async (text) => {
  if (!text) return false;
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    } else {
      // Fallback for older browsers or non-https development
      const textArea = document.createElement("textarea");
      textArea.value = text;
      textArea.style.position = "fixed";
      textArea.style.left = "-999999px";
      textArea.style.top = "-999999px";
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      const successful = document.execCommand('copy');
      textArea.remove();
      return successful;
    }
  } catch (err) {
    console.error('Failed to copy to clipboard', err);
    return false;
  }
};

/**
 * Smooth scroll to element by ID
 * @param {string} id 
 */
export const scrollToSection = (id) => {
  const element = document.getElementById(id);
  if (element) {
    const yOffset = -80; // Account for fixed navbar
    const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
    window.scrollTo({ top: y, behavior: 'smooth' });
  }
};

