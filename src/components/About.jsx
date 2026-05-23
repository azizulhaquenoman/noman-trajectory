import aboutData from '../data/about.json';

export default function About() {
  const { name, summary, photo, location, email, stats, social } = aboutData;

  return (
    <section id="about" className="section">
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1.4fr',
          gap: 72,
          alignItems: 'center',
        }} className="about-grid">

          {/* ── Photo Column ── */}
          <div className="fade-left" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24 }}>

            {/* Photo frame */}
            <div style={{ position: 'relative' }}>
              {/* Outer glow ring */}
              <div style={{
                position: 'absolute', inset: -3,
                borderRadius: '22px',
                background: 'linear-gradient(135deg, var(--accent), var(--purple))',
                zIndex: 0,
                filter: 'blur(1px)',
              }} />

              {/* Photo */}
              <div style={{
                position: 'relative', zIndex: 1,
                width: 280, height: 320,
                borderRadius: 20,
                overflow: 'hidden',
                background: 'var(--bg-card)',
              }}>
                <img
                  src={photo}
                  alt={name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  onError={e => {
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.nextSibling.style.display = 'flex';
                  }}
                />
                {/* Fallback if no photo */}
                <div style={{
                  display: 'none',
                  width: '100%', height: '100%',
                  alignItems: 'center', justifyContent: 'center',
                  flexDirection: 'column', gap: 12,
                  background: 'linear-gradient(135deg, var(--bg-card), var(--bg-surface))',
                }}>
                  <span style={{ fontSize: 72 }}>🧑‍💻</span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-subtle)' }}>
                    add profile.jpg
                  </span>
                </div>
              </div>

              {/* Floating badge — location */}
              <div style={{
                position: 'absolute', bottom: -14, right: -14, zIndex: 2,
                background: 'var(--bg-surface)',
                border: '1px solid var(--border)',
                borderRadius: 10,
                padding: '8px 14px',
                display: 'flex', alignItems: 'center', gap: 6,
                fontSize: '0.78rem', color: 'var(--text-muted)',
                boxShadow: 'var(--shadow-card)',
                whiteSpace: 'nowrap',
              }}>
                <span>📍</span> {location}
              </div>
            </div>

            {/* Stats row */}
            <div style={{
              display: 'grid', gridTemplateColumns: '1fr 1fr',
              gap: 12, width: '100%', maxWidth: 300,
            }}>
              {stats.map((s, i) => (
                <div key={i} style={{
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border)',
                  borderRadius: 12,
                  padding: '14px 16px',
                  textAlign: 'center',
                  transition: 'var(--transition)',
                }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent-border)'; e.currentTarget.style.background = 'var(--bg-hover)'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.background = 'var(--bg-card)'; }}
                >
                  <div style={{
                    fontSize: '1.6rem', fontWeight: 700,
                    fontFamily: 'var(--font-heading)',
                    color: 'var(--accent)', lineHeight: 1.2,
                  }}>{s.value}</div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-subtle)', marginTop: 4 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Text Column ── */}
          <div className="fade-right">
            <p className="section-label">About Me</p>
            <h2 className="section-title">
              Driven by curiosity,<br />
              <span>guided by code.</span>
            </h2>

            {summary.split('\n\n').map((para, i) => (
              <p key={i} style={{
                color: 'var(--text-muted)', lineHeight: 1.85,
                fontSize: '1rem', marginBottom: 18,
              }}>
                {para}
              </p>
            ))}

            {/* Quick info row */}
            <div style={{
              display: 'flex', flexDirection: 'column', gap: 10,
              margin: '28px 0',
              padding: '20px 24px',
              background: 'var(--bg-card)',
              border: '1px solid var(--border)',
              borderRadius: 12,
            }}>
              {[
                { icon: '🎓', label: 'Studying at', value: 'United International University, Dhaka' },
                { icon: '📧', label: 'Email', value: email },
                { icon: '🗺️', label: 'Based in', value: location },
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <span style={{ fontSize: '1rem' }}>{item.icon}</span>
                  <span style={{ color: 'var(--text-subtle)', fontSize: '0.82rem', width: 90, flexShrink: 0 }}>{item.label}</span>
                  <span style={{ color: 'var(--text)', fontSize: '0.88rem', fontWeight: 500 }}>{item.value}</span>
                </div>
              ))}
            </div>

            {/* Social links */}
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              {Object.entries(social).map(([platform, url]) => (
                <a
                  key={platform}
                  href={url} target="_blank" rel="noopener noreferrer"
                  style={{
                    padding: '7px 16px',
                    borderRadius: 8,
                    fontSize: '0.8rem',
                    fontWeight: 500,
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border)',
                    color: 'var(--text-muted)',
                    transition: 'var(--transition)',
                    textTransform: 'capitalize',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.color='var(--accent)'; e.currentTarget.style.borderColor='var(--accent-border)'; e.currentTarget.style.background='var(--accent-dim)'; }}
                  onMouseLeave={e => { e.currentTarget.style.color='var(--text-muted)'; e.currentTarget.style.borderColor='var(--border)'; e.currentTarget.style.background='var(--bg-card)'; }}
                >
                  {platform === 'github' && '⌥ '}
                  {platform === 'linkedin' && '◈ '}
                  {platform === 'twitter' && '✕ '}
                  {platform === 'facebook' && 'ƒ '}
                  {platform === 'instagram' && '⬡ '}
                  {platform}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 860px) {
          .about-grid {
            grid-template-columns: 1fr !important;
            gap: 48px !important;
            text-align: center;
          }
          .about-grid > div:first-child { align-items: center !important; }
          .about-grid > div:last-child > div { justify-content: center !important; }
        }
      `}</style>
    </section>
  );
}
