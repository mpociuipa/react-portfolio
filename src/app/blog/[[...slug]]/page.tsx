import type { ResolvingMetadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { OpinlyContent } from '@opinly/react';
import { generateOpinlyMetadata, opinlyConfig, OpinlyJsonLd, buildBlogPostingJsonLd, buildFaqJsonLd } from '@opinly/next';
import type { SeoResolved, OpinlyNode } from '@opinly/shared';
import { getOpinly } from '../../../lib/opinly';
import '../blog.css';
export const revalidate = 3600;
type Props = { params: Promise<{ slug?: string[] }>; searchParams: Promise<{ cursor?: string }> };
async function loadRoute(slug: string[], cursor?: string) {
 const client = getOpinly();
 if (!slug.length) {
  const [list, categories] = await Promise.all([client.posts({ limit: 12, cursor }), client.categories()]);
  return { seo: { type: 'home' } as SeoResolved, title: 'Blog', list, categories };
 }
 if (slug.length === 2 && slug[0] === 'category') {
  const [categories, list] = await Promise.all([client.categories(), client.posts({ category: slug[1], limit: 12, cursor })]);
  const category = categories.find(c => c.slug === slug[1]);
  if (!category) notFound();
  return { seo: { type: 'category', data: { ...category, name: category.title, posts: list.data } } as SeoResolved, title: category.title, list };
 }
 if (slug.length === 2 && slug[0] === 'tag') {
  const [tags, list] = await Promise.all([client.tags(), client.posts({ tag: slug[1], limit: 12, cursor })]);
  const tag = tags.find(t => t.slug === slug[1]);
  if (!tag) notFound();
  return { seo: { type: 'tag', data: tag } as SeoResolved, title: tag.name, list };
 }
 if (slug[0] === 'authors') {
  if (slug.length === 1) return { seo: { type: 'authors' } as SeoResolved, title: 'Authors', authors: (await client.authors()).data };
  if (slug.length !== 2) notFound();
  const author = await client.author(slug[1]);
  if (author.type !== 'author') notFound();
  const list = await client.posts({ author: slug[1], limit: 12, cursor });
  return { seo: author as SeoResolved, title: author.data.name, list };
 }
 if (slug.length !== 1) notFound();
 const post = await client.post(slug[0]);
 if (!post) notFound();
 return { seo: { type: 'post', data: post } as SeoResolved, title: post.title, post };
}
export async function generateMetadata(props: Props, parent: ResolvingMetadata) {
 if (!process.env.OPINLY_API_KEY) return { title: 'Blog | Mantas Počiuipa', robots: { index: false } };
 const { slug = [] } = await props.params;
 return generateOpinlyMetadata((await loadRoute(slug)).seo, parent);
}
export default async function BlogPage(props: Props) {
 const { slug = [] } = await props.params;
 const { cursor } = await props.searchParams;
 if (!process.env.OPINLY_API_KEY) return <main className="blog-shell"><Link href="/">← Portfolio</Link><h1>Blog</h1><p>The blog is being prepared. Please check back soon.</p></main>;
 const route = await loadRoute(slug, cursor);
 const post = 'post' in route ? route.post : undefined;
 return <main className="blog-shell">
  <nav className="blog-nav"><Link href="/">← Portfolio</Link><Link href="/blog">Blog</Link><Link href="/blog/authors">Authors</Link></nav>
  <h1>{route.title}</h1>
  {post ? <article>
   <p className="blog-muted">{new Date(post.firstPublishedAt).toLocaleDateString('en-GB')}{post.author && <> · <Link href={'/blog/authors/' + encodeURIComponent(post.author.slug)}>{post.author.name}</Link></>}</p>
   {post.titleFile?.fileKey && <img className="blog-cover" src={opinlyConfig.imagesPrefix + '/' + post.titleFile.fileKey} alt={post.titleFile.altText || post.title} />}
   <OpinlyJsonLd data={buildBlogPostingJsonLd(post)} />
   <div className="blog-body"><OpinlyContent content={post.content as OpinlyNode} config={opinlyConfig} /></div>
   {!!post.faqs?.length && <section className="blog-faq"><h2>Frequently asked questions</h2><OpinlyJsonLd data={buildFaqJsonLd(post.faqs)} />{post.faqs.map((faq, i) => <details key={i}><summary>{faq.question}</summary><p>{faq.answer}</p></details>)}</section>}
  </article> : <>
   {'categories' in route && route.categories && <div className="blog-categories">{route.categories.map(c => <Link className="btn" key={c.slug} href={'/blog/category/' + encodeURIComponent(c.slug)}>{c.title}</Link>)}</div>}
   {'authors' in route && route.authors && <div className="blog-grid">{route.authors.map(a => <Link className="blog-card" key={a.slug} href={'/blog/authors/' + encodeURIComponent(a.slug)}><h2>{a.name}</h2></Link>)}</div>}
   {'list' in route && route.list && <>
    <div className="blog-grid">{route.list.data.map(p => <Link className="blog-card" key={p.slug} href={'/blog/' + encodeURIComponent(p.slug)}><h2>{p.title}</h2><p>{p.description}</p><span>Read article →</span></Link>)}</div>
    {!route.list.data.length && <p>No published posts yet.</p>}
    {route.list.has_more && route.list.next_cursor && <Link className="btn" href={'/blog' + (slug.length ? '/' + slug.map(encodeURIComponent).join('/') : '') + '?cursor=' + encodeURIComponent(route.list.next_cursor)}>Next page →</Link>}
   </>}
  </>}
 </main>;
}
