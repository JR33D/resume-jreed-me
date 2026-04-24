'use client';

import { useColors, useIsMobile } from '@/lib/theme';
import { data, type Certification } from '@/lib/data';

function CertBadge({ cert, accent, mute, line }: { cert: Certification; accent: string; mute: string; line: string }) {
  if (cert.status === 'in-progress') {
    return (
      <span style={{ color: accent, fontVariantNumeric: 'tabular-nums' }}>
        working towards<span className="v2-blink">▊</span>
      </span>
    );
  }
  if (cert.status === 'expired') {
    return (
      <span style={{ fontVariantNumeric: 'tabular-nums' }}>
        <span style={{ color: mute }}>{cert.year}</span>
        <span style={{
          marginLeft: 6,
          fontSize: 9,
          border: `1px solid ${line}`,
          padding: '1px 5px',
          color: mute,
          letterSpacing: 0.5,
          textTransform: 'uppercase',
          verticalAlign: 'middle',
        }}>
          expired
        </span>
      </span>
    );
  }
  return <span style={{ color: mute, fontVariantNumeric: 'tabular-nums' }}>{cert.year}</span>;
}

export default function Certs() {
  const { accent, mute, ink, line } = useColors();
  const isMobile = useIsMobile();
  const D = data;

  const hasVolunteer = D.volunteer.length > 0;

  return (
    <div>
      <div style={{ color: mute, marginBottom: 16 }}>
        <span style={{ color: accent }}>#</span> certifications{hasVolunteer ? ' + volunteer' : ''}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: hasVolunteer && !isMobile ? '1fr 1fr' : '1fr', gap: 24, maxWidth: hasVolunteer ? undefined : 640 }}>
        {/* Certifications */}
        <div>
          <div style={{ fontSize: 11, color: accent, letterSpacing: 0.8, marginBottom: 8 }}>## CERTIFICATIONS</div>
          <div style={{ border: `1px solid ${line}` }}>
            {D.certifications.map((c, i) => (
              <div
                key={i}
                style={{
                  padding: '11px 14px',
                  borderBottom: i === D.certifications.length - 1 ? 'none' : `1px solid ${line}`,
                  borderLeft: c.status === 'in-progress' ? `2px solid ${accent}` : undefined,
                }}
              >
                <div style={{ fontSize: 12, color: ink, marginBottom: 4 }}>{c.name}</div>
                <div style={{ fontSize: 11, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: mute }}>{c.issuer}</span>
                  <CertBadge cert={c} accent={accent} mute={mute} line={line} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Volunteer — only rendered when data exists */}
        {hasVolunteer && (
          <div>
            <div style={{ fontSize: 11, color: accent, letterSpacing: 0.8, marginBottom: 8 }}>## VOLUNTEER</div>
            <div style={{ border: `1px solid ${line}` }}>
              {D.volunteer.map((v, i) => (
                <div
                  key={i}
                  style={{
                    padding: '11px 14px',
                    borderBottom: i === D.volunteer.length - 1 ? 'none' : `1px solid ${line}`,
                  }}
                >
                  <div style={{ fontSize: 12, color: ink, marginBottom: 3 }}>{v.role}</div>
                  <div style={{ fontSize: 11, color: mute, marginBottom: 6 }}>
                    {v.org} · {v.period}
                  </div>
                  <div style={{ fontSize: 11, color: mute, lineHeight: 1.5 }}>{v.blurb}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
