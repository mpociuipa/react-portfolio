import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { getPosts, resolveBlogRoute, blogPaths, jsonLd, SITE_URL, SITE_NAME, PAGE_SIZE, LANGUAGES } from '../../../lib/blog';
import '../blog.css';
type Props = { params: Promise<{ slug?: string[] }> };
export function generateStaticParams() { return blogPaths().map(slug=>({slug})); }
export const dynamicParams = false;
export async function generateMetadata({params}: Props): Promise<Metadata> {
 const route=resolveBlogRoute((await params).slug ?? []); if(!route)return {title:'Page not found',robots:{index:false,follow:false}};
 const title=route.title+(route.page>1?` — Page ${route.page}`:''); const url=SITE_URL+route.path; const post=route.post;
 const image=post?.cover ? {url:SITE_URL+post.cover,alt:post.coverAlt} : {url:SITE_URL+'/preview.png',alt:SITE_NAME};
 return {title:`${title} | ${SITE_NAME}`,description:route.description,alternates:{canonical:url},
  openGraph:{title,description:route.description,url,type:post?'article':'website',images:[image],...(post?{publishedTime:post.date+'T00:00:00Z',modifiedTime:post.updated+'T00:00:00Z',authors:[post.author]}:{})},
  twitter:{card:'summary_large_image',title,description:route.description,images:[image.url]}};
}
export default async function BlogPage({params}: Props) {
 const route=resolveBlogRoute((await params).slug ?? []); if(!route)notFound(); const post=route.post;
 const posts=route.posts.slice((route.page-1)*PAGE_SIZE,route.page*PAGE_SIZE);
 const authors=[...new Map(getPosts().map(p=>[p.authorSlug,p])).values()];
 const categories=[...new Map(getPosts().map(p=>[p.categorySlug,p.category])).entries()];
 const date=(d:string,lang='en')=>new Intl.DateTimeFormat(lang,{dateStyle:'long',timeZone:'UTC'}).format(new Date(d));
 return <main className="blog-shell" lang={post?.language ?? 'en'}>
 <nav className="blog-nav" aria-label="Blog navigation"><Link href="/">← Portfolio</Link><Link href="/blog">Blog</Link><Link href="/blog/authors">Authors</Link></nav>
 <h1>{route.title}</h1>
 {post ? <article>
  <p className="blog-muted"><Link href={'/blog/authors/'+post.authorSlug}>{post.author}</Link> · <time dateTime={post.date}>{date(post.date,post.language)}</time> · {post.minutes} min · {LANGUAGES[post.language]}</p>
  {post.updated!==post.date && <p className="blog-muted">{({en:'Updated',lt:'Atnaujinta',de:'Aktualisiert',fr:'Mis à jour'} as Record<string,string>)[post.language]}: <time dateTime={post.updated}>{date(post.updated,post.language)}</time></p>}
  <p className="blog-intro">{post.description}</p>
  {post.cover && <img className="blog-cover" src={post.cover} alt={post.coverAlt} />}
  <script type="application/ld+json" dangerouslySetInnerHTML={{__html:jsonLd({'@context':'https://schema.org','@type':'BlogPosting',headline:post.title,description:post.description,url:SITE_URL+route.path,mainEntityOfPage:SITE_URL+route.path,datePublished:post.date+'T00:00:00Z',dateModified:post.updated+'T00:00:00Z',inLanguage:post.language,author:{'@type':'Person',name:post.author,url:SITE_URL+'/blog/authors/'+post.authorSlug},...(post.cover?{image:SITE_URL+post.cover}:{}),articleSection:post.category,keywords:post.tags.join(', ')})}} />
  <div className="blog-body"><Markdown remarkPlugins={[remarkGfm]} skipHtml>{post.content}</Markdown></div>
  <div className="blog-categories"><Link className="btn" href={'/blog/category/'+post.categorySlug}>{post.category}</Link>{post.tags.map(tag=><Link key={tag} className="btn" href={'/blog/tag/'+tag}>#{tag}</Link>)}</div>
 </article> : route.kind==='authors' ? <div className="blog-grid">{authors.map(a=><Link className="blog-card" key={a.authorSlug} href={'/blog/authors/'+a.authorSlug}><h2>{a.author}</h2><p>{getPosts().filter(p=>p.authorSlug===a.authorSlug).length} articles</p></Link>)}</div> : <>
  <p className="blog-intro">{route.description}</p>
  <div className="blog-categories"><Link className="btn" href="/blog">All articles</Link>{categories.map(([slug,name])=><Link className="btn" key={slug} href={'/blog/category/'+slug}>{name}</Link>)}</div>
  <div className="blog-grid">{posts.map(p=><Link className="blog-card" key={p.slug} href={'/blog/'+p.slug} lang={p.language}><span className="blog-meta">{LANGUAGES[p.language]} · {p.minutes} min</span><h2>{p.title}</h2><p>{p.description}</p><span>Read article →</span></Link>)}</div>
  {!posts.length&&<p>No published articles yet.</p>}
  {route.pages>1&&<nav className="blog-pagination" aria-label="Pagination">{route.page>1&&<Link className="btn" href={route.page===2?route.base:route.base+'/page/'+(route.page-1)}>← Previous</Link>}<span>{route.page} / {route.pages}</span>{route.page<route.pages&&<Link className="btn" href={route.base+'/page/'+(route.page+1)}>Next →</Link>}</nav>}
 </>}
 </main>;
}
