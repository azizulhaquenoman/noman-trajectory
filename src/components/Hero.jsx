import { useState, useEffect } from 'react';
import NeuralNebula from './NeuralNebula';
import aboutData from '../data/about.json';
import {
  FiArrowRight,
  FiDownload,
  SiGithub,
  SiInstagram,
  SiLinkedin,
  SiTwitter,
} from './AppIcons';

function SocialIcon({ href, label, children }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
      style={{ width: 38, height: 38, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0c1220', border: '1px solid rgba(255,255,255,0.06)', color: '#94a3b8', transition: 'all 0.3s ease' }}
      onMouseEnter={e => { e.currentTarget.style.color = '#00c8ff'; e.currentTarget.style.borderColor = 'rgba(0,200,255,0.25)'; e.currentTarget.style.background = 'rgba(0,200,255,0.08)'; }}
      onMouseLeave={e => { e.currentTarget.style.color = '#94a3b8'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'; e.currentTarget.style.background = '#0c1220'; }}
    >{children}</a>
  );
}

function Typewriter({ words }) {
  const [idx, setIdx] = useState(0);
  const [text, setText] = useState('');
  const [deleting, setDeleting] = useState(false);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) { const t = setTimeout(() => { setPaused(false); setDeleting(true); }, 1800); return () => clearTimeout(t); }
    const full = words[idx];
    if (!deleting && text === full) { setPaused(true); return; }
    if (deleting && text === '') { setDeleting(false); setIdx(i => (i + 1) % words.length); return; }
    const t = setTimeout(() => setText(prev => deleting ? prev.slice(0, -1) : full.slice(0, prev.length + 1)), deleting ? 40 : 85);
    return () => clearTimeout(t);
  }, [text, deleting, idx, paused, words]);

  return <span style={{ color: '#00c8ff' }}>{text}<span style={{ animation: 'blink 1s step-end infinite' }}>|</span></span>;
}

export default function Hero() {
  const { social, resume, rotatingRoles } = aboutData;
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section id="hero" style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center',
      background: 'radial-gradient(ellipse 70% 60% at 20% 50%, rgba(0,200,255,0.04) 0%, transparent 65%), radial-gradient(ellipse 50% 50% at 80% 30%, rgba(139,92,246,0.06) 0%, transparent 60%), #06080f',
      position: 'relative', overflow: 'hidden', paddingTop: 64,
    }}>
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', backgroundImage: 'radial-gradient(rgba(0,200,255,0.08) 1px, transparent 1px)', backgroundSize: '40px 40px', opacity: 0.45 }} />

      <div className="container" style={{ width: '100%', position: 'relative', zIndex: 1 }}>
        <div className="hero-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'center', minHeight: 'calc(100vh - 64px)', padding: '40px 0' }}>

          {/* Left */}
          <div>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.82rem', color: 'var(--accent)', letterSpacing: '0.15em', marginBottom: 18, opacity: 0, animation: 'heroSlide 0.6s ease 0.2s forwards' }}>
              &gt;_ Hello, I'm
            </p>
            <h1 style={{ fontSize: 'clamp(2.4rem, 5.5vw, 3.8rem)', fontWeight: 700, lineHeight: 1.1, letterSpacing: '-0.03em', marginBottom: 16, opacity: 0, animation: 'heroSlide 0.6s ease 0.38s forwards' }}>
              Azizul Haque<br />
              <span style={{ background: 'linear-gradient(135deg, #00c8ff 0%, #8b5cf6 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Noman</span>
            </h1>
            <div style={{ fontSize: 'clamp(1rem, 2.5vw, 1.35rem)', fontFamily: 'var(--font-heading)', fontWeight: 500, marginBottom: 22, minHeight: '2em', opacity: 0, animation: 'heroSlide 0.6s ease 0.52s forwards' }}>
              <Typewriter words={rotatingRoles} />
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.97rem', lineHeight: 1.8, maxWidth: 480, marginBottom: 36, opacity: 0, animation: 'heroSlide 0.6s ease 0.66s forwards' }}>
              BSc CSE student at UIU building intelligent systems at the intersection of software and AI.
              IEEE published · 3× award-winning developer · open to opportunities.
            </p>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 34, opacity: 0, animation: 'heroSlide 0.6s ease 0.8s forwards' }}>
              <button className="btn btn-primary" onClick={() => scrollTo('projects')}>
                View Projects <FiArrowRight size={14} />
              </button>
              <a href={resume} target="_blank" rel="noopener noreferrer" className="btn btn-outline">
                <FiDownload size={14} />
                Resume
              </a>
              <button className="btn btn-ghost" onClick={() => scrollTo('contact')}>Contact Me</button>
            </div>
            <div style={{ display: 'flex', gap: 10, alignItems: 'center', opacity: 0, animation: 'heroSlide 0.6s ease 0.94s forwards' }}>
              <SocialIcon href={social.github} label="GitHub">    <SiGithub size={17} />   </SocialIcon>
              <SocialIcon href={social.linkedin} label="LinkedIn">  <SiLinkedin size={17} /> </SocialIcon>
              <SocialIcon href={social.twitter} label="Twitter/X"> <SiTwitter size={16} />  </SocialIcon>
              <SocialIcon href={social.instagram} label="Instagram"> <SiInstagram size={16} />    </SocialIcon>
              <span style={{ marginLeft: 8, fontSize: '0.74rem', fontFamily: 'var(--font-mono)', color: 'var(--text-subtle)' }}>@azizulhaquenoman</span>
            </div>
          </div>

          {/* Right: 3D */}
          <div className="nebula-wrap" style={{ height: 520, position: 'relative', borderRadius: 20, overflow: 'hidden', border: '1px solid rgba(0,200,255,0.15)', opacity: 0, animation: 'heroFade 0.9s ease 0.5s forwards' }}>
            <div style={{ position: 'absolute', top: 14, right: 14, zIndex: 3, fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: 'var(--text-subtle)', pointerEvents: 'none' }}>
              neural.constellation<span style={{ color: 'var(--accent)' }}>[ ]</span>
            </div>
            <div style={{ position: 'absolute', bottom: 14, left: '50%', transform: 'translateX(-50%)', zIndex: 3, fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: 'var(--text-subtle)', pointerEvents: 'none', whiteSpace: 'nowrap' }}>
              move cursor to interact
            </div>
            <NeuralNebula />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div style={{ position: 'absolute', bottom: 28, left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, opacity: 0, animation: 'heroFade 1s ease 1.6s forwards' }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: 'var(--text-subtle)', letterSpacing: '0.12em' }}>scroll</span>
        <div style={{ width: 22, height: 36, border: '1.5px solid #334155', borderRadius: 12, display: 'flex', justifyContent: 'center', paddingTop: 6 }}>
          <div style={{ width: 4, height: 8, background: 'var(--accent)', borderRadius: 2, animation: 'float 1.8s ease-in-out infinite' }} />
        </div>
      </div>

      <style>{`
        @keyframes heroSlide { from{opacity:0;transform:translateX(-22px)} to{opacity:1;transform:translateX(0)} }
        @keyframes heroFade  { from{opacity:0;transform:translateX(22px)}  to{opacity:1;transform:translateX(0)} }
        @media(max-width:900px){
          .hero-grid{grid-template-columns:1fr !important;text-align:center !important;gap:40px !important;}
          .hero-grid>div:first-child{display:flex;flex-direction:column;align-items:center;}
          .nebula-wrap{height:320px !important;}
        }
        @media(max-width:480px){ .nebula-wrap{display:none !important;} }
      `}</style>
    </section>
  );
}
