import React, { useEffect, useRef } from 'react';
import { usePortfolioData } from '../context/PortfolioDataContext';

export const Hero = () => {
  const { data } = usePortfolioData();
  const personal = data.personal || {};

  const heroArtRef = useRef(null);
  const heroTextRef = useRef(null);

  useEffect(() => {
    let ticking = false;
    const clamp = (val, min, max) => Math.min(Math.max(val, min), max);

    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const progress = clamp(window.scrollY / Math.max(window.innerHeight * 0.85, 1), 0, 1);
        const scale = 1 - progress * 0.17;
        if (heroArtRef.current) {
          heroArtRef.current.style.transform = `scale(${scale})`;
        }
        if (heroTextRef.current) {
          heroTextRef.current.style.transform = `scale(${scale})`;
        }
        ticking = false;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="hero" id="home">
      <div className="wrap hero-grid">
        <div className="hero-copy-wrap" ref={heroTextRef}>
          <div className="hero-kicker eyebrow">
            <span className="dot" /> {personal.eyebrow}
          </div>

          <h1>
            {personal.taglineLine1 || 'Building digital'}
            <br />
            <span className="line2">{personal.taglineAccent || 'things that'}</span>
            <span className="serif">{personal.taglineSerif || ' matter.'}</span>
          </h1>

          <p className="hero-copy">{personal.bio}</p>

          <div className="hero-actions">
            <a className="btn" href="#projects">
              Explore my work <span>↗</span>
            </a>
            <a className="btn secondary" href="#contact">
              Get in touch <span>↗</span>
            </a>
          </div>

          <div className="hero-note">{personal.location}</div>
        </div>

        <div className="hero-art" ref={heroArtRef} aria-label="Abstract illustrated portrait">
          {personal.customAvatarUrl ? (
            <div className="art-frame" style={{ display: 'grid', placeItems: 'center', background: 'var(--paper-2)' }}>
              <img
                src={personal.customAvatarUrl}
                alt={personal.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
          ) : (
            <div className="art-frame">
              <div className="art-sun" />
              <div className="art-hill" />
              <div className="art-person">
                <div className="person-head" />
                <div className="person-hair" />
                <div className="person-body" />
              </div>
            </div>
          )}

          <div className="art-stamp">
            {personal.stamp && personal.stamp[0] ? personal.stamp[0] : 'CRAFTED'}
            <br />
            {personal.stamp && personal.stamp[1] ? personal.stamp[1] : 'WITH ♥'}
            <br />
            {personal.stamp && personal.stamp[2] ? personal.stamp[2] : 'IN INDIA'}
          </div>

          <div className="art-label">
            {personal.badge?.label || 'CURRENTLY BUILDING'}
            <strong>{personal.badge?.title || 'Ideas → Impact'}</strong>
          </div>
        </div>
      </div>
    </section>
  );
};
