import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { getAllPosts, getPost } from '@/lib/blog';
import type { Metadata } from 'next';

interface Props {
  params: Promise<{ slug: string }>;
}

// Pre-render posts known at build time; new posts added to the content repo
// are rendered on first request and cached (dynamicParams = true by default).
export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  try {
    const { meta } = await getPost(slug);
    return { title: `${meta.title} — Jeremy Reed` };
  } catch {
    return {};
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;

  let meta, content;
  try {
    ({ meta, content } = await getPost(slug));
  } catch {
    notFound();
  }

  return (
    <main style={{ minHeight: '100vh', background: 'var(--bg)', color: 'var(--ink)', fontFamily: '"JetBrains Mono", monospace' }}>
      <div style={{ maxWidth: 760, margin: '0 auto', padding: '48px 24px' }}>
        {/* nav */}
        <div style={{ marginBottom: 40, fontSize: 12, color: 'var(--mute)' }}>
          <a href="/" style={{ color: 'var(--accent)', textDecoration: 'none' }}>~/jeremy-reed</a>
          <span style={{ margin: '0 8px' }}>/</span>
          <a href="/#blog" style={{ color: 'var(--accent)', textDecoration: 'none' }}>blog</a>
          <span style={{ margin: '0 8px' }}>/</span>
          <span>{slug}</span>
        </div>

        {/* header */}
        <div style={{ marginBottom: 40 }}>
          <h1 style={{ margin: '0 0 12px', fontSize: 22, fontWeight: 500, lineHeight: 1.3 }}>{meta!.title}</h1>
          <div style={{ fontSize: 12, color: 'var(--mute)', display: 'flex', gap: 16, flexWrap: 'wrap' }}>
            <span>{meta!.date}</span>
            <span>{meta!.read} min read</span>
            <span>{meta!.tags.join(', ')}</span>
          </div>
        </div>

        {/* divider */}
        <div style={{ height: 1, background: 'var(--line)', marginBottom: 40 }} />

        {/* content */}
        <div className="prose-terminal">
          <MDXRemote source={content!} />
        </div>

        {/* footer */}
        <div style={{ marginTop: 64, paddingTop: 24, borderTop: '1px solid var(--line)', fontSize: 12, color: 'var(--mute)' }}>
          <a href="/" style={{ color: 'var(--accent)', textDecoration: 'none' }}>← back to terminal</a>
        </div>
      </div>

      <style>{`
        .prose-terminal { font-size: 14px; line-height: 1.75; color: var(--ink); }
        .prose-terminal h2 { font-size: 16px; font-weight: 600; margin: 32px 0 12px; color: var(--accent); }
        .prose-terminal h3 { font-size: 14px; font-weight: 600; margin: 24px 0 8px; }
        .prose-terminal p  { margin: 0 0 16px; color: var(--mute); }
        .prose-terminal a  { color: var(--accent); }
        .prose-terminal code { background: var(--soft); padding: 2px 6px; font-family: inherit; font-size: 13px; }
        .prose-terminal pre  { background: var(--surface); padding: 16px; overflow-x: auto; margin: 0 0 20px; }
        .prose-terminal pre code { background: none; padding: 0; }
        .prose-terminal ul, .prose-terminal ol { margin: 0 0 16px; padding-left: 20px; color: var(--mute); }
        .prose-terminal li { margin-bottom: 6px; }
        .prose-terminal blockquote { border-left: 3px solid var(--accent); padding-left: 16px; margin: 0 0 16px; color: var(--mute); }
      `}</style>
    </main>
  );
}
