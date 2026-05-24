import expData from '../data/experience.json';
import {
  FiAward,
  FiBookOpen,
  FiBriefcase,
  FiMessageCircle,
} from './AppIcons';

const TYPE_COLORS = {
  research: { bg: 'rgba(139,92,246,0.1)', border: 'rgba(139,92,246,0.25)', text: '#8b5cf6' },
  achievement: { bg: 'rgba(245,158,11,0.1)', border: 'rgba(245,158,11,0.25)', text: '#f59e0b' },
  education: { bg: 'rgba(0,200,255,0.08)', border: 'rgba(0,200,255,0.2)', text: '#00c8ff' },
  work: { bg: 'rgba(16,185,129,0.1)', border: 'rgba(16,185,129,0.25)', text: '#10b981' },
};

export default function Experience() {
  const { intro, timeline, cta } = expData;

  return (
    <section id="experience" className="section" style={{ background: 'var(--bg-surface)' }}>
      <div className="container">

        {/* Header */}
        <div className="fade-up" style={{ marginBottom: 20 }}>
          <p className="section-label">Experience</p>
          <h2 className="section-title">
            {intro.headline.split(',')[0]},<br />
            <span>{intro.headline.split(',')[1]?.trim()}</span>
          </h2>
          <p className="section-subtitle" style={{ maxWidth: 600 }}>
            {intro.description}
          </p>
        </div>

        {/* Timeline */}
        <div style={{ position: 'relative', marginTop: 52 }}>
          {/* Vertical line */}
          <div style={{
            position: 'absolute',
            left: 19,
            top: 0,
            bottom: 0,
            width: 2,
            background: 'linear-gradient(to bottom, var(--accent), var(--purple), transparent)',
            opacity: 0.3,
          }} />

          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {timeline.map((item, i) => {
              const colors = TYPE_COLORS[item.type] || TYPE_COLORS.work;
              return (
                <div
                  key={item.id}
                  className={`fade-up delay-${Math.min(i + 1, 6)}`}
                  style={{ display: 'flex', gap: 28 }}
                >
                  {/* Timeline dot */}
                  <div style={{ flexShrink: 0, position: 'relative', width: 40 }}>
                    <div style={{
                      width: 40, height: 40,
                      borderRadius: '50%',
                      background: colors.bg,
                      border: `2px solid ${colors.border}`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '1.1rem',
                      position: 'relative', zIndex: 1,
                    }}>
                      {item.type === 'research' && <FiAward size={18} color={colors.text} />}
                      {item.type === 'achievement' && <FiAward size={18} color={colors.text} />}
                      {item.type === 'education' && <FiBookOpen size={18} color={colors.text} />}
                      {item.type === 'work' && <FiBriefcase size={18} color={colors.text} />}
                    </div>
                  </div>

                  {/* Content card */}
                  <div style={{
                    flex: 1,
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border)',
                    borderRadius: 14,
                    padding: '20px 24px',
                    marginBottom: 16,
                    transition: 'var(--transition)',
                  }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = colors.border; e.currentTarget.style.background = 'var(--bg-hover)'; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.background = 'var(--bg-card)'; }}
                  >
                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap', marginBottom: 8 }}>
                      <div>
                        <h3 style={{
                          fontSize: '1rem', fontWeight: 600,
                          fontFamily: 'var(--font-heading)',
                          color: 'var(--text)', marginBottom: 4,
                        }}>
                          {item.title}
                        </h3>
                        <p style={{ fontSize: '0.82rem', color: 'var(--text-subtle)' }}>
                          {item.organization}
                        </p>
                      </div>
                      <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexShrink: 0 }}>
                        <span style={{
                          padding: '3px 10px', borderRadius: 100,
                          fontSize: '0.68rem', fontFamily: 'var(--font-mono)',
                          background: colors.bg, color: colors.text,
                          border: `1px solid ${colors.border}`,
                        }}>{item.type}</span>
                        <span style={{
                          fontFamily: 'var(--font-mono)', fontSize: '0.72rem',
                          color: 'var(--text-subtle)',
                        }}>{item.year}</span>
                      </div>
                    </div>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', lineHeight: 1.7 }}>
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA note + ready-for-work-experience hint */}
        <div className="fade-up" style={{
          marginTop: 32,
          padding: '20px 28px',
          borderRadius: 14,
          background: 'rgba(0,200,255,0.04)',
          border: '1px solid var(--accent-border)',
          display: 'flex', alignItems: 'center', gap: 14,
        }}>
          <FiMessageCircle size={24} color="var(--accent)" />
          <div>
            <p style={{ color: 'var(--accent)', fontWeight: 500, fontSize: '0.9rem', marginBottom: 4 }}>
              Currently Available
            </p>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.84rem' }}>
              {cta}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
