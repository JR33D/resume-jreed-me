'use client';

import { useState } from 'react';
import { useColors } from '@/lib/theme';
import { data } from '@/lib/data';

export default function Skills() {
  const { accent, mute, ink, line, bg } = useColors();
  const [sfilter, setSfilter] = useState('all');
  const D = data;

  const scats = ['all', ...Array.from(new Set(D.skills.map((s) => s.cat.toLowerCase())))];
  const filtered = sfilter === 'all' ? D.skills : D.skills.filter((s) => s.cat.toLowerCase() === sfilter);

  const grouped: Record<string, typeof D.skills> = {};
  filtered.forEach((s) => {
    (grouped[s.cat] ??= []).push(s);
  });

  return (
    <div>
      <div style={{ color: mute, marginBottom: 16 }}>
        <span style={{ color: accent }}>#</span> skills · [[stack]]
      </div>

      <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', marginBottom: 18 }}>
        {scats.map((c) => (
          <div
            key={c}
            className="v2-chip"
            onClick={() => setSfilter(c)}
            style={{
              fontSize: 11,
              padding: '5px 10px',
              border: `1px solid ${c === sfilter ? accent : line}`,
              color: c === sfilter ? accent : mute,
            }}
          >
            --{c}
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        {Object.entries(grouped).map(([cat, skills]) => (
          <div key={cat} style={{ border: `1px solid ${line}` }}>
            <div
              style={{
                padding: '8px 14px',
                borderBottom: `1px solid ${line}`,
                fontSize: 11,
                color: accent,
                letterSpacing: 0.8,
                textTransform: 'uppercase',
              }}
            >
              [{cat.toLowerCase()}]
            </div>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                gap: 1,
                background: line,
              }}
            >
              {skills.map((s) => (
                <div key={s.name} style={{ background: bg, padding: '10px 14px' }}>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'baseline',
                      marginBottom: 6,
                    }}
                  >
                    <span style={{ fontSize: 12, color: ink }}>{s.name}</span>
                    <span style={{ fontSize: 10, color: mute, fontVariantNumeric: 'tabular-nums' }}>{s.years}y</span>
                  </div>
                  <div style={{ display: 'flex', gap: 2 }}>
                    {[1, 2, 3, 4, 5].map((n) => (
                      <span key={n} style={{ flex: 1, height: 4, background: n <= s.level ? accent : line }} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
