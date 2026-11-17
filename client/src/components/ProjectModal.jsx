import React, { useEffect } from 'react';
import { X, ExternalLink, CheckCircle } from 'lucide-react';

const GithubIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

export const ProjectModal = ({ project, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  if (!project) return null;

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close project modal">
          <X size={18} />
        </button>

        <div className="project-index" style={{ marginBottom: '8px' }}>
          PROJECT / {project.id} — {project.category}
        </div>

        <h2 style={{ font: '800 clamp(28px, 4vw, 42px) var(--display)', letterSpacing: '-0.05em', margin: '4px 0 16px' }}>
          {project.title}<span className="accent">.</span>
        </h2>

        <p style={{ color: 'var(--muted)', fontSize: '16px', lineHeight: 1.7, marginBottom: '24px' }}>
          {project.desc}
        </p>

        <div style={{ marginBottom: '24px' }}>
          <h4 style={{ font: '700 13px var(--mono)', color: 'var(--green)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '8px' }}>
            Problem Statement
          </h4>
          <p style={{ color: 'var(--ink)', fontSize: '14px', lineHeight: 1.6, background: 'var(--paper-2)', padding: '14px 16px', borderRadius: '12px', border: '1px solid var(--line)' }}>
            {project.caseStudy.problem}
          </p>
        </div>

        <div style={{ marginBottom: '24px' }}>
          <h4 style={{ font: '700 13px var(--mono)', color: 'var(--green)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '8px' }}>
            Architectural Solution
          </h4>
          <p style={{ color: 'var(--ink)', fontSize: '14px', lineHeight: 1.6 }}>
            {project.caseStudy.solution}
          </p>
        </div>

        <div style={{ marginBottom: '28px' }}>
          <h4 style={{ font: '700 13px var(--mono)', color: 'var(--green)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '12px' }}>
            Key Capabilities & Features
          </h4>
          <div style={{ display: 'grid', gap: '10px' }}>
            {project.caseStudy.features.map((feature, idx) => (
              <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px', color: 'var(--muted)' }}>
                <CheckCircle size={16} color="var(--orange)" />
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: '28px' }}>
          <h4 style={{ font: '700 13px var(--mono)', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '10px' }}>
            Technologies Used
          </h4>
          <div className="tag-row">
            {project.tags.map((tag, idx) => (
              <span key={idx} className="tag" style={{ fontSize: '11px', padding: '6px 14px' }}>
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', paddingTop: '20px', borderTop: '1px solid var(--line)' }}>
          <a
            href={project.caseStudy.demo}
            target="_blank"
            rel="noreferrer"
            className="btn"
            style={{ padding: '10px 20px', fontSize: '12px' }}
          >
            Live Demo <ExternalLink size={14} />
          </a>
          <a
            href={project.caseStudy.github}
            target="_blank"
            rel="noreferrer"
            className="btn secondary"
            style={{ padding: '10px 20px', fontSize: '12px' }}
          >
            Source Code <GithubIcon />
          </a>
        </div>
      </div>
    </div>
  );
};
