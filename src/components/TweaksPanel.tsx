'use client';

import { useTheme, useColors, ACCENTS, type Density } from '@/lib/theme';

const DENSITIES: Density[] = ['compact', 'comfortable', 'spacious'];

export default function TweaksPanel({ onClose }: { onClose: () => void }) {
  const { accent, setAccent, density, setDensity, dark, setDark } = useTheme();
  const { line } = useColors();

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 36,
        right: 20,
        width: 260,
        background: '#17171a',
        color: '#e5e4e0',
        borderRadius: 8,
        boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
        border: '1px solid rgba(255,255,255,0.1)',
        zIndex: 1000,
        fontFamily: '"JetBrains Mono", monospace',
        fontSize: 12,
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          padding: '10px 12px',
          borderBottom: `1px solid ${line}`,
        }}
      >
        <div style={{ fontSize: 11, flex: 1, color: 'rgba(229,228,224,0.6)', letterSpacing: 0.8 }}>
          // TWEAKS.CONF
        </div>
        <button
          onClick={onClose}
          style={{ background: 'transparent', border: 'none', color: 'inherit', cursor: 'pointer', fontSize: 16, padding: 0, lineHeight: 1 }}
        >
          ×
        </button>
      </div>

      <div style={{ padding: 12, display: 'flex', flexDirection: 'column', gap: 14 }}>
        {/* Accent */}
        <div>
          <div style={{ fontSize: 10, color: 'rgba(229,228,224,0.5)', textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 8 }}>
            accent
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 6 }}>
            {ACCENTS.map((a) => (
              <button
                key={a.value}
                onClick={() => setAccent(a.value)}
                title={a.name}
                style={{
                  width: '100%',
                  aspectRatio: '1',
                  background: a.value,
                  cursor: 'pointer',
                  border: accent === a.value ? '2px solid #fff' : '2px solid transparent',
                  borderRadius: 4,
                  padding: 0,
                }}
              />
            ))}
          </div>
        </div>

        {/* Density */}
        <div>
          <div style={{ fontSize: 10, color: 'rgba(229,228,224,0.5)', textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 8 }}>
            density
          </div>
          <div style={{ display: 'flex', gap: 4 }}>
            {DENSITIES.map((d) => (
              <button
                key={d}
                onClick={() => setDensity(d)}
                style={{
                  flex: 1,
                  padding: '6px 8px',
                  fontSize: 11,
                  background: density === d ? accent : 'transparent',
                  color: density === d ? '#0e0e10' : '#e5e4e0',
                  border: '1px solid rgba(255,255,255,0.12)',
                  borderRadius: 4,
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                  textTransform: 'lowercase',
                }}
              >
                --{d}
              </button>
            ))}
          </div>
        </div>

        {/* Theme */}
        <div>
          <div style={{ fontSize: 10, color: 'rgba(229,228,224,0.5)', textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 8 }}>
            theme
          </div>
          <div style={{ display: 'flex', gap: 4 }}>
            {([['dark', true], ['light', false]] as const).map(([label, val]) => (
              <button
                key={label}
                onClick={() => setDark(val)}
                style={{
                  flex: 1,
                  padding: '6px 8px',
                  fontSize: 11,
                  background: dark === val ? accent : 'transparent',
                  color: dark === val ? '#0e0e10' : '#e5e4e0',
                  border: '1px solid rgba(255,255,255,0.12)',
                  borderRadius: 4,
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                }}
              >
                --{label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
