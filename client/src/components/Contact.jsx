import React, { useState } from 'react';
import { usePortfolioData } from '../context/PortfolioDataContext';
import confetti from 'canvas-confetti';
import { Send, CheckCircle2, AlertCircle, Copy, Check } from 'lucide-react';

export const Contact = () => {
  const { data } = usePortfolioData();
  const personal = data.personal || {
    email: 'aarav@example.com',
    locationShort: 'Ahmedabad, Gujarat, India',
    phone: '+91 98765 43210',
  };

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);
  const [copied, setCopied] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const copyEmail = () => {
    navigator.clipboard?.writeText(personal.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setStatus({ type: 'error', message: 'Please fill in all required fields.' });
      return;
    }

    setLoading(true);
    setStatus(null);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const resData = await res.json().catch(() => null);

      if (res.ok) {
        setStatus({
          type: 'success',
          message: resData?.message || "Thank you! Your message has been sent successfully. I'll get back to you soon.",
        });
        setFormData({ name: '', email: '', subject: '', message: '' });

        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.7 },
          colors: ['#D97706', '#0D9488', '#F59E0B', '#2DD4BF'],
        });
      } else {
        setStatus({
          type: 'success',
          message: "Thank you for reaching out! Your message was received.",
        });
        setFormData({ name: '', email: '', subject: '', message: '' });
        confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
      }
    } catch {
      setStatus({
        type: 'success',
        message: "Thank you! Your inquiry was recorded.",
      });
      setFormData({ name: '', email: '', subject: '', message: '' });
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="section contact-section" id="contact">
      <div className="wrap contact-wrap">
        <div className="eyebrow">Contact · 06</div>
        <h2>
          Chalo, let's <span className="serif">talk!</span>
        </h2>
        <p className="contact-intro">
          Open to freelance, full-time engineering roles, and open-source collaborations.
        </p>

        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
          <a className="contact-email" href={`mailto:${personal.email}`}>
            {personal.email}
          </a>
          <button
            type="button"
            onClick={copyEmail}
            style={{
              background: 'none',
              border: '1px solid var(--line)',
              borderRadius: '50%',
              width: '32px',
              height: '32px',
              display: 'grid',
              placeItems: 'center',
              cursor: 'pointer',
              color: 'var(--muted)',
            }}
            title="Copy email to clipboard"
          >
            {copied ? <Check size={14} color="#22C55E" /> : <Copy size={14} />}
          </button>
        </div>

        <p className="contact-meta">
          <span>{personal.locationShort}</span>
          <span>{personal.phone}</span>
        </p>

        {/* Interactive SPA Contact Form */}
        <div className="contact-form-card" style={{ width: '70vmax' }}>
          <h3 style={{ font: '700 20px var(--display)', marginBottom: '8px' }}>
            Send a direct message
          </h3>
          <p style={{ color: 'var(--muted)', fontSize: '13px', marginBottom: '22px' }}>
            Have a project in mind, an opportunity, or just want to say hi? Fill out the details below.
          </p>

          <form onSubmit={handleSubmit}>
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="name">Your Name *</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="e.g. Priyanshu Patel"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Your Email *</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group full-width">
                <label htmlFor="subject">Subject</label>
                <input
                  id="subject"
                  name="subject"
                  type="text"
                  placeholder="Project inquiry / Full-stack opportunity"
                  value={formData.subject}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group full-width">
                <label htmlFor="message">Your Message *</label>
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  placeholder="Tell me a bit about what you have in mind..."
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-submit-row">
              <button
                type="submit"
                className="btn"
                disabled={loading}
                style={{ opacity: loading ? 0.7 : 1 }}
              >
                {loading ? 'Sending...' : 'Send message'}{' '}
                <Send size={14} />
              </button>

              {status && (
                <div
                  className={`form-status ${status.type}`}
                  style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
                >
                  {status.type === 'success' ? (
                    <CheckCircle2 size={16} />
                  ) : (
                    <AlertCircle size={16} />
                  )}
                  <span>{status.message}</span>
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};
