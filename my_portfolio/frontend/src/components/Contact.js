import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', company: '', message: '' });
  const [status, setStatus] = useState('');
  const [errors, setErrors] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  // Determine API base URL (env override or auto-infer 5000 while UI runs on 3000)
  const inferDevBase = () => {
    try {
      if (typeof window !== 'undefined' && window.location.hostname === 'localhost' && window.location.port === '3000') {
        return 'http://localhost:5000';
      }
    } catch (_) {}
    return '';
  };
  const RAW_API_BASE = process.env.REACT_APP_API_BASE_URL || inferDevBase();
  const API_BASE_URL = RAW_API_BASE ? RAW_API_BASE.replace(/\/+$/, '') : '';

  function validate(fields) {
    const next = { name: '', email: '', message: '' };
    const name = String(fields.name || '').trim();
    const email = String(fields.email || '').trim();
    const message = String(fields.message || '').trim();
    if (name.length < 2) next.name = 'Please enter your name.';
    // Simple email check
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next.email = 'Enter a valid email.';
    if (message.length < 2) next.message = 'Please write a message.';
    return next;
  }

  async function postJSON(url, body, timeoutMs = 10000) {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeoutMs);
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-cache' },
        body: JSON.stringify(body),
        signal: controller.signal,
      });
      return response;
    } finally {
      clearTimeout(id);
    }
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return; // guard against double clicks
    setIsSubmitting(true);
    setStatus('Sending...');
    try {
      // Trim and validate
      const payload = {
        name: String(form.name || '').trim(),
        email: String(form.email || '').trim(),
        message: String(form.message || '').trim(),
      };
      const fieldErrors = validate(payload);
      setErrors(fieldErrors);
      if (fieldErrors.name || fieldErrors.email || fieldErrors.message) {
        setStatus('Please fix the highlighted fields.');
        setIsSubmitting(false);
        return;
      }

      const requestUrl = API_BASE_URL ? `${API_BASE_URL}/contact` : '/contact';
      const res = await postJSON(requestUrl, payload);

      if (res.ok) {
        setStatus('Message sent!');
        setForm({ name: '', email: '', phone: '', company: '', message: '' });

        // Trigger thank-you popup
        window.dispatchEvent(new CustomEvent('showThankYouPopup'));

        // Scroll user to hero section or top
        const heroSection = document.getElementById('hero');
        if (heroSection) {
          heroSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      } else {
        let errorMessage = 'Failed to send.';
        try {
          const data = await res.json();
          if (data && data.error) errorMessage = data.error;
        } catch (_) {}
        setStatus(errorMessage);
      }
    } catch (error) {
      setStatus(error?.name === 'AbortError' ? 'Network timeout. Please try again.' : 'Network error. Please try again.');
      console.error('Contact submit failed:', {
        error,
        API_BASE_URL: API_BASE_URL || '(proxy)',
        url: API_BASE_URL ? `${API_BASE_URL}/contact` : '/contact',
      });
    }
    setIsSubmitting(false);
  };

  return (
    <div className="contact contact-grid">
      <div className="contact-left">
        <h2 className="contact-title">
          CONTACT <span style={{ color: '#00bcd4' }}>US.</span>
        </h2>
        <p className="contact-desc">
          Heads up if you're contacting us about project work: we charge by the project, and our minimum budget is $5,000. No exceptions.
        </p>
        <form onSubmit={handleSubmit} className="contact-form">
          <input
            type="text"
            name="name"
            placeholder="YOUR NAME*"
            value={form.name}
            onChange={handleChange}
            required
          />
          {errors.name && <div style={{ color: 'salmon', fontSize: 12 }}>{errors.name}</div>}
          <input
            type="email"
            name="email"
            placeholder="EMAIL ADDRESS*"
            value={form.email}
            onChange={handleChange}
            required
          />
          {errors.email && <div style={{ color: 'salmon', fontSize: 12 }}>{errors.email}</div>}
          <input
            type="text"
            name="phone"
            placeholder="PHONE NUMBER"
            value={form.phone}
            onChange={handleChange}
          />
          <input
            type="text"
            name="company"
            placeholder="YOUR COMPANY"
            value={form.company}
            onChange={handleChange}
          />
          <textarea
            name="message"
            placeholder="YOUR MESSAGE*"
            value={form.message}
            onChange={handleChange}
            required
          />
          {errors.message && <div style={{ color: 'salmon', fontSize: 12 }}>{errors.message}</div>}
          <button
            type="submit"
            className="contact-btn"
            disabled={isSubmitting}
            aria-busy={isSubmitting}
            aria-disabled={isSubmitting}
          >
            {isSubmitting ? 'SENDING…' : 'BOOM. SEND IT.'}
          </button>
        </form>
        {status && <p className="status">{status}</p>}
      </div>

      <div className="contact-right">
        <div className="contact-info-block">
          <div className="contact-label">CALL US...</div>
          <div className="contact-value contact-phone">+977 9707917382</div>
        </div>
        <div className="contact-info-block">
          <div className="contact-label">EMAIL US...</div>
          <div className="contact-value contact-email">pacificrai5@gmail.com</div>
        </div>
        <div className="contact-info-block">
          <div className="contact-label">FOLLOW US...</div>
          <div className="contact-socials">
            <a
              href="https://www.facebook.com/pyaspi"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="contact-social-icon"
            >
              <svg width="28" height="28" fill="#fff" viewBox="0 0 24 24">
                <path d="M22.675 0h-21.35C.595 0 0 .592 0 1.326v21.348C0 23.408.595 24 1.325 24h11.495v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.406 24 24 23.408 24 22.674V1.326C24 .592 23.406 0 22.675 0" />
              </svg>
            </a>
            <a
              href="https://www.linkedin.com/in/pyaspi-rai/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="contact-social-icon"
            >
              <svg width="28" height="28" fill="#fff" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.268c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm13.5 11.268h-3v-5.604c0-1.337-.025-3.063-1.868-3.063-1.868 0-2.154 1.459-2.154 2.968v5.699h-3v-10h2.881v1.367h.041c.401-.761 1.381-1.563 2.841-1.563 3.039 0 3.6 2.001 3.6 4.601v5.595z" />
              </svg>
            </a>
            <a
              href="mailto:myemail@gmail.com"
              aria-label="Gmail"
              className="contact-social-icon"
            >
              <svg width="28" height="28" fill="#fff" viewBox="0 0 24 24">
                <path d="M12 13.065l-11.985-8.065v16c0 1.104.896 2 2 2h19.97c1.104 0 2-.896 2-2v-16l-11.985 8.065zm11.985-10.065c0-1.104-.896-2-2-2h-19.97c-1.104 0-2 .896-2 2v.217l12 8.083 11.97-8.083v-.217z" />
              </svg>
            </a>
          </div>
        </div>
        <div className="contact-info-block">
          <div className="contact-label">FULL STOP IS...</div>
          <div className="contact-team">
            <div>
              <b>Jay Fanelli</b> / Design
            </div>
            <div>
              <b>Nathan Peretic</b> / Front-End
            </div>
            <div>
              <b>Matthew Chambers</b> / Back-End
            </div>
          </div>
        </div>
        <div className="contact-footer">
          <span>Mitranagar, Gate No-2 Bus Park, KATHMANDU, NEPAL</span>
        </div>
      </div>
    </div>
  );
}

export default Contact;
