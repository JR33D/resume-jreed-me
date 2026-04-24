'use client';

import { useState } from 'react';
import { useColors } from '@/lib/theme';
import { data } from '@/lib/data';

export default function Projects() {
  const { accent, mute, ink, line, soft } = useColors();
  const [pfilter, setPfilter] = useState('all');
  const [query, setQuery] = useState('');
  const D = data;

  const pcats = ['all', ...Array.from(new Set(D.projects.map((p) => p.category.toLowerCase())))];

  const filtered = D.projects.filter(
    (p) =>
      (pfilter === 'all' || p.category.toLowerCase() === pfilter) &&
      (query === '' ||
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.tagline.toLowerCase().includes(query.toLowerCase())),
  );

  return (
    <div>
      <div style={{ color: mute, marginBottom: 16 }}>
        <span style={{ color: accent }}>#</span> projects · grep + filter
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14, flexWrap: 'wrap' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            border: `1px solid ${line}`,
            padding: '0 10px',
            flex: '1 1 240px',
            minWidth: 200,
          }}
        >
          <span style={{ color: accent, marginRight: 8 }}>$</span>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="grep projects..."
            style={{
              flex: 1,
              background: 'transparent',
              border: 'none',
              outline: 'none',
              color: ink,
              fontFamily: 'inherit',
              fontSize: 12,
              padding: '8px 0',
            }}
          />
        </div>

        <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
          {pcats.map((c) => (
            <div
              key={c}
              className="v2-chip"
              onClick={() => setPfilter(c)}
              style={{
                fontSize: 11,
                padding: '5px 10px',
                border: `1px solid ${c === pfilter ? accent : line}`,
                color: c === pfilter ? accent : mute,
              }}
            >
              --{c}
            </div>
          ))}
        </div>
      </div>

      <div style={{ border: `1px solid ${line}` }}>
        {filtered.map((p, i) => (
          <div
            key={p.name}
            className="v2-row"
            style={{
              padding: '14px 16px',
              borderBottom: i === filtered.length - 1 ? 'none' : `1px solid ${line}`,
              display: 'grid',
              gridTemplateColumns: '1fr 100px',
              gap: 16,
              alignItems: 'start',
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 4 }}>
                <a href={p.url} style={{ color: accent, textDecoration: 'none', fontSize: 14, fontWeight: 500 }}>
                  {p.name}
                </a>
                <span
                  style={{
                    fontSize: 10,
                    color: mute,
                    border: `1px solid ${line}`,
                    padding: '1px 6px',
                    textTransform: 'uppercase',
                    letterSpacing: 0.5,
                  }}
                >
                  {p.status}
                </span>
              </div>
              <div style={{ fontSize: 12, color: mute, marginBottom: 8 }}>{p.tagline}</div>
              <div style={{ fontSize: 11, color: mute }}>
                <span style={{ color: accent }}>stack:</span> [{p.stack.map((s) => `"${s}"`).join(', ')}]
              </div>
            </div>
            <div style={{ textAlign: 'right', fontSize: 11, color: mute, fontVariantNumeric: 'tabular-nums' }}>
              <div>{p.year}</div>
              <div style={{ marginTop: 2 }}>{p.category}</div>
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <div style={{ padding: 24, fontSize: 12, color: mute, textAlign: 'center' }}>
            no matches. try clearing filters.
          </div>
        )}
      </div>

      {/* suppress unused var warning */}
      <span style={{ display: 'none' }}>{soft}</span>
    </div>
  );
}
