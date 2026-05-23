import aboutData from '../data/about.json';

export default function Footer() {
  const year = new Date().getFullYear();
  const { social, name } = aboutData;

  return (
    <footer style={{
      borderTop: '1px solid var(--border)',
      background: 'var(--bg)',
      padding: '28px 0',
    }}>
      <div className="container">
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 16,
        }}>
          {/* Left: Logo + copyright */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <span style={{
              fontFamily: 'var(--font-heading)',
              fontWeight: 700, fontSize: '1.1rem',
              color: 'var(--accent)',
            }}>
              Noman<span style={{ color: 'var(--text-subtle)' }}>.</span>
            </span>
            <span style={{ color: 'var(--text-subtle)', fontSize: '0.78rem' }}>
              © {year} {name}. Built with React.
            </span>
          </div>

          {/* Right: social icons */}
          <div style={{ display: 'flex', gap: 10 }}>
            {Object.entries(social).map(([platform, url]) => (
              <a
                key={platform}
                href={url} target="_blank" rel="noopener noreferrer"
                aria-label={platform}
                style={{
                  width: 32, height: 32, borderRadius: 7,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border)',
                  color: 'var(--text-subtle)',
                  fontSize: '0.75rem',
                  transition: 'var(--transition)',
                  fontFamily: 'var(--font-mono)',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                }}
                onMouseEnter={e => { e.currentTarget.style.color='var(--accent)'; e.currentTarget.style.borderColor='var(--accent-border)'; e.currentTarget.style.background='var(--accent-dim)'; }}
                onMouseLeave={e => { e.currentTarget.style.color='var(--text-subtle)'; e.currentTarget.style.borderColor='var(--border)'; e.currentTarget.style.background='var(--bg-card)'; }}
              >
                {platform[0].toUpperCase()}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
