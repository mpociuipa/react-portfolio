import 'server-only';
import { createOpinlyClient } from '@opinly/backend';
export function getOpinly() {
 return createOpinlyClient({ apiKey: process.env.OPINLY_API_KEY,
  fetch: (url, init) => {
   const method = (init?.method ?? (url instanceof Request ? url.method : 'GET')).toUpperCase();
   return fetch(url, method === 'GET'
    ? { ...init, cache: 'force-cache', next: { tags: ['opinly'], revalidate: 3600 } }
    : { ...init, cache: 'no-store' });
  },
 });
}
// Call only from a verified payment webhook, with the provider's confirmed amount.
// orderId deduplicates delivery retries; never take price from the browser.
export async function recordConfirmedPurchase(input: { orderId: string; value: number; currency: string; email?: string; anonId?: string }) {
 return getOpinly().trackPurchase(input);
}
