import type { MetadataRoute } from 'next';
import { SITE_URL, getPosts, blogPaths } from '../lib/blog';
export default function sitemap(): MetadataRoute.Sitemap {
 const all=getPosts();
 return [{url:SITE_URL},...blogPaths().map(parts=>{
  const post=parts.length===1?all.find(p=>p.slug===parts[0]):undefined;
  const updated=post?.updated ?? all.map(p=>p.updated).sort().at(-1);
  return {url:SITE_URL+'/blog'+(parts.length?'/'+parts.join('/') : ''),...(updated?{lastModified:updated}: {})};
 })];
}
