import { useSyncExternalStore } from 'react';
const subscribe = (cb) => { window.addEventListener('langchange', cb); return () => window.removeEventListener('langchange', cb); };
const read = () => { try { return localStorage.getItem('portfolioLang') || 'en'; } catch { return 'en'; } };
export function usePortfolioLanguage() { return useSyncExternalStore(subscribe, read, () => 'en'); }
