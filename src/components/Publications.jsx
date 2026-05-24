import { useState } from 'react';
import publicationsData from '../data/publications.json';
import ProjectModal from './ProjectModal';
import {
  FiArrowRight,
  FiCode,
  FiDatabase,
  FiFileText,
} from './AppIcons';

export default function Publications() {
  const { publications } = publicationsData;
  const [selected, setSelected] = useState(null);

  return (
    <section id="publications" className="section">
      <div className="container">

        {/* Header */}
        <div className="fade-up" style={{ marginBottom: 48 }}>
          <p className="section-label">Research</p>
          <h2 className="section-title">
            Published <span>Work.</span>
          </h2>
          <p className="section-subtitle">
            Peer-reviewed research at the intersection of deep learning and real-world surveillance systems.
          </p>
        </div>

        {/* Publication Cards */}
        {publications.map((pub, i) => (
          <div
            key={pub.id}
            className={`pub-card fade-up delay-${i + 1}`}
            style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border)',
              borderRadius: 16,
              overflow: 'hidden',
              display: 'grid',
              gridTemplateColumns: '260px 1fr',
              transition: 'var(--transition)',
              cursor: 'pointer',
              marginBottom: 20,
            }}
            onClick={() => setSelected(pub)}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent-border)'; e.currentTarget.style.boxShadow = 'var(--shadow-glow)'; e.currentTarget.style.transform = 'translateY(-3px)'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'translateY(0)'; }}
          >
            {/* Left: Visual */}
            <div style={{
              background: `linear-gradient(135deg, ${pub.fallbackColor}10 0%, var(--bg-surface) 100%)`,
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center',
              gap: 12, padding: 24,
              borderRight: '1px solid var(--border)',
              minHeight: 200,
            }}>
              <FiFileText size={50} color={pub.fallbackColor} />
              <div style={{
                padding: '4px 12px', borderRadius: 100,
                fontSize: '0.68rem', fontFamily: 'var(--font-mono)',
                background: 'rgba(139,92,246,0.12)',
                color: 'var(--purple)',
                border: '1px solid var(--purple-border)',
                textAlign: 'center',
              }}>
                {pub.conference}
              </div>
            </div>

            {/* Right: Content */}
            <div style={{ padding: '24px 28px', display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                <span style={{
                  padding: '3px 10px', borderRadius: 100,
                  fontSize: '0.68rem', fontFamily: 'var(--font-mono)',
                  background: 'var(--purple-dim)', color: 'var(--purple)',
                  border: '1px solid var(--purple-border)',
                }}>
                  IEEE Publication
                </span>
                <span style={{
                  padding: '3px 10px', borderRadius: 100,
                  fontSize: '0.68rem', fontFamily: 'var(--font-mono)',
                  background: 'var(--accent-dim)', color: 'var(--accent)',
                  border: '1px solid var(--accent-border)',
                }}>
                  {pub.year}
                </span>
              </div>

              <h3 style={{
                fontSize: '1rem', fontWeight: 600,
                fontFamily: 'var(--font-heading)',
                color: 'var(--text)', lineHeight: 1.45,
              }}>
                {pub.title}
              </h3>

              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', lineHeight: 1.7 }}>
                {pub.shortDesc}
              </p>

              {/* Tech */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {pub.tech.slice(0, 5).map(t => (
                  <span key={t} className="tech-pill">{t}</span>
                ))}
              </div>

              {/* Links */}
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 4 }}>
                <a
                  href={pub.links.paper} target="_blank" rel="noopener noreferrer"
                  className="btn btn-primary btn-sm"
                  onClick={e => e.stopPropagation()}
                >
                  <FiFileText size={13} style={{ marginRight: 6 }} /> IEEE Paper
                </a>
                <a
                  href={pub.links.code} target="_blank" rel="noopener noreferrer"
                  className="btn btn-outline btn-sm"
                  onClick={e => e.stopPropagation()}
                >
                  <FiCode size={13} style={{ marginRight: 6 }} /> Code
                </a>
                <a
                  href={pub.links.dataset} target="_blank" rel="noopener noreferrer"
                  className="btn btn-ghost btn-sm"
                  onClick={e => e.stopPropagation()}
                >
                  <FiDatabase size={13} style={{ marginRight: 6 }} /> Dataset
                </a>
                <button
                  className="btn btn-ghost btn-sm"
                  style={{ marginLeft: 'auto' }}
                >
                  View Details <FiArrowRight size={13} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selected && (
        <ProjectModal item={selected} onClose={() => setSelected(null)} isPublication={true} />
      )}

      <style>{`
        @media (max-width: 700px) {
          .pub-card { grid-template-columns: 1fr !important; }
          .pub-card > div:first-child { border-right: none !important; border-bottom: 1px solid var(--border); min-height: 140px !important; }
        }
      `}</style>
    </section>
  );
}
