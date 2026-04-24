'use client';

import { useEffect, useState } from 'react';
import { useColors, useIsMobile } from '@/lib/theme';
import type { PostMeta } from '@/lib/data';

export default function BlogIndex() {
  const { accent, mute, ink, line, soft } = useColors();
  const isMobile = useIsMobile();
  const [posts, setPosts] = useState<PostMeta[]>([]);

  useEffect(() => {
    fetch('/api/posts')
      .then((r) => r.json())
      .then(setPosts)
      .catch(() => setPosts([]));
  }, []);

  return (
    <div>
      <div style={{ color: mute, marginBottom: 16 }}>
        <span style={{ color: accent }}>#</span> blog · ls -lt posts/
      </div>

      <div style={{ border: `1px solid ${line}` }}>
        {/* Header */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr 50px' : '100px 1fr 60px 120px',
            gap: 12,
            padding: '10px 14px',
            borderBottom: `1px solid ${line}`,
            color: mute,
            fontSize: 10,
            textTransform: 'uppercase',
            letterSpacing: 0.8,
            background: soft,
          }}
        >
          <div>{isMobile ? 'post' : 'date'}</div>
          {!isMobile && <div>title</div>}
          <div>read</div>
          {!isMobile && <div>tags</div>}
        </div>

        {posts.length === 0 && (
          <div style={{ padding: 24, fontSize: 12, color: mute, textAlign: 'center' }}>
            loading posts...
          </div>
        )}

        {posts.map((p, i) => (
          <a
            href={`/blog/${p.slug}`}
            key={p.slug}
            className="v2-row"
            style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr 50px' : '100px 1fr 60px 120px',
              gap: 12,
              padding: '14px 14px',
              borderBottom: i === posts.length - 1 ? 'none' : `1px solid ${line}`,
              textDecoration: 'none',
              color: 'inherit',
              alignItems: 'start',
            }}
          >
            {isMobile ? (
              /* Mobile: title + excerpt stacked, read time on right */
              <>
                <div>
                  <div style={{ fontSize: 13, color: accent, marginBottom: 3 }}>{p.title}</div>
                  <div style={{ fontSize: 11, color: mute, lineHeight: 1.5, marginBottom: 4 }}>{p.excerpt}</div>
                  <div style={{ fontSize: 10, color: mute }}>{p.date}</div>
                </div>
                <div style={{ fontSize: 11, color: mute, textAlign: 'right', whiteSpace: 'nowrap' }}>{p.read} min</div>
              </>
            ) : (
              /* Desktop: original 4-column layout */
              <>
                <div style={{ fontSize: 11, color: mute, fontVariantNumeric: 'tabular-nums' }}>{p.date}</div>
                <div>
                  <div style={{ fontSize: 13, color: accent, marginBottom: 4 }}>{p.title}</div>
                  <div style={{ fontSize: 11, color: mute, lineHeight: 1.5 }}>{p.excerpt}</div>
                </div>
                <div style={{ fontSize: 11, color: mute }}>{p.read} min</div>
                <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                  {p.tags.map((t) => (
                    <span key={t} style={{ fontSize: 10, color: mute, border: `1px solid ${line}`, padding: '1px 6px' }}>
                      {t}
                    </span>
                  ))}
                </div>
              </>
            )}
          </a>
        ))}
      </div>

      {/* suppress unused var */}
      <span style={{ display: 'none' }}>{ink}</span>
    </div>
  );
}
