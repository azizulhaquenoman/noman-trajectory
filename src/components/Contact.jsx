import { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import contactData from '../data/contact.json';

export default function Contact() {
  const formRef = useRef();
  const [form,   setForm]   = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | sending | success | error

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.message) return;

    const serviceId  = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey  = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      /* Fallback: open mailto */
      const mailtoUrl = `mailto:${contactData.email}?subject=${encodeURIComponent(form.subject || 'Portfolio Contact')}&body=${encodeURIComponent(`From: ${form.name} <${form.email}>\n\n${form.message}`)}`;
      window.location.href = mailtoUrl;
      return;
    }

    setStatus('sending');
    try {
      await emailjs.sendForm(serviceId, templateId, formRef.current, publicKey);
      setStatus('success');
      setForm({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setStatus('idle'), 5000);
    } catch {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  const { email, phone, location, social, availability } = contactData;

  return (
    <section id="contact" className="section" style={{ background: 'var(--bg-surface)' }}>
      <div className="container">

        {/* Header */}
        <div className="fade-up" style={{ marginBottom: 48 }}>
          <p className="section-label">Contact</p>
          <h2 className="section-title">
            Let's <span>connect.</span>
          </h2>
          <p className="section-subtitle">{availability}</p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1.6fr',
          gap: 32,
          alignItems: 'start',
        }} className="contact-grid">

          {/* ── Left: Contact Info ── */}
          <div className="fade-left" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {[
              { icon: '📧', label: 'Email', value: email, href: `mailto:${email}` },
              { icon: '📞', label: 'Phone', value: phone, href: `tel:${phone}` },
              { icon: '📍', label: 'Location', value: location, href: null },
            ].map(item => (
              <div key={item.label} style={{
                padding: '16px 20px',
                background: 'var(--bg-card)',
                border: '1px solid var(--border)',
                borderRadius: 12,
                display: 'flex', alignItems: 'center', gap: 14,
                transition: 'var(--transition)',
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor='var(--accent-border)'; e.currentTarget.style.background='var(--bg-hover)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor='var(--border)'; e.currentTarget.style.background='var(--bg-card)'; }}
              >
                <span style={{
                  width: 38, height: 38,
                  background: 'var(--accent-dim)',
                  border: '1px solid var(--accent-border)',
                  borderRadius: 9, display: 'flex',
                  alignItems: 'center', justifyContent: 'center',
                  fontSize: '1rem', flexShrink: 0,
                }}>{item.icon}</span>
                <div style={{ overflow: 'hidden' }}>
                  <p style={{ fontSize: '0.72rem', color: 'var(--text-subtle)', marginBottom: 2 }}>{item.label}</p>
                  {item.href ? (
                    <a href={item.href} style={{ fontSize: '0.87rem', color: 'var(--text)', wordBreak: 'break-all' }}
                      onMouseEnter={e => e.currentTarget.style.color='var(--accent)'}
                      onMouseLeave={e => e.currentTarget.style.color='var(--text)'}
                    >{item.value}</a>
                  ) : (
                    <p style={{ fontSize: '0.87rem', color: 'var(--text)' }}>{item.value}</p>
                  )}
                </div>
              </div>
            ))}

            {/* Social quick links */}
            <div style={{
              padding: '16px 20px',
              background: 'var(--bg-card)',
              border: '1px solid var(--border)',
              borderRadius: 12,
            }}>
              <p style={{ fontSize: '0.72rem', color: 'var(--text-subtle)', marginBottom: 12 }}>Find me on</p>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {Object.entries(social).map(([platform, url]) => (
                  <a
                    key={platform}
                    href={url} target="_blank" rel="noopener noreferrer"
                    style={{
                      padding: '6px 14px', borderRadius: 8,
                      fontSize: '0.78rem', fontWeight: 500,
                      background: 'var(--bg-surface)',
                      border: '1px solid var(--border)',
                      color: 'var(--text-muted)',
                      transition: 'var(--transition)',
                      textTransform: 'capitalize',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.color='var(--accent)'; e.currentTarget.style.borderColor='var(--accent-border)'; }}
                    onMouseLeave={e => { e.currentTarget.style.color='var(--text-muted)'; e.currentTarget.style.borderColor='var(--border)'; }}
                  >
                    {platform}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* ── Right: Form ── */}
          <div className="fade-right">
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border)',
                borderRadius: 16,
                padding: '32px 36px',
                display: 'flex', flexDirection: 'column', gap: 18,
              }}
            >
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }} className="form-row">
                <Field label="Your Name" name="name" placeholder="John Doe" value={form.name} onChange={handleChange} required />
                <Field label="Email Address" name="email" type="email" placeholder="you@example.com" value={form.email} onChange={handleChange} required />
              </div>
              <Field label="Subject" name="subject" placeholder="What's this about? (optional)" value={form.subject} onChange={handleChange} />
              <Field label="Message" name="message" placeholder="Tell me about your project, opportunity, or just say hello..." value={form.message} onChange={handleChange} required textarea rows={5} />

              {/* Submit */}
              <button
                type="submit"
                disabled={status === 'sending'}
                className="btn btn-primary"
                style={{
                  width: '100%',
                  justifyContent: 'center',
                  fontSize: '0.9rem',
                  padding: '14px',
                  opacity: status === 'sending' ? 0.7 : 1,
                }}
              >
                {status === 'sending' && '⏳ Sending...'}
                {status === 'success' && '✅ Message sent!'}
                {status === 'error'   && '❌ Failed — try emailing directly'}
                {status === 'idle'    && <>Send Message <span>→</span></>}
              </button>

              <p style={{ fontSize: '0.74rem', color: 'var(--text-subtle)', textAlign: 'center' }}>
                Or reach me directly at{' '}
                <a href={`mailto:${email}`} style={{ color: 'var(--accent)' }}>{email}</a>
              </p>
            </form>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 800px) {
          .contact-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 540px) {
          .form-row { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

function Field({ label, name, type='text', placeholder, value, onChange, required, textarea, rows }) {
  const inputStyle = {
    width: '100%',
    background: 'var(--bg-surface)',
    border: '1px solid var(--border)',
    borderRadius: 9,
    padding: '11px 14px',
    color: 'var(--text)',
    fontSize: '0.88rem',
    outline: 'none',
    transition: 'border-color 0.2s',
    resize: textarea ? 'vertical' : undefined,
    minHeight: textarea ? `${rows * 24}px` : undefined,
    fontFamily: 'var(--font-body)',
  };
  return (
    <div>
      <label style={{ display: 'block', fontSize: '0.78rem', color: 'var(--text-subtle)', marginBottom: 7, fontWeight: 500 }}>
        {label}{required && <span style={{ color:'var(--accent)', marginLeft:3 }}>*</span>}
      </label>
      {textarea ? (
        <textarea
          name={name} value={value} onChange={onChange}
          placeholder={placeholder} rows={rows}
          style={inputStyle}
          onFocus={e => e.currentTarget.style.borderColor = 'var(--accent-border)'}
          onBlur={e => e.currentTarget.style.borderColor = 'var(--border)'}
        />
      ) : (
        <input
          type={type} name={name} value={value} onChange={onChange}
          placeholder={placeholder} required={required}
          style={inputStyle}
          onFocus={e => e.currentTarget.style.borderColor = 'var(--accent-border)'}
          onBlur={e => e.currentTarget.style.borderColor = 'var(--border)'}
        />
      )}
    </div>
  );
}
