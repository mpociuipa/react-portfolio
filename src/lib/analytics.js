export function hasAnalyticsConsent() {
 if (typeof window === 'undefined') return false;
 try { const consent = JSON.parse(localStorage.getItem('cookieConsent') || 'null');
 return consent?.type === 'all' || (consent?.type === 'custom' && JSON.parse(localStorage.getItem('cookiePreferences') || '{}').analytics === true);
 } catch { return false; }
}
// Keep the existing form analytics without sending email addresses to Google Analytics.
export function trackLead(_email, source) {
 if (!hasAnalyticsConsent() || typeof window.gtag !== 'function') return;
 window.gtag('event', 'generate_lead', { lead_source: source });
}
