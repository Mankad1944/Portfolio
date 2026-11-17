import React, { useState } from 'react';
import { usePortfolioData } from '../context/PortfolioDataContext';

export const Skills = () => {
  const { data } = usePortfolioData();
  const skills = data.skills || [];
  const [filter, setFilter] = useState('all');

  const filteredSkills = filter === 'all'
    ? skills
    : skills.filter((s) => s.category === filter);

  return (
    <section className="section skills-section" id="skills">
      <div className="wrap">
        <div className="section-head">
          <div>
            <div className="eyebrow">Tools of the trade · 02</div>
            <h2>
              My <span className="serif accent">toolkit.</span>
            </h2>
          </div>
          <p>
            A growing set of technologies I use to shape ideas into reliable, accessible and delightful products.
          </p>
        </div>

        <div className="skills-filter">
          <button
            className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All Skills ({skills.length})
          </button>
          <button
            className={`filter-btn ${filter === 'frontend' ? 'active' : ''}`}
            onClick={() => setFilter('frontend')}
          >
            Frontend
          </button>
          <button
            className={`filter-btn ${filter === 'backend' ? 'active' : ''}`}
            onClick={() => setFilter('backend')}
          >
            Backend & Databases
          </button>
          <button
            className={`filter-btn ${filter === 'tools' ? 'active' : ''}`}
            onClick={() => setFilter('tools')}
          >
            Tools & Other
          </button>
        </div>

        <div className="skill-grid">
          {filteredSkills.map((skill, index) => (
            <div key={index} className="skill-card">
              <div className="skill-header">
                <span className="skill-icon">{skill.icon}</span>
                <span className="skill-badge">{skill.category}</span>
              </div>
              <div>
                <strong>{skill.name}</strong>
                <small>{skill.desc}</small>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
