'use client';

import { useState } from 'react';
import { useColors } from '@/lib/theme';
import { data } from '@/lib/data';

type Status = 'idle' | 'loading' | 'success' | 'error';

export default function Contact() {
  const { accent, mute, ink, line } = useColors();
  const D = data;

  const [email,   setEmail]   = useState('');
  const [message, setMessage] = useState('');
  const [status,  setStatus]  = useState<Status>('idle');
  const [errMsg,  setErrMsg]  = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('loading');
    setErrMsg('');

    try {
      const res = await fetch('/api/contact', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ email, message }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? 'Unknown error');
      setStatus('success');
      setEmail('');
      setMessage('');
    } catch (err) {
      setErrMsg(err instanceof Error ? err.message : 'Something went wrong.');
      setStatus('error');
    }
  }

  const inputStyle: React.CSSProperties = {
    width:       '100%',
    background:  'transparent',
    border:      'none',
    borderBottom: `1px solid ${line}`,
    color:       ink,
    fontFamily:  'inherit',
    fontSize:    12,
    padding:     '6px 0',
    outline:     'none',
    marginBottom: 10,
    boxSizing:   'border-box',
  };

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
        <a className="v2-link" href="/resume.pdf" download>&quot;./resume.pdf&quot;</a>
        {`\n\n# Open to:\n#   - Solutions architecture engagements\n#   - Speaking / workshops\n#   - Long-term fractional work\n\n`}
        <span style={{ color: mute }}>{'$ send --to "$email"'}</span>
        <span className="v2-blink">▊</span>
      </pre>

      <form onSubmit={handleSubmit} style={{ marginTop: 24, maxWidth: 520, border: `1px solid ${line}` }}>
        <div style={{ padding: '8px 12px', borderBottom: `1px solid ${line}`, fontSize: 11, color: mute, letterSpacing: 0.5 }}>
          // quick-message --inline
        </div>

        <div style={{ padding: 14 }}>
          {status === 'success' ? (
            <div style={{ fontSize: 12, color: accent, padding: '8px 0' }}>
              ✓ Message sent. I&apos;ll be in touch.
            </div>
          ) : (
            <>
              <input
                type="email"
                required
                placeholder="your email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                disabled={status === 'loading'}
                style={inputStyle}
              />
              <textarea
                required
                placeholder="message..."
                rows={3}
                value={message}
                onChange={e => setMessage(e.target.value)}
                disabled={status === 'loading'}
                style={{ ...inputStyle, borderBottom: 'none', resize: 'none', marginBottom: 0 }}
              />
              {status === 'error' && (
                <div style={{ fontSize: 11, color: '#f87171', marginTop: 6 }}>
                  ✗ {errMsg}
                </div>
              )}
              <button
                type="submit"
                disabled={status === 'loading'}
                style={{
                  marginTop:   8,
                  background:  status === 'loading' ? 'transparent' : accent,
                  color:       status === 'loading' ? mute : '#0e0e10',
                  border:      status === 'loading' ? `1px solid ${line}` : 'none',
                  padding:     '7px 14px',
                  fontSize:    11,
                  fontFamily:  'inherit',
                  fontWeight:  600,
                  cursor:      status === 'loading' ? 'not-allowed' : 'pointer',
                  letterSpacing: 0.5,
                }}
              >
                {status === 'loading' ? 'SENDING...' : 'SEND →'}
              </button>
            </>
          )}
        </div>
      </form>
    </div>
  );
}
