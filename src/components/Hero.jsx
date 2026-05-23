import { useState, useEffect } from 'react';
import NeuralNebula from './NeuralNebula';
import aboutData from '../data/about.json';

const GithubIcon  = () => <svg viewBox="0 0 24 24" fill="currentColor" width="17" height="17"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>;
const LinkedinIcon = () => <svg viewBox="0 0 24 24" fill="currentColor" width="17" height="17"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>;
const TwitterIcon  = () => <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.741l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>;
const InstaIcon    = () => <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>;

function SocialIcon({ href, label, children }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
      style={{ width:38, height:38, borderRadius:8, display:'flex', alignItems:'center', justifyContent:'center', background:'#0c1220', border:'1px solid rgba(255,255,255,0.06)', color:'#94a3b8', transition:'all 0.3s ease' }}
      onMouseEnter={e=>{e.currentTarget.style.color='#00c8ff';e.currentTarget.style.borderColor='rgba(0,200,255,0.25)';e.currentTarget.style.background='rgba(0,200,255,0.08)';}}
      onMouseLeave={e=>{e.currentTarget.style.color='#94a3b8';e.currentTarget.style.borderColor='rgba(255,255,255,0.06)';e.currentTarget.style.background='#0c1220';}}
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
    const t = setTimeout(() => setText(prev => deleting ? prev.slice(0,-1) : full.slice(0, prev.length+1)), deleting ? 40 : 85);
    return () => clearTimeout(t);
  }, [text, deleting, idx, paused, words]);

  return <span style={{ color:'#00c8ff' }}>{text}<span style={{ animation:'blink 1s step-end infinite' }}>|</span></span>;
}

export default function Hero() {
  const { social, resume, rotatingRoles } = aboutData;
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section id="hero" style={{
      minHeight:'100vh', display:'flex', alignItems:'center',
      background:'radial-gradient(ellipse 70% 60% at 20% 50%, rgba(0,200,255,0.04) 0%, transparent 65%), radial-gradient(ellipse 50% 50% at 80% 30%, rgba(139,92,246,0.06) 0%, transparent 60%), #06080f',
      position:'relative', overflow:'hidden', paddingTop:64,
    }}>
      <div style={{ position:'absolute', inset:0, pointerEvents:'none', backgroundImage:'radial-gradient(rgba(0,200,255,0.08) 1px, transparent 1px)', backgroundSize:'40px 40px', opacity:0.45 }} />

      <div className="container" style={{ width:'100%', position:'relative', zIndex:1 }}>
        <div className="hero-grid" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:60, alignItems:'center', minHeight:'calc(100vh - 64px)', padding:'40px 0' }}>

          {/* Left */}
          <div>
            <p style={{ fontFamily:'var(--font-mono)', fontSize:'0.82rem', color:'var(--accent)', letterSpacing:'0.15em', marginBottom:18, opacity:0, animation:'heroSlide 0.6s ease 0.2s forwards' }}>
              &gt;_ Hello, I'm
            </p>
            <h1 style={{ fontSize:'clamp(2.4rem, 5.5vw, 3.8rem)', fontWeight:700, lineHeight:1.1, letterSpacing:'-0.03em', marginBottom:16, opacity:0, animation:'heroSlide 0.6s ease 0.38s forwards' }}>
              Azizul Haque<br />
              <span style={{ background:'linear-gradient(135deg, #00c8ff 0%, #8b5cf6 100%)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>Noman</span>
            </h1>
            <div style={{ fontSize:'clamp(1rem, 2.5vw, 1.35rem)', fontFamily:'var(--font-heading)', fontWeight:500, marginBottom:22, minHeight:'2em', opacity:0, animation:'heroSlide 0.6s ease 0.52s forwards' }}>
              <Typewriter words={rotatingRoles} />
            </div>
            <p style={{ color:'var(--text-muted)', fontSize:'0.97rem', lineHeight:1.8, maxWidth:480, marginBottom:36, opacity:0, animation:'heroSlide 0.6s ease 0.66s forwards' }}>
              BSc CSE student at UIU building intelligent systems at the intersection of software and AI.
              IEEE published · 3× award-winning developer · open to opportunities.
            </p>
            <div style={{ display:'flex', gap:12, flexWrap:'wrap', marginBottom:34, opacity:0, animation:'heroSlide 0.6s ease 0.8s forwards' }}>
              <button className="btn btn-primary" onClick={() => scrollTo('projects')}>
                View Projects <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </button>
              <a href={resume} target="_blank" rel="noopener noreferrer" className="btn btn-outline">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg>
                Resume
              </a>
              <button className="btn btn-ghost" onClick={() => scrollTo('contact')}>Contact Me</button>
            </div>
            <div style={{ display:'flex', gap:10, alignItems:'center', opacity:0, animation:'heroSlide 0.6s ease 0.94s forwards' }}>
              <SocialIcon href={social.github}    label="GitHub">    <GithubIcon />   </SocialIcon>
              <SocialIcon href={social.linkedin}  label="LinkedIn">  <LinkedinIcon /> </SocialIcon>
              <SocialIcon href={social.twitter}   label="Twitter/X"> <TwitterIcon />  </SocialIcon>
              <SocialIcon href={social.instagram} label="Instagram"> <InstaIcon />    </SocialIcon>
              <span style={{ marginLeft:8, fontSize:'0.74rem', fontFamily:'var(--font-mono)', color:'var(--text-subtle)' }}>@azizulhaquenoman</span>
            </div>
          </div>

          {/* Right: 3D */}
          <div className="nebula-wrap" style={{ height:520, position:'relative', borderRadius:20, overflow:'hidden', border:'1px solid rgba(0,200,255,0.15)', opacity:0, animation:'heroFade 0.9s ease 0.5s forwards' }}>
            <div style={{ position:'absolute', top:14, right:14, zIndex:3, fontFamily:'var(--font-mono)', fontSize:'0.62rem', color:'var(--text-subtle)', pointerEvents:'none' }}>
              neural.constellation<span style={{ color:'var(--accent)' }}>[ ]</span>
            </div>
            <div style={{ position:'absolute', bottom:14, left:'50%', transform:'translateX(-50%)', zIndex:3, fontFamily:'var(--font-mono)', fontSize:'0.62rem', color:'var(--text-subtle)', pointerEvents:'none', whiteSpace:'nowrap' }}>
              move cursor to interact
            </div>
            <NeuralNebula />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div style={{ position:'absolute', bottom:28, left:'50%', transform:'translateX(-50%)', display:'flex', flexDirection:'column', alignItems:'center', gap:6, opacity:0, animation:'heroFade 1s ease 1.6s forwards' }}>
        <span style={{ fontFamily:'var(--font-mono)', fontSize:'0.62rem', color:'var(--text-subtle)', letterSpacing:'0.12em' }}>scroll</span>
        <div style={{ width:22, height:36, border:'1.5px solid #334155', borderRadius:12, display:'flex', justifyContent:'center', paddingTop:6 }}>
          <div style={{ width:4, height:8, background:'var(--accent)', borderRadius:2, animation:'float 1.8s ease-in-out infinite' }} />
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
