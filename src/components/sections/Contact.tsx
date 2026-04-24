'use client';

import { useColors } from '@/lib/theme';
import { data } from '@/lib/data';

export default function Contact() {
  const { accent, mute, ink, line } = useColors();
  const D = data;

  return (
    <div>
      <div style={{ color: mute, marginBottom: 16 }}>
        <span style={{ color: accent }}>#</span> contact · ./reach-out.sh
      </div>

      <pre style={{ margin: 0, fontSize: 13, lineHeight: 1.7, color: ink, fontFamily: 'inherit', whiteSpace: 'pre-wrap' }}>
        {`#!/usr/bin/env bash\n# Reach out — I read every message.\n\n`}
        <span style={{ color: accent }}>email</span>=
        <a className="v2-link" href={`mailto:${D.email}`}>&quot;{D.email}&quot;</a>
        {`\n`}
        <span style={{ color: accent }}>github</span>=
        <a className="v2-link" href={`https://github.com/${D.github}`} target="_blank" rel="noopener noreferrer">
          &quot;https://github.com/{D.github}&quot;
        </a>
        {`\n`}
        <span style={{ color: accent }}>linkedin</span>=
        <a className="v2-link" href={`https://linkedin.com/in/${D.linkedin}`} target="_blank" rel="noopener noreferrer">
          &quot;https://linkedin.com/in/{D.linkedin}&quot;
        </a>
        {`\n`}
        <span style={{ color: accent }}>resume</span>=
        <a className="v2-link" href="#">&quot;./resume.pdf&quot;</a>
        {`\n\n# Open to:\n#   - Solutions architecture engagements\n#   - Speaking / workshops\n#   - Long-term fractional work\n\n`}
        <span style={{ color: mute }}>{'$ send --to "$email"'}</span>
        <span className="v2-blink">▊</span>
      </pre>

      <div style={{ marginTop: 24, maxWidth: 520, border: `1px solid ${line}` }}>
        <div
          style={{
            padding: '8px 12px',
            borderBottom: `1px solid ${line}`,
            fontSize: 11,
            color: mute,
            letterSpacing: 0.5,
          }}
        >
          // quick-message --inline
        </div>
        <div style={{ padding: 14 }}>
          <input
            placeholder="your email"
            style={{
              width: '100%',
              background: 'transparent',
              border: 'none',
              borderBottom: `1px solid ${line}`,
              color: ink,
              fontFamily: 'inherit',
              fontSize: 12,
              padding: '6px 0',
              outline: 'none',
              marginBottom: 10,
              boxSizing: 'border-box',
            }}
          />
          <textarea
            placeholder="message..."
            rows={3}
            style={{
              width: '100%',
              background: 'transparent',
              border: 'none',
              color: ink,
              fontFamily: 'inherit',
              fontSize: 12,
              padding: '6px 0',
              outline: 'none',
              resize: 'none',
              boxSizing: 'border-box',
            }}
          />
          <button
            style={{
              marginTop: 6,
              background: accent,
              color: '#0e0e10',
              border: 'none',
              padding: '7px 14px',
              fontSize: 11,
              fontFamily: 'inherit',
              fontWeight: 600,
              cursor: 'pointer',
              letterSpacing: 0.5,
            }}
          >
            SEND →
          </button>
        </div>
      </div>
    </div>
  );
}
