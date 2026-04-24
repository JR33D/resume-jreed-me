'use client';

import { useColors } from '@/lib/theme';
import { data } from '@/lib/data';

export default function About() {
  const { accent, mute, ink, line, bg } = useColors();
  const D = data;

  const stats = [
    { label: 'Years in',  value: `${new Date().getFullYear() - 2011}+` },
    { label: 'Roles',     value: D.work.length },
    { label: 'Projects',  value: D.projects.length },
    { label: 'Certs',     value: D.certifications.length || '—' },
    { label: 'Langs',     value: D.skills.filter((s) => s.cat === 'Languages').length },
    { label: 'Since',     value: '2011' },
  ];

  return (
    <div>
      <div style={{ color: mute, marginBottom: 16 }}>
        <span style={{ color: accent }}>#</span> about
      </div>

      <pre style={{ margin: 0, fontSize: 13, lineHeight: 1.65, color: ink, whiteSpace: 'pre-wrap', fontFamily: 'inherit', maxWidth: 720 }}>
        {`> cat about.md\n`}
        <div style={{ marginTop: 14, color: mute }}>{D.pitch}</div>
        <div style={{ marginTop: 14, color: mute }}>{D.longPitch}</div>
      </pre>

      <div
        style={{
          marginTop: 32,
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 1,
          background: line,
          border: `1px solid ${line}`,
          maxWidth: 720,
        }}
      >
        {stats.map((s) => (
          <div key={s.label} style={{ padding: '14px 16px', background: bg }}>
            <div style={{ fontSize: 22, color: accent, fontVariantNumeric: 'tabular-nums', fontWeight: 500 }}>
              {s.value}
            </div>
            <div style={{ fontSize: 10, color: mute, textTransform: 'uppercase', letterSpacing: 1, marginTop: 2 }}>
              {s.label}
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 32, color: mute, fontSize: 12 }}>
        <span style={{ color: accent }}>$</span> _<span className="v2-blink">▊</span>
      </div>
    </div>
  );
}
