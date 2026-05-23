import { useEffect, useState } from 'react';
import { useScrollReveal } from './hooks/useScrollReveal';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Publications from './components/Publications';
import Experience from './components/Experience';
import Education from './components/Education';
import Contact from './components/Contact';
import Footer from './components/Footer';

function LoadingScreen({ done }) {
  return (
    <div
      style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        background: 'var(--bg)',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        gap: 20,
        transition: 'opacity 0.6s ease, visibility 0.6s ease',
        opacity: done ? 0 : 1,
        visibility: done ? 'hidden' : 'visible',
        pointerEvents: done ? 'none' : 'all',
      }}
    >
      <div style={{ position: 'relative', width: 56, height: 56 }}>
        <div style={{
          position: 'absolute', inset: 0,
          border: '2px solid var(--accent-border)',
          borderTopColor: 'var(--accent)',
          borderRadius: '50%',
          animation: 'spin-slow 0.9s linear infinite',
        }} />
      </div>
      <p style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '0.78rem',
        color: 'var(--text-subtle)',
        letterSpacing: '0.12em',
      }}>
        initializing...
      </p>
    </div>
  );
}

export default function App() {
  const [loaded, setLoaded] = useState(false);
  useScrollReveal();

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 900);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <LoadingScreen done={loaded} />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Publications />
        <Experience />
        <Education />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
