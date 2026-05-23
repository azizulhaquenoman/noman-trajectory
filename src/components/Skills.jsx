import { useState } from 'react';
import skillsData from '../data/skills.json';

export default function Skills() {
  const { categories } = skillsData;
  const [active, setActive] = useState('all');

  const displayed = active === 'all'
    ? categories
    : categories.filter(c => c.id === active);

  return (
    <section id="skills" className="section" style={{
      background: `
        radial-gradient(ellipse 60% 50% at 90% 50%, rgba(139,92,246,0.04) 0%, transparent 60%),
        var(--bg)
      `,
    }}>
      <div className="container">

        {/* Header */}
        <div className="fade-up" style={{ marginBottom: 52 }}>
          <p className="section-label">Skills</p>
          <h2 className="section-title">
            The tools of the<br /><span>trade.</span>
          </h2>
          <p className="section-subtitle">
            Built through projects, refined through research, and constantly expanding toward AI/ML engineering.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="fade-up delay-1" style={{
          display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 40,
        }}>
          <TabBtn id="all" label="All" active={active} setActive={setActive} color="var(--accent)" />
          {categories.map(cat => (
            <TabBtn key={cat.id} id={cat.id} label={cat.name} active={active} setActive={setActive} color={cat.accentColor} />
          ))}
        </div>

        {/* Category Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: 20,
        }}>
          {displayed.map((cat, i) => (
            <div
              key={cat.id}
              className={`card fade-up delay-${Math.min(i + 1, 6)}`}
              style={{ padding: '24px 26px' }}
            >
              {/* Category header */}
              <div style={{
                display: 'flex', alignItems: 'center', gap: 10,
                marginBottom: 18,
                paddingBottom: 16,
                borderBottom: `1px solid ${cat.accentColor}22`,
              }}>
                <div style={{
                  width: 36, height: 36, borderRadius: 8,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: cat.accentColor + '15',
                  border: `1px solid ${cat.accentColor}30`,
                  fontSize: '1.1rem',
                }}>
                  {cat.id === 'aiml'      && '🧠'}
                  {cat.id === 'frontend'  && '🎨'}
                  {cat.id === 'backend'   && '⚙️'}
                  {cat.id === 'languages' && '💻'}
                  {cat.id === 'tools'     && '🔧'}
                </div>
                <span style={{
                  fontFamily: 'var(--font-heading)',
                  fontWeight: 600, fontSize: '0.95rem',
                  color: 'var(--text)',
                }}>
                  {cat.name}
                </span>
              </div>

              {/* Skill Pills */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {cat.skills.map(skill => (
                  <span
                    key={skill}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      padding: '5px 12px',
                      borderRadius: 100,
                      fontSize: '0.75rem',
                      fontFamily: 'var(--font-mono)',
                      fontWeight: 500,
                      background: cat.accentColor + '10',
                      color: cat.accentColor,
                      border: `1px solid ${cat.accentColor}25`,
                      transition: 'var(--transition)',
                      cursor: 'default',
                      whiteSpace: 'nowrap',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.background = cat.accentColor + '22';
                      e.currentTarget.style.borderColor = cat.accentColor + '55';
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = `0 4px 12px ${cat.accentColor}25`;
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.background = cat.accentColor + '10';
                      e.currentTarget.style.borderColor = cat.accentColor + '25';
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TabBtn({ id, label, active, setActive, color }) {
  const isActive = active === id;
  return (
    <button
      onClick={() => setActive(id)}
      style={{
        padding: '7px 16px',
        borderRadius: 100,
        fontSize: '0.8rem',
        fontWeight: 500,
        border: `1px solid ${isActive ? color : 'var(--border)'}`,
        background: isActive ? color + '15' : 'transparent',
        color: isActive ? color : 'var(--text-muted)',
        transition: 'var(--transition)',
        cursor: 'pointer',
      }}
    >
      {label}
    </button>
  );
}
