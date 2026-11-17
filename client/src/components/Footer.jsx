import React from 'react';
import { usePortfolioData } from '../context/PortfolioDataContext';

export const Footer = () => {
  const { data } = usePortfolioData();
  const personal = data.personal || {
    name: 'Vanshil Mankad',
    shortName: 'vanshil',
    email: 'vanshil@example.com',
    phone: '+91 98765 43210',
    locationShort: 'Ahmedabad, Gujarat, India',
  };

  return (
    <footer className="site-footer">
      <div className="wrap footer-main">
        <div className="footer-brand">
          <a className="brand" href="#home">
            {personal.shortName || 'vanshil'}<span>.</span>
          </a>
          <p>
            Building useful digital experiences, one clean component at a time.
          </p>
        </div>

        <div className="footer-column">
          <h3>Explore</h3>
          <div className="footer-links">
            <a href="#home">Home</a>
            <a href="#about">About</a>
            <a href="#skills">Tech stack & skills</a>
            <a href="#experience">My journey</a>
            <a href="#projects">Projects</a>
            <a href="#recognition">Achievements & certifications</a>
            <a href="#contact">Contact</a>
          </div>
        </div>

        <div className="footer-column">
          <h3>Get in touch</h3>
          <div className="footer-links">
            <a href={`mailto:${personal.email}`}>{personal.email}</a>
            <a href={`tel:${personal.phone ? personal.phone.replace(/\s+/g, '') : ''}`}>{personal.phone}</a>
            <span>{personal.locationShort}</span>
            <a href="https://www.linkedin.com/" target="_blank" rel="noreferrer">
              LinkedIn ↗
            </a>
            <a href="https://github.com/" target="_blank" rel="noreferrer">
              GitHub ↗
            </a>
          </div>
        </div>
      </div>

      <div className="wrap footer-bottom">
        <span>© {new Date().getFullYear()} {personal.name} · Made with care in India 🇮🇳</span>
        <span>DESIGNED TO KEEP LEARNING.</span>
      </div>
    </footer>
  );
};
