import React from 'react';
import { usePortfolioData } from '../context/PortfolioDataContext';
import { AnimatedCounter } from './AnimatedCounter';

export const About = () => {
  const { data } = usePortfolioData();
  const about = data.about || {
    sectionNum: '01',
    eyebrow: 'A little introduction',
    label: 'THE PERSON BEHIND THE PIXELS',
    lead: 'Good technology should feel simple, even when the thinking behind it isn\'t.',
    paragraphs: [],
    facts: [],
  };

  return (
    <section className="section" id="about">
      <div className="wrap about-grid">
        <div className="about-aside">
          <div className="eyebrow">{about.eyebrow}</div>
          <div className="big-number">
            {about.sectionNum}
            <small>{about.label}</small>
          </div>
        </div>

        <div className="about-copy">
          <h3>
            Good technology should feel <span className="serif accent">simple</span>, even when the thinking behind it isn't.
          </h3>

          {about.paragraphs &&
            about.paragraphs.map((p, idx) => <p key={idx}>{p}</p>)}

          <div className="about-facts">
            {about.facts &&
              about.facts.map((fact, index) => (
                <div key={index} className="fact">
                  <strong><AnimatedCounter value={fact.stat} /></strong>
                  <span className='kpi-label'>{fact.label}</span>
                </div>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
};
