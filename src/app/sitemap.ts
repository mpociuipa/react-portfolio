import type { MetadataRoute } from 'next';
import { buildSitemapEntries } from '@opinly/shared';
import { opinlyConfig } from '@opinly/next';
import { getOpinly } from '../lib/opinly';
export const dynamic = 'force-dynamic';
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
 const home = { url: 'https://react-portfolio-steel-ten.vercel.app' };
 if (!process.env.OPINLY_API_KEY) return [home];
 return [home, ...buildSitemapEntries(await getOpinly().routes(), opinlyConfig).map(e => ({url: e.url, lastModified: new Date(e.lastModified)}))];
}
