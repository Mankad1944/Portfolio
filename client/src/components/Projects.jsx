import React, { useState, useEffect, useRef } from 'react';
import { usePortfolioData } from '../context/PortfolioDataContext';
import { ProjectModal } from './ProjectModal';
import { ExternalLink } from 'lucide-react';

const GithubIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

export const Projects = () => {
  const { data } = usePortfolioData();
  const projects = data.projects || [];
  const [selectedProject, setSelectedProject] = useState(null);
  const stackRef = useRef(null);

  // Stacked cards retreat animation: each card goes back in depth as the next card stacks over it
  useEffect(() => {
    const clamp = (val, min, max) => Math.min(Math.max(val, min), max);

    const updateProjectStack = () => {
      if (!stackRef.current) return;
      const cards = Array.from(stackRef.current.querySelectorAll('.project-card'));
      if (window.innerWidth <= 620) {
        cards.forEach((card) => {
          card.style.transform = '';
          card.style.opacity = '';
        });
        return;
      }

      cards.forEach((card, index) => {
        if (index === cards.length - 1) return;
        const nextCard = cards[index + 1];
        if (!nextCard) return;

        const nextTop = nextCard.getBoundingClientRect().top;
        const stickyTop = parseFloat(getComputedStyle(nextCard).top) || (105 + index * 20);
        const start = Math.max(stickyTop + 1, window.innerHeight * 0.82);
        const progress = clamp((start - nextTop) / Math.max(start - stickyTop, 1), 0, 1);

        // Card retreats back underneath: scales down and shifts up into depth
        const scale = 1 - progress * 0.085;
        const retreat = -progress * 24;
        card.style.transform = `translate3d(0, ${retreat}px, 0) scale(${scale})`;
        card.style.opacity = String(1 - progress * 0.18);
      });
    };

    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(() => {
          updateProjectStack();
          ticking = false;
        });
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    updateProjectStack();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [projects]);

  const visualVariants = [
    { bg: 'var(--paper-2)', b1: 'var(--green)', b2: 'var(--orange)', b3: 'var(--yellow)' },
    { bg: 'color-mix(in srgb, var(--green) 12%, var(--paper))', b1: 'var(--green)', b2: 'var(--orange)', b3: 'var(--yellow)' },
    { bg: 'color-mix(in srgb, var(--orange) 10%, var(--paper))', b1: '#E07A5F', b2: '#2D6A4F', b3: '#F4A261' },
    { bg: 'color-mix(in srgb, var(--yellow) 14%, var(--paper))', b1: '#7C3AED', b2: '#F43F5E', b3: '#A78BFA' },
  ];

  return (
    <section className="section projects-section" id="projects">
      <div className="wrap project-section-wrap">
        <div className="section-head">
          <div>
            <div className="eyebrow">Selected work · 04</div>
            <h2>
              Made with <span className="serif accent">intent.</span>
            </h2>
          </div>
          <p>
            Real-world systems, accessible interfaces, and full-stack solutions. Explore live demos or review source code.
          </p>
        </div>

        <div className="project-stack enlarged-laptop-stack" ref={stackRef}>
          {projects.map((project, index) => {
            const variant = visualVariants[index % visualVariants.length];
            const githubUrl = project.caseStudy?.github || 'https://github.com/';
            const demoUrl = project.caseStudy?.demo || '#contact';

            return (
              <article key={project.id || index} className="project-card enlarged-card">
                <div className="project-card-info">
                  <div className="project-index">
                    PROJECT / {project.id} — {project.category}
                  </div>
                  <h3>
                    {project.title}
                    <span className="accent">.</span>
                  </h3>
                  <p>{project.desc}</p>

                  <div className="tag-row">
                    {project.tags &&
                      project.tags.map((tag, tIdx) => (
                        <span key={tIdx} className="tag">
                          {tag}
                        </span>
                      ))}
                  </div>

                  {/* 2 Dedicated Action Buttons (GitHub Link & Live Demo) with Unscaled Text */}
                  <div className="project-action-buttons">
                    <a
                      href={demoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="project-action-btn project-demo-btn"
                      title={`Visit ${project.title} live demo`}
                    >
                      <span className="unscaled-btn-text">Live Demo</span>
                      <ExternalLink size={15} style={{ flexShrink: 0 }} />
                    </a>

                    <a
                      href={githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="project-action-btn project-github-btn"
                      title={`View ${project.title} GitHub repository`}
                    >
                      <span className="unscaled-btn-text">GitHub</span>
                      <GithubIcon />
                    </a>
                  </div>

                  <div className="project-foot" style={{ marginTop: '18px' }}>
                    <span className="project-type">{project.type}</span>
                  </div>
                </div>

                {/* Project Visual: Shows Editable Project Image if provided, else stylized mockup window */}
                <div
                  className="project-visual enlarged-visual"
                  style={{ background: variant.bg, cursor: 'pointer' }}
                  onClick={() => setSelectedProject(project)}
                >
                  {project.image ? (
                    <div className="project-image-showcase">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="project-real-img"
                        loading="lazy"
                      />
                      <div className="project-image-gradient" />
                      <div className="project-image-tag">
                        <span>{project.category}</span>
                      </div>
                    </div>
                  ) : (
                    <div className="mock-window">
                      <div className="mock-top">
                        <i />
                        <i />
                        <i />
                      </div>
                      <div className="mock-content">
                        <b style={{ background: variant.b1, opacity: 0.8 }} />
                        <b style={{ background: variant.b2, opacity: 0.8 }} />
                        <b style={{ background: variant.b3, opacity: 0.7 }} />
                      </div>
                    </div>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  );
};
