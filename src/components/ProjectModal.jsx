import { useEffect, useState } from 'react';
import {
  FiArrowRight,
  FiAward,
  FiBookOpen,
  FiCamera,
  FiCode,
  FiDatabase,
  FiExternalLink,
  FiFileText,
  FiMonitor,
  FiShoppingBag,
  FiClock,
  FiX,
} from './AppIcons';

const PREVIEW_ICON_BY_ID = {
  directedge: FiShoppingBag,
  kairos: FiClock,
  cookcorner: FiBookOpen,
  healthcare: FiMonitor,
  codecampus: FiBookOpen,
  autotrack: FiCamera,
};

const stripLeadingSymbol = (value) => value.replace(/^[^A-Za-z0-9]+\s*/, '');

export default function ProjectModal({ item, onClose, isPublication }) {
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  if (!item) return null;

  return (
    /* Backdrop */
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 2000,
        background: 'rgba(0,0,0,0.82)',
        backdropFilter: 'blur(12px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '24px 16px',
        overflowY: 'auto',
      }}
    >
      {/* Modal card */}
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--accent-border)',
          borderRadius: 20,
          width: '100%', maxWidth: 780,
          maxHeight: '90vh',
          overflowY: 'auto',
          boxShadow: '0 24px 80px rgba(0,0,0,0.7), 0 0 40px rgba(0,200,255,0.08)',
          position: 'relative',
          animation: 'modal-in 0.28s cubic-bezier(0.34,1.56,0.64,1)',
        }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute', top: 16, right: 16, zIndex: 10,
            width: 36, height: 36, borderRadius: '50%',
            background: 'rgba(0,0,0,0.6)',
            border: '1px solid var(--border)',
            color: 'var(--text-muted)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '1.2rem', cursor: 'pointer',
            transition: 'var(--transition)',
          }}
          onMouseEnter={e => { e.currentTarget.style.color = 'var(--accent)'; e.currentTarget.style.borderColor = 'var(--accent-border)'; }}
          onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-muted)'; e.currentTarget.style.borderColor = 'var(--border)'; }}
        >
          <FiX size={18} />
        </button>

        {/* Hero Image */}
        <div style={{
          height: 240, position: 'relative', overflow: 'hidden',
          borderRadius: '20px 20px 0 0',
          background: 'var(--bg-surface)',
        }}>
          {item.image && !imgError ? (
            <img
              src={item.image}
              alt={item.title}
              onError={() => setImgError(true)}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          ) : (
            <div style={{
              width: '100%', height: '100%',
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center',
              gap: 12,
              background: `linear-gradient(135deg, ${item.fallbackColor}08 0%, var(--bg-card) 100%)`,
            }}>
              {(() => {
                const PreviewIcon = (isPublication ? FiFileText : PREVIEW_ICON_BY_ID[item.id]) || FiShoppingBag;
                return <PreviewIcon size={60} color={item.fallbackColor} />;
              })()}
              <span style={{
                fontFamily: 'var(--font-mono)', fontSize: '0.7rem',
                color: item.fallbackColor, letterSpacing: '0.12em',
              }}>{item.fallbackLabel?.toUpperCase()}</span>
            </div>
          )}
          {/* Overlay gradient */}
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0, height: 80,
            background: 'linear-gradient(to top, var(--bg-card), transparent)',
          }} />
        </div>

        {/* Content */}
        <div style={{ padding: '28px 32px 32px' }}>
          {/* Badges row */}
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 14 }}>
            <span style={{
              padding: '4px 12px', borderRadius: 100,
              fontSize: '0.72rem', fontFamily: 'var(--font-mono)',
              background: 'var(--accent-dim)', color: 'var(--accent)',
              border: '1px solid var(--accent-border)',
            }}>
              {item.category || item.conferenceFullName || item.conference}
            </span>
            {item.award && (
              <span style={{
                padding: '4px 12px', borderRadius: 100,
                fontSize: '0.72rem', fontFamily: 'var(--font-mono)',
                background: 'rgba(245,158,11,0.1)', color: '#f59e0b',
                border: '1px solid rgba(245,158,11,0.25)',
              }}>
                <FiAward size={11} style={{ marginRight: 6, verticalAlign: 'text-bottom' }} />
                {stripLeadingSymbol(item.award.badge)}
              </span>
            )}
            {item.year && (
              <span style={{
                padding: '4px 12px', borderRadius: 100,
                fontSize: '0.72rem', fontFamily: 'var(--font-mono)',
                background: 'var(--purple-dim)', color: 'var(--purple)',
                border: '1px solid var(--purple-border)',
              }}>
                {item.year}
              </span>
            )}
          </div>

          {/* Title */}
          <h2 style={{
            fontSize: '1.4rem', fontWeight: 700,
            fontFamily: 'var(--font-heading)',
            color: 'var(--text)', marginBottom: 14,
            lineHeight: 1.3,
          }}>{item.title}</h2>

          {/* Award detail */}
          {item.award && (
            <a
              href={item.award.link} target="_blank" rel="noopener noreferrer"
              style={{
                display: 'flex', alignItems: 'flex-start', gap: 10,
                padding: '12px 16px', borderRadius: 10,
                background: 'rgba(245,158,11,0.06)',
                border: '1px solid rgba(245,158,11,0.18)',
                marginBottom: 20, textDecoration: 'none',
                transition: 'var(--transition)',
              }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(245,158,11,0.12)'}
              onMouseLeave={e => e.currentTarget.style.background = 'rgba(245,158,11,0.06)'}
            >
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#f59e0b' }}>{item.award.title}</div>
                <div style={{ fontSize: '0.76rem', color: 'var(--text-subtle)', marginTop: 2 }}>{item.award.subtitle}</div>
              </div>
              <FiExternalLink size={14} color="#f59e0b" />
            </a>
          )}

          {/* Publication links */}
          {isPublication && item.links && (
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 20 }}>
              {item.links.paper && (
                <a href={item.links.paper} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-sm">
                  <FiFileText size={13} style={{ marginRight: 6 }} /> IEEE Paper
                </a>
              )}
              {item.links.code && (
                <a href={item.links.code} target="_blank" rel="noopener noreferrer" className="btn btn-outline btn-sm">
                  <FiCode size={13} style={{ marginRight: 6 }} /> GitHub Code
                </a>
              )}
              {item.links.dataset && (
                <a href={item.links.dataset} target="_blank" rel="noopener noreferrer" className="btn btn-ghost btn-sm">
                  <FiDatabase size={13} style={{ marginRight: 6 }} /> Dataset
                </a>
              )}
            </div>
          )}

          {/* Description */}
          <p style={{ color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: 24, fontSize: '0.95rem' }}>
            {item.fullDesc}
          </p>

          {/* Tech stack */}
          <div style={{ marginBottom: 24 }}>
            <h4 style={{ fontSize: '0.8rem', fontFamily: 'var(--font-mono)', color: 'var(--text-subtle)', letterSpacing: '0.1em', marginBottom: 10, textTransform: 'uppercase' }}>
              Technologies
            </h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
              {item.tech.map(t => (
                <span key={t} className="tech-pill">{t}</span>
              ))}
            </div>
          </div>

          {/* Features / Contributions */}
          {(item.features || item.contributions) && (
            <div style={{ marginBottom: 24 }}>
              <h4 style={{ fontSize: '0.8rem', fontFamily: 'var(--font-mono)', color: 'var(--text-subtle)', letterSpacing: '0.1em', marginBottom: 12, textTransform: 'uppercase' }}>
                {item.features ? 'Key Features' : 'Contributions'}
              </h4>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {(item.features || item.contributions).map((f, i) => (
                  <li key={i} style={{
                    display: 'flex', gap: 10, alignItems: 'flex-start',
                    fontSize: '0.88rem', color: 'var(--text-muted)',
                  }}>
                    <span style={{ color: 'var(--accent)', marginTop: 1, flexShrink: 0 }}>›</span>
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Non-publication links */}
          {!isPublication && (
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: item.gallery?.length ? 28 : 0 }}>
              {item.github && (
                <a href={item.github} target="_blank" rel="noopener noreferrer" className="btn btn-outline btn-sm">
                  ⌥ GitHub Repo
                </a>
              )}
              {item.live && (
                <a href={item.live} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-sm">
                  <FiArrowRight size={13} style={{ marginRight: 6 }} /> Live Demo
                </a>
              )}
            </div>
          )}

          {/* Gallery */}
          {item.gallery && item.gallery.length > 0 && (
            <div>
              <h4 style={{ fontSize: '0.8rem', fontFamily: 'var(--font-mono)', color: 'var(--text-subtle)', letterSpacing: '0.1em', marginBottom: 12, textTransform: 'uppercase' }}>
                Gallery
              </h4>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
                gap: 10,
              }}>
                {item.gallery.map((g, i) => (
                  <div key={i} style={{
                    borderRadius: 10, overflow: 'hidden',
                    border: '1px solid var(--border)',
                    background: 'var(--bg-surface)',
                  }}>
                    {g.url ? (
                      <img src={g.url} alt={g.caption} style={{ width: '100%', height: 110, objectFit: 'cover', display: 'block' }} />
                    ) : (
                      <div style={{
                        width: '100%', height: 110,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        background: `${item.fallbackColor}08`,
                        fontSize: '2rem',
                      }}>
                        {(() => {
                          const PreviewIcon = (isPublication ? FiFileText : PREVIEW_ICON_BY_ID[item.id]) || FiShoppingBag;
                          return <PreviewIcon size={36} color={item.fallbackColor} />;
                        })()}
                      </div>
                    )}
                    <div style={{ padding: '6px 10px', fontSize: '0.72rem', color: 'var(--text-subtle)' }}>
                      {g.caption}
                    </div>
                  </div>
                ))}
              </div>
              <p style={{ fontSize: '0.72rem', color: 'var(--text-subtle)', marginTop: 10, fontFamily: 'var(--font-mono)', fontStyle: 'italic' }}>
                * Add gallery image URLs to the JSON file to populate this section.
              </p>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes modal-in {
          from { opacity: 0; transform: scale(0.94) translateY(16px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>
    </div>
  );
}
