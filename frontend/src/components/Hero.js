import React, { useState, useEffect } from 'react';

function Hero() {
  const [showThankYou, setShowThankYou] = useState(false);

  useEffect(() => {
    if (window.localStorage.getItem('showThankYou') === 'true') {
      setShowThankYou(true);
      window.localStorage.removeItem('showThankYou');
    }
  }, []);

  const handleContactClick = (e) => {
    e.preventDefault();
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      contactSection.classList.add('section-animate');
      setTimeout(() => {
        contactSection.classList.remove('section-animate');
      }, 900);
    }
  };

  return (
    <div className="hero-modern">
      <div className="hero-modern-left">
        <div className="hero-welcome">Wel-come</div>
        <h1 className="hero-main-title">
          Hi, I'm <span className="hero-highlight">Pyaspi Rai</span>
        </h1>
        <h2 className="hero-sub-title">A Frontend Developer</h2>
        <div className="hero-desc-modern">Who love code and build amazing things for the web</div>
        {showThankYou && (
          <div style={{background:'#00bcd4',color:'#fff',padding:'1rem 2rem',borderRadius:12,margin:'1rem 0',fontWeight:700,fontSize:'1.2rem',boxShadow:'0 2px 8px rgba(0,0,0,0.10)'}}>Thanks for your information!</div>
        )}
        <div className="hero-btn-row">
          <a href="#contact" className="hero-btn hero-btn-grey" onClick={handleContactClick}>Contact Me</a>
          <a href="#about" className="hero-btn hero-btn-outline">More About Me</a>
        </div>
      </div>
      <div className="hero-modern-right">
        <div className="hero-img-diamond-bg">
          <img src={process.env.PUBLIC_URL + '/Me.jpg'} alt="Portrait" className="hero-img-square" />
        </div>
      </div>
    </div>
  );
}

export default Hero;