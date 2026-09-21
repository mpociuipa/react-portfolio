import { Webhook } from 'svix';
import { revalidateTag, revalidatePath } from 'next/cache';
export const runtime = 'nodejs';
type Changed = { type: 'post' | 'category' | 'author' | 'tag' | 'home'; slug: string };
export async function POST(request: Request) {
 const secret = process.env.OPINLY_WEBHOOK_SIGNING_SECRET;
 if (!secret) return new Response('Webhook not configured', { status: 503 });
 const id = request.headers.get('svix-id'), timestamp = request.headers.get('svix-timestamp'), signature = request.headers.get('svix-signature');
 if (!id || !timestamp || !signature) return new Response('Missing signature', { status: 400 });
 let event: { type?: string; data?: { changed?: Changed[] } };
 try { event = new Webhook(secret).verify(await request.text(), { 'svix-id': id, 'svix-timestamp': timestamp, 'svix-signature': signature }) as typeof event; }
 catch { return new Response('Invalid signature', { status: 400 }); }
 if (event.type !== 'content.routes-changed') return new Response('ok');
 const changed = event.data?.changed;
 if (!Array.isArray(changed) || changed.some(r => !r || !['post','category','author','tag','home'].includes(r.type) || typeof r.slug !== 'string' || (r.type !== 'home' && (!r.slug || /[\/\\?#]/.test(r.slug) || r.slug === '.' || r.slug === '..')))) return new Response('Invalid payload', { status: 400 });
 revalidateTag('opinly', { expire: 0 });
 for (const item of changed) {
  const slug = encodeURIComponent(item.slug);
  if (item.type === 'post') revalidatePath('/blog/' + slug);
  if (item.type === 'tag') revalidatePath('/blog/tag/' + slug);
  if (item.type === 'category') revalidatePath('/blog/category/' + slug);
  if (item.type === 'author') { revalidatePath('/blog/authors/' + slug); revalidatePath('/blog/authors'); }
 }
 // Post edits also affect cards, archives and sitemap; cover tag membership changes.
 revalidatePath('/blog/[[...slug]]', 'page');
 revalidatePath('/blog');
 revalidatePath('/sitemap.xml');
 return Response.json({ revalidated: true });
}
