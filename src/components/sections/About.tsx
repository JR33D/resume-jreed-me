'use client';

import { useState, useEffect } from 'react';
import { useColors, useIsMobile } from '@/lib/theme';
import { data } from '@/lib/data';

function LocalOffset({ tz }: { tz: string }) {
  const [offset, setOffset] = useState('');
  useEffect(() => {
    function compute() {
      const parts = new Intl.DateTimeFormat('en', {
        timeZone: tz,
        timeZoneName: 'shortOffset',
      }).formatToParts(new Date());
      const raw = parts.find((p) => p.type === 'timeZoneName')?.value ?? '';
      setOffset(raw.replace('GMT', 'UTC'));
    }
    compute();
    const id = setInterval(compute, 60_000);
    return () => clearInterval(id);
  }, [tz]);
  return <>{offset}</>;
}

export default function About() {
  const { accent, mute, ink, line, bg } = useColors();
  const isMobile = useIsMobile();
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

      {/* ── Mobile identity card (replaces hidden sidebar) ── */}
      {isMobile && (
        <div style={{ border: `1px solid ${line}`, marginBottom: 24 }}>
          <div style={{ padding: '14px 16px', borderBottom: `1px solid ${line}` }}>
            <div style={{ fontSize: 15, color: ink, fontWeight: 500, marginBottom: 2 }}>{D.name}</div>
            <div style={{ fontSize: 12, color: mute }}>{D.title}</div>
          </div>

          <div style={{ padding: '12px 16px', borderBottom: `1px solid ${line}`, fontSize: 11, color: mute, lineHeight: 2 }}>
            <div><span style={{ color: accent }}>loc</span> = &quot;{D.location}&quot;</div>
            <div><span style={{ color: accent }}>exp</span> = {D.exp}</div>
            <div><span style={{ color: accent }}>tz</span> = &quot;<LocalOffset tz={D.tz} />&quot;</div>
            <div>
              <span style={{ color: accent }}>status</span> ={' '}
              <span style={{ color: D.available ? '#22c55e' : mute }}>{D.available ? 'open' : 'closed'}</span>
            </div>
          </div>

          <div style={{ padding: '12px 16px', display: 'flex', flexDirection: 'column', gap: 8, fontSize: 12 }}>
            <a className="v2-link" href={`mailto:${D.email}`}>→ email</a>
            <a className="v2-link" href={`https://github.com/${D.github}`} target="_blank" rel="noopener noreferrer">→ github/{D.github}</a>
            <a className="v2-link" href={`https://linkedin.com/in/${D.linkedin}`} target="_blank" rel="noopener noreferrer">→ linkedin/in/{D.linkedin}</a>
            <a className="v2-link" href="/resume.pdf" download>→ resume.pdf</a>
          </div>
        </div>
      )}

      {/* ── Bio ── */}
      <pre style={{ margin: 0, fontSize: 13, lineHeight: 1.65, color: ink, whiteSpace: 'pre-wrap', fontFamily: 'inherit', maxWidth: 720 }}>
        {`> cat about.md\n`}
        <div style={{ marginTop: 14, color: mute }}>{D.pitch}</div>
        <div style={{ marginTop: 14, color: mute }}>{D.longPitch}</div>
      </pre>

      {/* ── Stats grid ── */}
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
