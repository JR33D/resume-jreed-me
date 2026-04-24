import matter from 'gray-matter';
import type { PostMeta } from './data';

// ─── Config ───────────────────────────────────────────────────────────────────

const REMOTE_BASE = process.env.BLOG_CONTENT_URL?.replace(/\/$/, '');
const TOKEN       = process.env.BLOG_CONTENT_TOKEN;

/** How long Next.js caches remote fetches before revalidating in the background. */
const REVALIDATE_SECONDS = 300; // 5 minutes

// ─── Remote helpers ───────────────────────────────────────────────────────────

function fetchHeaders(): HeadersInit | undefined {
  return TOKEN ? { Authorization: `Bearer ${TOKEN}` } : undefined;
}

async function remoteFetch(path: string): Promise<Response> {
  return fetch(`${REMOTE_BASE}/${path}`, {
    headers: fetchHeaders(),
    next: { revalidate: REVALIDATE_SECONDS },
  });
}

// ─── Remote source ────────────────────────────────────────────────────────────
//
// Expected content repo layout:
//
//   index.json                   ← metadata array (see format below)
//   on-being-the-second-engineer.mdx
//   another-post.mdx
//   ...
//
// index.json format:
//   [
//     {
//       "slug": "on-being-the-second-engineer",
//       "title": "On Being the Second Engineer",
//       "date": "2025-08-14",
//       "tags": ["Career"],
//       "read": 6,
//       "excerpt": "The second engineer shapes culture more than the first."
//     }
//   ]
//
// Adding a new post = add the .mdx file + prepend an entry to index.json.
// The site revalidates automatically every REVALIDATE_SECONDS — no redeploy needed.

async function remoteGetAllPosts(): Promise<PostMeta[]> {
  const res = await remoteFetch('index.json');
  if (!res.ok) {
    console.error(`[blog] Failed to fetch index.json: ${res.status}`);
    return [];
  }
  return res.json();
}

async function remoteGetPost(slug: string): Promise<{ meta: PostMeta; content: string }> {
  const res = await remoteFetch(`${slug}.mdx`);
  if (!res.ok) throw new Error(`[blog] Post not found: ${slug} (${res.status})`);
  const raw = await res.text();
  const { data, content } = matter(raw);
  return { meta: { slug, ...(data as Omit<PostMeta, 'slug'>) }, content };
}

// ─── Local fallback (used when BLOG_CONTENT_URL is not set) ──────────────────
// Keeps local `npm run dev` working without any environment variables.

async function localGetAllPosts(): Promise<PostMeta[]> {
  const fs   = await import('fs');
  const path = await import('path');
  const dir  = path.join(process.cwd(), 'src/content/blog');
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f: string) => f.endsWith('.mdx'))
    .map((file: string) => {
      const slug = file.replace(/\.mdx$/, '');
      const raw  = fs.readFileSync(path.join(dir, file), 'utf8');
      const { data } = matter(raw);
      return { slug, ...(data as Omit<PostMeta, 'slug'>) };
    })
    .sort((a: PostMeta, b: PostMeta) => (a.date < b.date ? 1 : -1));
}

async function localGetPost(slug: string): Promise<{ meta: PostMeta; content: string }> {
  const fs   = await import('fs');
  const path = await import('path');
  const file = path.join(process.cwd(), 'src/content/blog', `${slug}.mdx`);
  const raw  = fs.readFileSync(file, 'utf8');
  const { data, content } = matter(raw);
  return { meta: { slug, ...(data as Omit<PostMeta, 'slug'>) }, content };
}

// ─── Public API ───────────────────────────────────────────────────────────────

export async function getAllPosts(): Promise<PostMeta[]> {
  return REMOTE_BASE ? remoteGetAllPosts() : localGetAllPosts();
}

export async function getPost(slug: string): Promise<{ meta: PostMeta; content: string }> {
  return REMOTE_BASE ? remoteGetPost(slug) : localGetPost(slug);
}
