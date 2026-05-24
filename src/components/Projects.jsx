import { useState } from 'react';
import projectsData from '../data/projects.json';
import ProjectModal from './ProjectModal';
import {
  FiArrowRight,
  FiAward,
  MdAgriculture,
  MdAccessTime,
  MdRestaurant,
  MdLocalHospital,
  MdSchool,
  FiClock,
  FiHeart,
  FiMonitor,
  FiShoppingBag,
} from './AppIcons';
import { useEffect, useRef } from 'react';

const PROJECT_ICONS = {
  directedge: MdAgriculture,
  kairos: MdAccessTime,
  cookcorner: MdRestaurant,
  healthcare: MdLocalHospital,
  codecampus: MdSchool,
};

const stripLeadingSymbol = (value) => value.replace(/^[^A-Za-z0-9]+\s*/, '');

function ProjectCard({ project, onClick }) {
  const [imgError, setImgError] = useState(false);
  const pillsRef = useRef(null);
  const measureRef = useRef(null);
  const [visibleCount, setVisibleCount] = useState(4);

  useEffect(() => {
    if (!pillsRef.current || !measureRef.current) return;
    const container = pillsRef.current;
    const measureContainer = measureRef.current;

    const measure = () => {
      const containerWidth = container.clientWidth;
      const gap = 6; // px gap between pills
      const plusWidth = 56; // reserve width for the +N pill
      // Use the offscreen measure container which contains all pills to get stable widths
      const pillEls = Array.from(measureContainer.querySelectorAll('.tech-pill'));
      if (pillEls.length === 0) {
        setVisibleCount(0);
        return;
      }

      // measure each pill's width (including gap)
      let used = 0;
      let fit = 0;
      for (let i = 0; i < pillEls.length; i++) {
        const w = pillEls[i].offsetWidth + gap;
        // if there will be leftover items, ensure plusWidth reserved
        const remaining = pillEls.length - (fit + 1);
        const reserve = remaining > 0 ? plusWidth : 0;
        if (used + w + reserve <= containerWidth) {
          used += w;
          fit += 1;
        } else break;
      }

      // At least show one pill when space is tiny
      setVisibleCount(Math.max(1, fit));
    };

    // measure after render (give time for fonts/images)
    const id = setTimeout(measure, 50);
    window.addEventListener('resize', measure);
    return () => {
      clearTimeout(id);
      window.removeEventListener('resize', measure);
    };
  }, [project.tech]);

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
            {(() => {
              const Icon = PROJECT_ICONS[project.id] || FiShoppingBag;
              return <Icon size={50} color={project.fallbackColor} />;
            })()}
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
            <FiAward size={11} style={{ marginRight: 6, verticalAlign: 'text-bottom' }} />
            {stripLeadingSymbol(project.award.badge)}
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

        {/* Offscreen measure container (renders all pills invisibly for width calculation) */}
        <div ref={measureRef} style={{ position: 'absolute', visibility: 'hidden', height: 0, overflow: 'hidden', pointerEvents: 'none' }} aria-hidden="true">
          {project.tech.map(t => <span key={t} className="tech-pill">{t}</span>)}
        </div>

        {/* Tech pills (visible, clamped) */}
        <div ref={pillsRef} style={{ display: 'flex', flexWrap: 'nowrap', gap: 6, marginBottom: project.award ? 14 : 0, alignItems: 'center', overflow: 'hidden', paddingBottom: 2 }}>
          {project.tech.slice(0, visibleCount).map(t => (
            <span key={t} className="tech-pill">{t}</span>
          ))}
          {project.tech.length > visibleCount && (
            <span className="tech-pill" style={{
              background: 'var(--bg-surface)', color: 'var(--text-subtle)', border: '1px solid var(--border)'
            }}>+{project.tech.length - visibleCount}</span>
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
            UIU Recognition
            <FiArrowRight size={11} />
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
        <FiArrowRight size={15} color="var(--accent)" />
      </div>
    </div>
  );
}

export default function Projects() {
  const { projects } = projectsData;
  const [selected, setSelected] = useState(null);
  const [filter, setFilter] = useState('All');

  const categories = ['All', ...new Set(projects.map(p => p.category))];
  const displayed = filter === 'All' ? projects : projects.filter(p => p.category === filter);

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
