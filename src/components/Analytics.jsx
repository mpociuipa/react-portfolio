"use client";
import { useEffect, useState } from 'react';
import Script from 'next/script';
import CookieBanner from './CookieBanner';
import { hasAnalyticsConsent } from '../lib/analytics';
export default function Analytics() {
 const [enabled, setEnabled] = useState(false);
 useEffect(() => { const sync = () => setEnabled(hasAnalyticsConsent()); sync(); window.addEventListener('consentchange', sync); return () => window.removeEventListener('consentchange', sync); }, []);
 return <><CookieBanner />{enabled && <>
 <Script src="https://www.googletagmanager.com/gtag/js?id=G-7CWHLYVZT4" strategy="afterInteractive" />
 <Script id="google-analytics" strategy="afterInteractive">{`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-7CWHLYVZT4');`}</Script>
 </>}</>;
}
