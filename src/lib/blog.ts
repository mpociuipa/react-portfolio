import 'server-only';
import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { cache } from 'react';
export const SITE_URL = 'https://react-portfolio-steel-ten.vercel.app';
export const SITE_NAME = 'Mantas Počiuipa';
export const PAGE_SIZE = 6;
export const LANGUAGES: Record<string,string> = { en: 'English', lt: 'Lietuvių', de: 'Deutsch', fr: 'Français' };
export type Post = { slug: string; title: string; description: string; date: string; updated: string; language: string; category: string; categorySlug: string; tags: string[]; author: string; authorSlug: string; cover?: string; coverAlt?: string; content: string; minutes: number };
export const slugify = (s: string) => s.normalize('NFKD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
const validSlug = (s: string) => /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(s);
const reserved = ['category','authors','tag','page'];
export const getPosts = cache((): Post[] => {
 const root = path.join(process.cwd(), 'content/blog');
 const posts: Post[] = [];
 const seen = new Set<string>();
 for (const file of fs.readdirSync(root).filter(f => f.endsWith('.md')).sort()) {
  const fail = (message: string): never => { throw new Error(`content/blog/${file}: ${message}`); };
  const raw = fs.readFileSync(path.join(root,file),'utf8').replace(/\r\n/g,'\n');
  if (!raw.startsWith('---\n')) fail('Start the file with YAML front matter (---).');
  const {data,content} = matter(raw);
  const required = (key: string): string => typeof data[key] === 'string' && data[key].trim() ? data[key].trim() : fail(`Missing text field: ${key}`);
  const title=required('title'), description=required('description'), slug=required('slug');
  if (!validSlug(slug) || reserved.includes(slug)) fail('Invalid or reserved slug. Use lowercase letters, digits and hyphens.');
  if(seen.has(slug)) fail('Duplicate slug: '+slug); seen.add(slug);
  if(typeof data.published !== 'boolean') fail('published must be true or false.');
  const dateField = (key: string): string => { const value=required(key); if(!/^\d{4}-\d{2}-\d{2}$/.test(value) || Number.isNaN(Date.parse(value)) || new Date(value).toISOString().slice(0,10)!==value) fail(`${key} must be a quoted valid YYYY-MM-DD date.`); return value; };
  const date=dateField('date'), updated=data.updated ? dateField('updated') : date;
  if(updated < date) fail('updated cannot precede date.');
  const category=required('category'), categorySlug=data.categorySlug ? required('categorySlug') : slugify(category);
  const author=required('author'), authorSlug=data.authorSlug ? required('authorSlug') : slugify(author);
  if(!validSlug(categorySlug)||!validSlug(authorSlug)) fail('Invalid categorySlug or authorSlug.');
  const language=required('language'); if(!LANGUAGES[language]) fail('language must be en, lt, de or fr.');
  const tags=data.tags ?? []; if(!Array.isArray(tags)||tags.some(t=>typeof t!=='string'||!validSlug(t))) fail('tags must be a list of lowercase URL slugs.');
  if(!content.trim()) fail('Article body is empty.');
  if(data.cover && (typeof data.cover!=='string'||!/^\/(blog-images|assets)\/[^?#]+$/.test(data.cover)||data.cover.includes('..'))) fail('cover must be a local /blog-images/ or /assets/ path.');
  if(data.cover && !fs.existsSync(path.join(process.cwd(),'public',data.cover))) fail('Cover image file does not exist.');
  if(data.cover && (typeof data.coverAlt !== 'string'||!data.coverAlt.trim())) fail('Add coverAlt for the cover image.');
  if(!data.published) continue;
  posts.push({slug,title,description,date,updated,language,category,categorySlug,author,authorSlug,tags:[...new Set<string>(tags as string[])],cover:data.cover,coverAlt:data.coverAlt,content,minutes:Math.max(1,Math.ceil(content.split(/\s+/).length/220))});
 }
 return posts.sort((a,b)=>b.date.localeCompare(a.date)||a.slug.localeCompare(b.slug));
});
export type BlogRoute = { kind: 'list'|'post'|'authors'; title: string; description: string; path: string; base: string; posts: Post[]; page: number; pages: number; post?: Post };
export function resolveBlogRoute(parts: string[]): BlogRoute | null {
 const all=getPosts(); let segments=[...parts]; let page=1;
 const routePath='/blog'+(parts.length?'/'+parts.join('/'):'');
 if(segments.length>=2 && segments[segments.length-2]==='page') {
  const raw=segments.pop()!; segments.pop(); if(!/^[1-9]\d*$/.test(raw)) return null; page=Number(raw); if(page===1||!Number.isSafeInteger(page)) return null;
 }
 let posts=all, title='Blog', description='Practical notes on web development, deployment and browser-based 3D.';
 let kind: BlogRoute['kind']='list';
 if(segments.length===1 && segments[0]==='authors') { if(page!==1)return null; kind='authors'; title='Authors'; description='Authors contributing to this blog.'; }
 else if(segments.length===2 && ['category','tag','authors'].includes(segments[0])) {
  const [type,key]=segments;
  posts=all.filter(p=>type==='category'?p.categorySlug===key:type==='authors'?p.authorSlug===key:p.tags.includes(key));
  if(!posts.length)return null;
  title=type==='category'?posts[0].category:type==='authors'?posts[0].author:key;
  description=`Articles: ${title}.`;
 } else if(segments.length===1) {
  if(page!==1)return null; const post=all.find(p=>p.slug===segments[0]);
  return post?{kind:'post',title:post.title,description:post.description,path:routePath,base:routePath,posts:[post],post,page:1,pages:1}:null;
 } else if(segments.length) return null;
 const pages=Math.max(1,Math.ceil(posts.length/PAGE_SIZE)); if(page>pages)return null;
 const base='/blog'+(segments.length?'/'+segments.join('/'):'');
 return {kind,title,description,path:routePath,base,posts,page,pages};
}
export function blogPaths(): string[][] {
 const posts=getPosts();const paths: string[][]=[[],['authors'],...posts.map(p=>[p.slug])];
 const groups: string[][] = [[],...[...new Set(posts.map(p=>p.categorySlug))].map(s=>['category',s]),...[...new Set(posts.map(p=>p.authorSlug))].map(s=>['authors',s]),...[...new Set(posts.flatMap(p=>p.tags))].map(s=>['tag',s])];
 for(const group of groups) { if(group.length)paths.push(group); const route=resolveBlogRoute(group)!; for(let page=2;page<=route.pages;page++)paths.push([...group,'page',String(page)]); }
 return paths;
}
export function jsonLd(value: unknown) { return JSON.stringify(value).replace(/</g,'\\u003c'); }
