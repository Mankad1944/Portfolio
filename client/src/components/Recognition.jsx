import React from 'react';
import { usePortfolioData } from '../context/PortfolioDataContext';

export const Recognition = () => {
  const { data } = usePortfolioData();
  const recognition = data.recognition || { achievements: [], certifications: [] };

  return (
    <section className="section" id="recognition">
      <div className="wrap">
        <div className="section-head">
          <div>
            <div className="eyebrow">Milestones & learning · 05</div>
            <h2>
              Proof of <span className="serif accent">progress.</span>
            </h2>
          </div>
          <p>
            Achievements, certifications, workshops and learning milestones earned while building real software.
          </p>
        </div>

        <div className="recognition-grid">
          {/* Achievements Column with Images */}
          <div className="recognition-col">
            <h3>Achievements</h3>
            {recognition.achievements &&
              recognition.achievements.map((item, index) => (
                <article key={index} className="recognition-item">
                  <div className="recognition-img-box">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.title}
                        className="recognition-badge-img"
                        loading="lazy"
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }}
                      />
                    ) : (
                      <div className="recognition-fallback-mark">{item.icon || '🏆'}</div>
                    )}
                  </div>
                  <div>
                    <small>{item.year}</small>
                    <h4>{item.title}</h4>
                    <p>{item.desc}</p>
                  </div>
                </article>
              ))}
          </div>

          {/* Certifications Column with Images */}
          <div className="recognition-col">
            <h3>Certifications</h3>
            {recognition.certifications &&
              recognition.certifications.map((item, index) => (
                <article key={index} className="recognition-item">
                  <div className="recognition-img-box">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.title}
                        className="recognition-badge-img"
                        loading="lazy"
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }}
                      />
                    ) : (
                      <div className="recognition-fallback-mark">{item.icon || '📜'}</div>
                    )}
                  </div>
                  <div>
                    <small>{item.year}</small>
                    <h4>{item.title}</h4>
                    <p>{item.desc}</p>
                    {item.id && (
                      <span className="credential-id-badge">
                        Credential ID: {item.id}
                      </span>
                    )}
                  </div>
                </article>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
};
