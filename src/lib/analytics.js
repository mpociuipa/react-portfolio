export function hasAnalyticsConsent() {
 if (typeof window === 'undefined') return false;
 try { const consent = JSON.parse(localStorage.getItem('cookieConsent') || 'null');
 return consent?.type === 'all' || (consent?.type === 'custom' && JSON.parse(localStorage.getItem('cookiePreferences') || '{}').analytics === true);
 } catch { return false; }
}
export function trackLead(email, source) {
 if (!hasAnalyticsConsent()) return;
 const send = () => { if (!hasAnalyticsConsent()) return; window.opinly?.identify({ email }); window.opinly?.track('generate_lead', { source }); };
 if (window.opinly) send(); else window.addEventListener('opinly:ready', send, { once: true });
}
