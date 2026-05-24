import { useState, useEffect } from 'react';
import aboutData from '../data/about.json';
import { FiDownload } from './AppIcons';

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Research', href: '#publications' },
  { label: 'Experience', href: '#experience' },
  { label: 'Education', href: '#education' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  /* Scroll → frosted glass + active section tracking */
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);

      const sections = NAV_LINKS.map(l => l.href.replace('#', ''));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* Lock body scroll when mobile menu open */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
  }, [menuOpen]);

  const scrollTo = (href) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
        padding: '0 28px',
        height: 64,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        background: scrolled ? 'rgba(6,8,15,0.88)' : 'transparent',
        backdropFilter: scrolled ? 'blur(18px)' : 'none',
        borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
        transition: 'all 0.4s ease',
      }}>

        {/* Logo */}
        <a
          href="#hero"
          onClick={(e) => { e.preventDefault(); scrollTo('#hero'); }}
          style={{
            fontFamily: 'var(--font-heading)',
            fontWeight: 700,
            fontSize: '1.3rem',
            color: 'var(--accent)',
            letterSpacing: '-0.03em',
          }}
        >
          {'<Noman />'}<span style={{ color: 'var(--text-subtle)' }}></span>
        </a>

        {/* Desktop Nav */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }} className="desktop-nav">
          {NAV_LINKS.map(link => {
            const section = link.href.replace('#', '');
            const isActive = activeSection === section;
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => { e.preventDefault(); scrollTo(link.href); }}
                style={{
                  padding: '6px 12px',
                  borderRadius: 6,
                  fontSize: '0.85rem',
                  fontWeight: 500,
                  color: isActive ? 'var(--accent)' : 'var(--text-muted)',
                  background: isActive ? 'var(--accent-dim)' : 'transparent',
                  transition: 'var(--transition-fast)',
                }}
                onMouseEnter={e => { if (!isActive) { e.currentTarget.style.color = 'var(--text)'; e.currentTarget.style.background = 'var(--bg-hover)'; } }}
                onMouseLeave={e => { if (!isActive) { e.currentTarget.style.color = 'var(--text-muted)'; e.currentTarget.style.background = 'transparent'; } }}
              >
                {link.label}
              </a>
            );
          })}
        </div>

        {/* Right: Status Badge + Resume */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }} className="desktop-nav">
          {/* Open to Work badge */}
          {aboutData.openToWork && (
            <div style={{
              display: 'flex', alignItems: 'center', gap: 7,
              padding: '5px 12px',
              borderRadius: 100,
              background: 'rgba(16,185,129,0.08)',
              border: '1px solid rgba(16,185,129,0.25)',
              fontSize: '0.75rem',
              fontWeight: 500,
              color: '#10b981',
              whiteSpace: 'nowrap',
            }}>
              <span style={{
                width: 7, height: 7, borderRadius: '50%',
                background: '#10b981',
                animation: 'pulse-dot 2s ease-in-out infinite',
                flexShrink: 0,
              }} />
              Open to Opportunities
            </div>
          )}

          {/* Resume */}
          <a
            href={aboutData.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline btn-sm"
            style={{ display: 'flex', alignItems: 'center', gap: 6 }}
          >
            <FiDownload size={14} />
            Resume
          </a>
        </div>

        {/* Hamburger (mobile) */}
        <button
          className="hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          style={{ display: 'none' }}
        >
          <span style={{
            display: 'block', width: 22, height: 2,
            background: menuOpen ? 'var(--accent)' : 'var(--text)',
            borderRadius: 2,
            transition: 'var(--transition)',
            transform: menuOpen ? 'rotate(45deg) translate(5px,5px)' : 'none',
          }} />
          <span style={{
            display: 'block', width: 22, height: 2,
            background: menuOpen ? 'transparent' : 'var(--text)',
            borderRadius: 2,
            margin: '5px 0',
            transition: 'var(--transition)',
          }} />
          <span style={{
            display: 'block', width: 22, height: 2,
            background: menuOpen ? 'var(--accent)' : 'var(--text)',
            borderRadius: 2,
            transition: 'var(--transition)',
            transform: menuOpen ? 'rotate(-45deg) translate(5px,-5px)' : 'none',
          }} />
        </button>
      </nav>

      {/* Mobile Overlay Menu */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: 999,
        background: 'rgba(6,8,15,0.97)',
        backdropFilter: 'blur(20px)',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        gap: 8,
        transition: 'opacity 0.3s ease, visibility 0.3s ease',
        opacity: menuOpen ? 1 : 0,
        visibility: menuOpen ? 'visible' : 'hidden',
      }}>
        {NAV_LINKS.map((link, i) => (
          <a
            key={link.href}
            href={link.href}
            onClick={(e) => { e.preventDefault(); scrollTo(link.href); }}
            style={{
              fontSize: '1.6rem',
              fontFamily: 'var(--font-heading)',
              fontWeight: 600,
              color: 'var(--text)',
              padding: '12px 0',
              transition: 'color 0.2s',
              animationDelay: `${i * 0.06}s`,
            }}
            onMouseEnter={e => e.currentTarget.style.color = 'var(--accent)'}
            onMouseLeave={e => e.currentTarget.style.color = 'var(--text)'}
          >
            {link.label}
          </a>
        ))}

        <div style={{ marginTop: 24, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}>
          {aboutData.openToWork && (
            <div style={{
              display: 'flex', alignItems: 'center', gap: 7,
              padding: '7px 16px', borderRadius: 100,
              background: 'rgba(16,185,129,0.08)',
              border: '1px solid rgba(16,185,129,0.25)',
              fontSize: '0.85rem', color: '#10b981',
            }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#10b981', animation: 'pulse-dot 2s ease-in-out infinite' }} />
              Open to Opportunities
            </div>
          )}
          <a
            href={aboutData.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
            onClick={() => setMenuOpen(false)}
          >
            Download Resume
          </a>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .desktop-nav { display: none !important; }
          .hamburger { display: flex !important; flex-direction: column; gap: 0; padding: 8px; }
        }
      `}</style>
    </>
  );
}
