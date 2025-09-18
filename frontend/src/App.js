


import React, { useState, useEffect, useRef } from 'react';

import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Contact from './components/Contact';
import AdminContacts from './components/AdminContacts';
import './styles/index.css';

const SECTIONS = [
  { id: 'hero', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
];

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('portfolio-dark-mode');
    return saved ? JSON.parse(saved) : true;
  });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [active, setActive] = useState('hero');
  const [showThankYou, setShowThankYou] = useState(false);
  const sectionRefs = useRef({});

  useEffect(() => {
    const handler = () => {
      setShowThankYou(true);
      setTimeout(() => setShowThankYou(false), 1500);
    };
    window.addEventListener('showThankYouPopup', handler);
    return () => window.removeEventListener('showThankYouPopup', handler);
  }, []);

  useEffect(() => {
    localStorage.setItem('portfolio-dark-mode', JSON.stringify(darkMode));
    document.body.className = darkMode ? 'dark' : 'light';
  }, [darkMode]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      let current = 'hero';
      for (const { id } of SECTIONS) {
        const ref = sectionRefs.current[id];
        if (ref && ref.offsetTop - 80 <= scrollY) {
          current = id;
        }
      }
      setActive(current);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const ref = sectionRefs.current[id];
    if (ref) {
      ref.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setMobileMenuOpen(false);
  };

  const basename = (() => {
    try {
      const u = new URL(process.env.PUBLIC_URL || '/', window.location.origin);
      return u.pathname.endsWith('/') ? u.pathname.slice(0, -1) : u.pathname;
    } catch (_e) {
      return '';
    }
  })();

  return (
    <Router basename={basename}>
      <Routes>
        <Route
          path="/admin/contacts"
          element={<AdminContacts />}
        />
        <Route
          path="/*"
          element={
            <div className={`portfolio-root-topnav${darkMode ? ' dark' : ' light'}`}>
              <nav className="top-navbar">
                <div className="logo" style={{marginLeft:'2.5rem'}}>Portfolio</div>
                <div className="nav-links-group">
                  <ul>
                    {SECTIONS.map(({ id, label }, idx) => (
                      <li key={id} style={label === 'Contact' ? { display: 'flex', alignItems: 'center' } : {}}>
                        <a
                          href={`#${id}`}
                          className={active === id ? 'active' : ''}
                          onClick={e => {
                            e.preventDefault();
                            scrollToSection(id);
                          }}
                        >
                          {label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
                {/* Desktop dark/light toggle (hidden on mobile) */}
                <div className="mode-toggle desktop-only">
                  <button onClick={() => setDarkMode(m => !m)} aria-label="Toggle dark/light mode">
                    {darkMode ? '🌙' : '☀️'}
                  </button>
                </div>
                <div className="mobile-actions">
                  <div className="mode-toggle">
                    <button onClick={() => setDarkMode(m => !m)} aria-label="Toggle dark/light mode">
                      {darkMode ? '🌙' : '☀️'}
                    </button>
                  </div>
                  <button
                    className={`hamburger-btn${mobileMenuOpen ? ' open' : ''}`}
                    aria-label="Toggle menu"
                    aria-expanded={mobileMenuOpen}
                    onClick={() => setMobileMenuOpen(o => !o)}
                  >
                    {mobileMenuOpen ? '✕' : '☰'}
                  </button>
                </div>
              </nav>
              {mobileMenuOpen && (
                <div className="mobile-menu">
                  <ul>
                    {SECTIONS.map(({ id, label }) => (
                      <li key={id}>
                        <a
                          href={`#${id}`}
                          className={active === id ? 'active' : ''}
                          onClick={e => {
                            e.preventDefault();
                            scrollToSection(id);
                          }}
                        >
                          {label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {/* Toast popup (1.5s) */}
              <div className={`toast-notice${showThankYou ? ' show' : ''}`}>
                Thanks for your information 🎉
              </div>
              <div className="main-content-topnav">
                <main>
                  <section id="hero" ref={el => sectionRefs.current.hero = el}><Hero /></section>
                  <section id="about" ref={el => sectionRefs.current.about = el}><About /></section>
                  <section id="projects" ref={el => sectionRefs.current.projects = el}><Projects /></section>
                  <section id="contact" ref={el => sectionRefs.current.contact = el}><Contact /></section>
                </main>
              </div>
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;