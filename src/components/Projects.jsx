import { useState } from 'react';
import projectsData from '../data/projects.json';
import ProjectModal from './ProjectModal';

function ProjectCard({ project, onClick }) {
  const [imgError, setImgError] = useState(false);

  return (
    <div
      className="card"
      onClick={onClick}
      style={{ cursor: 'pointer', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}
    >
      {/* Thumbnail */}
      <div style={{ height: 200, position: 'relative', overflow: 'hidden', flexShrink: 0 }}>
        {project.image && !imgError ? (
          <img
            src={project.image}
            alt={project.title}
            onError={() => setImgError(true)}
            style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s ease' }}
            onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
          />
        ) : (
          <div style={{
            width: '100%', height: '100%',
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            gap: 10,
            background: `linear-gradient(135deg, ${project.fallbackColor}10 0%, var(--bg-surface) 100%)`,
          }}>
            <span style={{ fontSize: 52 }}>{project.fallbackIcon}</span>
            <span style={{
              fontFamily: 'var(--font-mono)', fontSize: '0.68rem',
              color: project.fallbackColor, letterSpacing: '0.1em',
            }}>{project.fallbackLabel?.toUpperCase()}</span>
          </div>
        )}

        {/* Award badge */}
        {project.award && (
          <div style={{
            position: 'absolute', top: 12, left: 12,
            padding: '4px 10px', borderRadius: 100,
            fontSize: '0.68rem', fontWeight: 600,
            background: 'rgba(245,158,11,0.15)',
            border: '1px solid rgba(245,158,11,0.4)',
            color: '#f59e0b',
            backdropFilter: 'blur(8px)',
          }}>
            {project.award.badge}
          </div>
        )}

        {/* Category badge */}
        <div style={{
          position: 'absolute', top: 12, right: 12,
          padding: '4px 10px', borderRadius: 100,
          fontSize: '0.68rem',
          background: 'rgba(0,0,0,0.55)',
          border: '1px solid var(--border)',
          color: 'var(--text-muted)',
          backdropFilter: 'blur(8px)',
        }}>
          {project.category}
        </div>
      </div>

      {/* Card body */}
      <div style={{ padding: '20px 22px', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <h3 style={{
          fontSize: '1.05rem', fontWeight: 600,
          fontFamily: 'var(--font-heading)',
          color: 'var(--text)', marginBottom: 8,
        }}>{project.title}</h3>

        <p style={{
          color: 'var(--text-muted)', fontSize: '0.85rem',
          lineHeight: 1.65, marginBottom: 16, flex: 1,
        }}>
          {project.shortDesc}
        </p>

        {/* Tech pills (first 4) */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: project.award ? 14 : 0 }}>
          {project.tech.slice(0, 4).map(t => (
            <span key={t} className="tech-pill">{t}</span>
          ))}
          {project.tech.length > 4 && (
            <span style={{
              display: 'inline-flex', alignItems: 'center',
              padding: '4px 10px', borderRadius: 100,
              fontSize: '0.72rem', fontFamily: 'var(--font-mono)',
              color: 'var(--text-subtle)', background: 'var(--bg-surface)',
              border: '1px solid var(--border)',
            }}>+{project.tech.length - 4}</span>
          )}
        </div>

        {/* Award link (UIU recognition) */}
        {project.award && (
          <a
            href={project.award.link}
            target="_blank"
            rel="noopener noreferrer"
            onClick={e => e.stopPropagation()}
            style={{
              display: 'flex', alignItems: 'center', gap: 6,
              fontSize: '0.75rem', color: '#f59e0b',
              padding: '6px 10px', borderRadius: 6,
              background: 'rgba(245,158,11,0.06)',
              border: '1px solid rgba(245,158,11,0.18)',
              transition: 'var(--transition)',
              width: 'fit-content',
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(245,158,11,0.12)'}
            onMouseLeave={e => e.currentTarget.style.background = 'rgba(245,158,11,0.06)'}
          >
            🏛 UIU Recognition
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"/></svg>
          </a>
        )}
      </div>

      {/* Bottom: View details */}
      <div style={{
        padding: '12px 22px',
        borderTop: '1px solid var(--border)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <span style={{ fontSize: '0.78rem', color: 'var(--accent)', fontWeight: 500 }}>View Details</span>
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
      </div>
    </div>
  );
}

export default function Projects() {
  const { projects } = projectsData;
  const [selected, setSelected] = useState(null);
  const [filter,   setFilter]   = useState('All');

  const categories = ['All', ...new Set(projects.map(p => p.category))];
  const displayed  = filter === 'All' ? projects : projects.filter(p => p.category === filter);

  return (
    <section id="projects" className="section" style={{ background: 'var(--bg-surface)' }}>
      <div className="container">

        {/* Header */}
        <div className="fade-up" style={{ marginBottom: 48 }}>
          <p className="section-label">Projects</p>
          <h2 className="section-title">
            Things I've <span>built.</span>
          </h2>
          <p className="section-subtitle">
            From award-winning platforms to academic research tools — each project is a problem solved.
          </p>
        </div>

        {/* Filter */}
        <div className="fade-up delay-1" style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 36 }}>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              style={{
                padding: '7px 18px', borderRadius: 100,
                fontSize: '0.82rem', fontWeight: 500,
                cursor: 'pointer',
                background: filter === cat ? 'var(--accent)' : 'transparent',
                color: filter === cat ? '#06080f' : 'var(--text-muted)',
                border: `1px solid ${filter === cat ? 'var(--accent)' : 'var(--border)'}`,
                transition: 'var(--transition)',
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: 22,
        }}>
          {displayed.map((project, i) => (
            <div key={project.id} className={`fade-up delay-${Math.min(i + 1, 6)}`}>
              <ProjectCard project={project} onClick={() => setSelected(project)} />
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selected && (
        <ProjectModal item={selected} onClose={() => setSelected(null)} isPublication={false} />
      )}
    </section>
  );
}
