import React from 'react';

function Projects() {
  return (
    <div className="projects">
      <h2 className="projects-title">Projects</h2>
      <p className="projects-subtitle">Explore my web development projects, including full stack platforms and creative showcases.</p>
      <div className="project-list">
  <div className="project-card featured animate-zoominout">
          <div className="project-image animated-image" style={{
            borderRadius:'10px',
            height:'120px',
            marginBottom:'1rem',
            display:'flex',
            alignItems:'center',
            justifyContent:'center',
            color:'#8bc34a',
            fontWeight:'bold',
            fontSize:'1.1rem',
            backgroundImage: `url(${process.env.PUBLIC_URL}/project1.jpg)`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}>Image</div>
          <div className="project-badges">
            <span className="badge">ARDUINO </span>
            <span className="badge badge-dark">BASED PROJECT</span>
          </div>
          <h3>Smart Water Level Monitoring System</h3>
          <p>Built an Arduino-based Water Level Monitoring System that tracks and displays tank levels in real time, ensuring efficient water usage. The project provides a low-cost, automated solution for smarter resource management.</p>
        </div>
  <div className="project-card animate-zoominout">
          <div className="project-image animated-image" style={{
            borderRadius:'10px',
            height:'120px',
            marginBottom:'1rem',
            display:'flex',
            alignItems:'center',
            justifyContent:'center',
            color:'#388e3c',
            fontWeight:'bold',
            fontSize:'1.1rem',
            backgroundImage: `url(${process.env.PUBLIC_URL}/project.png)`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}>Image</div>
          <div className="project-badges">
            <span className="badge badge-dark">FRONTEND (FIGMA)</span>
          </div>
          <h3>Bullet-NEWS</h3>
          <p>BulletNEWS is a web application that provides categorized news from Nepal. Users can read news, listen to it using text-to-speech, or quickly get summaries. The platform is designed for busy people who want to stay updated efficiently.</p>
        </div>
      </div>
    </div>
  );
}

export default Projects;