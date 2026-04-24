'use client';

import { useState } from 'react';
import { useColors } from '@/lib/theme';
import { data } from '@/lib/data';

export default function Work() {
  const { accent, mute, ink, line, soft, rowh } = useColors();
  const [open, setOpen] = useState(0);
  const D = data;

  return (
    <div>
      <div style={{ color: mute, marginBottom: 16 }}>
        <span style={{ color: accent }}>#</span> work history · reverse-chronological
      </div>

      <div style={{ border: `1px solid ${line}` }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '110px 1fr 200px 40px',
            gap: 12,
            padding: '10px 14px',
            borderBottom: `1px solid ${line}`,
            color: mute,
            fontSize: 11,
            textTransform: 'uppercase',
            letterSpacing: 0.8,
            background: soft,
          }}
        >
          <div>period</div>
          <div>role / company</div>
          <div>stack</div>
          <div />
        </div>

        {D.work.map((w, i) => (
          <div key={i}>
            <div
              className="v2-row"
              onClick={() => setOpen(open === i ? -1 : i)}
              style={{
                display: 'grid',
                gridTemplateColumns: '110px 1fr 200px 40px',
                gap: 12,
                padding: `${rowh / 3}px 14px`,
                cursor: 'pointer',
                borderBottom: open === i ? 'none' : `1px solid ${line}`,
                alignItems: 'center',
              }}
            >
              <div style={{ color: mute, fontSize: 12, fontVariantNumeric: 'tabular-nums' }}>{w.period}</div>
              <div>
                <span style={{ color: ink }}>{w.role}</span>
                <span style={{ color: mute }}> @ </span>
                <span style={{ color: accent }}>{w.company}</span>
              </div>
              <div style={{ color: mute, fontSize: 11, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {w.tags.join(' · ')}
              </div>
              <div
                style={{
                  color: mute,
                  textAlign: 'right',
                  transform: open === i ? 'rotate(90deg)' : 'none',
                  transition: 'transform .15s',
                }}
              >
                ›
              </div>
            </div>

            {open === i && (
              <div
                style={{
                  padding: '10px 14px 18px 124px',
                  borderBottom: `1px solid ${line}`,
                  background: soft,
                }}
              >
                <div style={{ color: mute, fontSize: 13, lineHeight: 1.6, maxWidth: 680, marginBottom: 10 }}>
                  {w.summary}
                </div>
                <ul style={{ margin: 0, padding: 0, listStyle: 'none', fontSize: 12, color: mute, lineHeight: 1.75 }}>
                  {w.points.map((p, j) => (
                    <li key={j}>
                      <span style={{ color: accent, marginRight: 8 }}>▹</span>
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
