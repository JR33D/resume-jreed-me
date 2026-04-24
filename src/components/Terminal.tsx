'use client';

import { useState, useEffect } from 'react';
import { useColors, useTheme } from '@/lib/theme';

/** Derives the live UTC offset string from an IANA timezone name.
 *  Handles DST automatically — re-evaluates every minute. */
function LocalOffset({ tz }: { tz: string }) {
  const [offset, setOffset] = useState('');

  useEffect(() => {
    function compute() {
      // Intl formats e.g. "GMT-5" or "GMT+5:30" — we strip "GMT"
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
import { data } from '@/lib/data';
import TweaksPanel from './TweaksPanel';
import About from './sections/About';
import Work from './sections/Work';
import Projects from './sections/Projects';
import Skills from './sections/Skills';
import Certs from './sections/Certs';
import BlogIndex from './sections/BlogIndex';
import Contact from './sections/Contact';

type TabId = 'about' | 'work' | 'projects' | 'skills' | 'certs' | 'blog' | 'contact';

const TABS: { id: TabId; file: string }[] = [
  { id: 'about',    file: 'about.md' },
  { id: 'work',     file: 'work.log' },
  { id: 'projects', file: 'projects.json' },
  { id: 'skills',   file: 'skills.toml' },
  { id: 'certs',    file: 'certs.md' },
  { id: 'blog',     file: 'blog/index.md' },
  { id: 'contact',  file: 'contact.sh' },
];

export default function Terminal() {
  const { dark, setDark, accent } = useTheme();
  const { bg, surface, ink, mute, line, soft, pad } = useColors();
  const [tab, setTab] = useState<TabId>('about');
  const [tweaksOpen, setTweaksOpen] = useState(false);
  const D = data;

  const activeFile = TABS.find((t) => t.id === tab)!.file;

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        background: bg,
        color: ink,
        display: 'flex',
        flexDirection: 'column',
        fontFamily: '"JetBrains Mono", "SF Mono", Menlo, monospace',
        fontSize: 13,
        transition: 'background .3s, color .3s',
      }}
    >
      <style>{`
        .v2-tab { transition: all .15s; cursor: pointer; display: flex; align-items: center; }
        .v2-tab:hover { background: ${soft}; }
        .v2-tab-close { margin-left: 8px; font-size: 11px; opacity: 0; color: ${mute}; line-height: 1; transition: opacity .1s; }
        .v2-tab:hover .v2-tab-close { opacity: 0.5; }
        .v2-link { color: ${accent}; text-decoration: none; border-bottom: 1px dashed ${accent}40; transition: border-color .15s; }
        .v2-link:hover { border-bottom-color: ${accent}; }
        .v2-row:hover { background: ${soft}; }
        .v2-chip { transition: all .12s; cursor: pointer; user-select: none; }
        .v2-chip:hover { color: ${ink}; border-color: ${accent}; }
        input::placeholder, textarea::placeholder { color: ${mute}; }
      `}</style>

      {/* Title bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          padding: '8px 14px',
          background: surface,
          borderBottom: `1px solid ${line}`,
          gap: 8,
          flexShrink: 0,
        }}
      >
        <div style={{ display: 'flex', gap: 6 }}>
          <span style={{ width: 10, height: 10, borderRadius: 5, background: '#ed6a5e', display: 'inline-block' }} />
          <span style={{ width: 10, height: 10, borderRadius: 5, background: '#f4bf50', display: 'inline-block' }} />
          <span style={{ width: 10, height: 10, borderRadius: 5, background: '#61c554', display: 'inline-block' }} />
        </div>
        <div style={{ flex: 1, textAlign: 'center', fontSize: 11, color: mute, letterSpacing: 0.5 }}>
          ~/jeremy-reed — zsh — {activeFile}
        </div>
        <button
          onClick={() => setDark(!dark)}
          style={{
            background: 'transparent',
            border: `1px solid ${line}`,
            color: mute,
            padding: '3px 8px',
            fontSize: 10,
            fontFamily: 'inherit',
            cursor: 'pointer',
            letterSpacing: 0.5,
          }}
        >
          {dark ? '☀ LIGHT' : '☾ DARK'}
        </button>
      </div>

      {/* Tab bar */}
      <div
        style={{
          display: 'flex',
          background: bg,
          borderBottom: `1px solid ${line}`,
          fontSize: 12,
          overflowX: 'auto',
          flexShrink: 0,
        }}
      >
        {TABS.map((t) => (
          <div
            key={t.id}
            className="v2-tab"
            onClick={() => setTab(t.id)}
            style={{
              padding: '10px 16px',
              borderRight: `1px solid ${line}`,
              borderBottom: `2px solid ${tab === t.id ? accent : 'transparent'}`,
              color: tab === t.id ? ink : mute,
              background: tab === t.id ? soft : 'transparent',
              whiteSpace: 'nowrap',
            }}
          >
            <span style={{ color: mute, marginRight: 6 }}>◦</span>
            {t.file}
            <span className="v2-tab-close">×</span>
          </div>
        ))}
      </div>

      {/* Body */}
      <div style={{ flex: 1, overflow: 'hidden', display: 'flex' }}>
        {/* Sidebar */}
        <div
          style={{
            width: 230,
            borderRight: `1px solid ${line}`,
            padding: `${pad}px 16px`,
            fontSize: 12,
            flexShrink: 0,
            overflowY: 'auto',
          }}
        >
          <div style={{ color: mute, marginBottom: 14, letterSpacing: 0.8 }}>// WHOAMI</div>
          <div style={{ marginBottom: 4, fontSize: 15, color: ink, fontWeight: 500 }}>{D.name}</div>
          <div style={{ color: mute, marginBottom: 20, lineHeight: 1.5 }}>{D.title}</div>

          <div style={{ borderTop: `1px solid ${line}`, paddingTop: 16, color: mute, fontSize: 11, lineHeight: 1.9 }}>
            <div><span style={{ color: accent }}>loc</span> = &quot;{D.location}&quot;</div>
            <div><span style={{ color: accent }}>exp</span> = {D.exp}</div>
            <div><span style={{ color: accent }}>tz</span> = &quot;{D.tz}&quot;</div>
            <div><span style={{ color: accent }}>offset</span> = &quot;<LocalOffset tz={D.tz} />&quot;</div>
            <div><span style={{ color: accent }}>status</span> = <span style={{ color: D.available ? '#22c55e' : mute }}>{D.available ? 'open' : 'closed'}</span></div>
          </div>

          <div style={{ marginTop: 28, color: mute, marginBottom: 12, letterSpacing: 0.8, fontSize: 11 }}>// LINKS</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: 12 }}>
            <a className="v2-link" href={`mailto:${D.email}`}>→ email</a>
            <a className="v2-link" href={`https://github.com/${D.github}`} target="_blank" rel="noopener noreferrer">→ github/{D.github}</a>
            <a className="v2-link" href={`https://linkedin.com/in/${D.linkedin}`} target="_blank" rel="noopener noreferrer">→ linkedin/in/{D.linkedin}</a>
            <a className="v2-link" href="/resume.pdf" download>→ resume.pdf</a>
          </div>

          <div style={{ marginTop: 28, color: mute, marginBottom: 12, letterSpacing: 0.8, fontSize: 11 }}>// STATS</div>
          <div style={{ fontSize: 11, color: mute, lineHeight: 1.9 }}>
            <div>{D.work.length} roles · {D.projects.length} projects</div>
            <div>{D.certifications.length} certs</div>
          </div>
        </div>

        {/* Main pane */}
        <div
          style={{
            flex: 1,
            padding: `${pad}px ${Math.round(pad * 1.3)}px`,
            minWidth: 0,
            overflowY: 'auto',
          }}
        >
          {tab === 'about'    && <About />}
          {tab === 'work'     && <Work />}
          {tab === 'projects' && <Projects />}
          {tab === 'skills'   && <Skills />}
          {tab === 'certs'    && <Certs />}
          {tab === 'blog'     && <BlogIndex />}
          {tab === 'contact'  && <Contact />}
        </div>
      </div>

      {/* Status bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 20,
          padding: '4px 14px',
          background: surface,
          borderTop: `1px solid ${line}`,
          fontSize: 10,
          color: mute,
          letterSpacing: 0.5,
          flexShrink: 0,
        }}
      >
        <span style={{ color: accent }}>● {tab.toUpperCase()}</span>
        <span>utf-8</span>
        <span>LF</span>
        <span style={{ flex: 1 }} />
        <span>ln 1, col 1</span>
        <span>spaces: 2</span>
        <button
          onClick={() => setTweaksOpen(true)}
          style={{
            background: 'transparent',
            border: 'none',
            color: mute,
            fontFamily: 'inherit',
            fontSize: 10,
            cursor: 'pointer',
            padding: '0 4px',
            letterSpacing: 0.5,
          }}
        >
          ⚙ tweaks
        </button>
      </div>

      {tweaksOpen && <TweaksPanel onClose={() => setTweaksOpen(false)} />}
    </div>
  );
}
