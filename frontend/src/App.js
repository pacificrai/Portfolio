


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
  };

  return (
    <Router>
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
                        {label === 'Contact' && (
                          <div className="mode-toggle mode-toggle-separate" style={{marginLeft: '1.2rem'}}>
                            <button onClick={() => setDarkMode(m => !m)} aria-label="Toggle dark/light mode">
                              {darkMode ? '🌙' : '☀️'}
                            </button>
                          </div>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              </nav>
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
