import React from 'react';

function About() {
  return (
    <div className="about-modern">
      <div className="about-modern-left">
        <span className="about-hello">Hello I'm</span>
        <h1 className="about-name">A Professional</h1>
        <div className="about-title">Web Developer</div>
        <p className="about-desc">
          I build modern, responsive websites and web apps. Passionate about clean code, great design, and new tech.
        </p>
        <a href="#contact" className="about-hire-btn">Hire Me</a>
      </div>
      <div className="about-modern-photo">
        <img src={process.env.PUBLIC_URL + '/hiiii.jpg'} alt="About portrait" className="about-modern-img" />
      </div>
    </div>
  );
}

export default About;