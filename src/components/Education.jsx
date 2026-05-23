import educationData from '../data/education.json';

export default function Education() {
  const { education } = educationData;
  const edu = education[0];

  return (
    <section id="education" className="section">
      <div className="container">

        {/* Header */}
        <div className="fade-up" style={{ marginBottom: 48 }}>
          <p className="section-label">Education</p>
          <h2 className="section-title">
            Where it all<br /><span>started.</span>
          </h2>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1.2fr',
          gap: 28,
          alignItems: 'start',
        }} className="edu-grid">

          {/* ── Main Card ── */}
          <div className="fade-left card" style={{ padding: '32px 36px' }}>
            {/* Institution badge */}
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 10,
              padding: '8px 14px',
              background: 'var(--accent-dim)',
              border: '1px solid var(--accent-border)',
              borderRadius: 10,
              marginBottom: 22,
            }}>
              <span style={{ fontSize: '1.3rem' }}>🎓</span>
              <span style={{
                fontFamily: 'var(--font-mono)', fontSize: '0.72rem',
                color: 'var(--accent)', letterSpacing: '0.08em',
              }}>{edu.shortName}</span>
            </div>

            <h3 style={{
              fontSize: '1.2rem', fontWeight: 700,
              fontFamily: 'var(--font-heading)',
              color: 'var(--text)', marginBottom: 8, lineHeight: 1.35,
            }}>
              {edu.institution}
            </h3>

            <p style={{
              color: 'var(--accent)', fontSize: '0.9rem',
              fontWeight: 500, marginBottom: 6,
            }}>
              {edu.shortDegree}
            </p>

            <div style={{ display: 'flex', gap: 16, marginBottom: 24, flexWrap: 'wrap' }}>
              <span style={{ fontSize: '0.82rem', color: 'var(--text-subtle)', display: 'flex', alignItems: 'center', gap: 5 }}>
                📅 {edu.period}
              </span>
              <span style={{ fontSize: '0.82rem', color: 'var(--text-subtle)', display: 'flex', alignItems: 'center', gap: 5 }}>
                📍 {edu.location}
              </span>
            </div>

            <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', lineHeight: 1.75, marginBottom: 24 }}>
              {edu.description}
            </p>

            {/* CGPA */}
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 10,
              padding: '12px 20px',
              background: 'linear-gradient(135deg, rgba(0,200,255,0.08), rgba(139,92,246,0.08))',
              border: '1px solid var(--accent-border)',
              borderRadius: 12,
              marginBottom: 22,
            }}>
              <span style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '1.6rem', fontWeight: 700,
                background: 'linear-gradient(135deg, var(--accent), var(--purple))',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>{edu.cgpa}</span>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>CGPA</span>
            </div>

            {/* Coursework */}
            <div>
              <p style={{
                fontFamily: 'var(--font-mono)', fontSize: '0.7rem',
                color: 'var(--text-subtle)', letterSpacing: '0.12em',
                textTransform: 'uppercase', marginBottom: 10,
              }}>Relevant Coursework</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
                {edu.coursework.map(c => (
                  <span key={c} style={{
                    padding: '4px 10px', borderRadius: 6,
                    fontSize: '0.75rem',
                    background: 'var(--bg-surface)',
                    border: '1px solid var(--border)',
                    color: 'var(--text-muted)',
                  }}>{c}</span>
                ))}
              </div>
            </div>
          </div>

          {/* ── Highlights Column ── */}
          <div className="fade-right" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <p style={{
              fontFamily: 'var(--font-mono)', fontSize: '0.7rem',
              color: 'var(--text-subtle)', letterSpacing: '0.12em',
              textTransform: 'uppercase', marginBottom: 4,
            }}>
              Undergraduate Highlights
            </p>
            {edu.highlights.map((h, i) => (
              <div
                key={i}
                className={`fade-up delay-${i + 1} card`}
                style={{ padding: '18px 22px', display: 'flex', gap: 16, alignItems: 'flex-start' }}
              >
                <span style={{
                  fontSize: '1.5rem', flexShrink: 0,
                  width: 42, height: 42,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: 'var(--accent-dim)', borderRadius: 10,
                }}>
                  {h.icon}
                </span>
                <div>
                  <h4 style={{
                    fontSize: '0.92rem', fontWeight: 600,
                    color: 'var(--text)', marginBottom: 5,
                    fontFamily: 'var(--font-heading)',
                  }}>{h.title}</h4>
                  <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                    {h.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 800px) {
          .edu-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
