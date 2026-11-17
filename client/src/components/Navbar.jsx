import React, { useState, useEffect } from 'react';
import { usePortfolioData } from '../context/PortfolioDataContext';
import { Menu, X, Settings } from 'lucide-react';

export const Navbar = () => {
  const { data, setIsAdminOpen } = usePortfolioData();
  const { personal } = data;
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className={`nav ${scrolled ? 'scrolled' : ''}`}>
      <div className="wrap nav-inner">
        <a href="#home" className="brand" onClick={closeMenu}>
          {personal.shortName || 'vanshil'}<span>.</span>
        </a>

        <div className={`nav-links ${menuOpen ? 'open' : ''}`} id="navLinks">
          <a href="#home" onClick={closeMenu}>Home</a>
          <a href="#about" onClick={closeMenu}>About</a>
          <a href="#skills" onClick={closeMenu}>Skills</a>
          <a href="#experience" onClick={closeMenu}>Journey</a>
          <a href="#projects" onClick={closeMenu}>Projects</a>
          <a href="#recognition" onClick={closeMenu}>Achievements</a>
          <a href="#contact" className="nav-cta" onClick={closeMenu}>Let's talk ↗</a>
        </div>

        <div className="nav-controls">
          {/* Admin Dashboard Trigger */}
          <button
            type="button"
            className="admin-nav-btn"
            onClick={() => setIsAdminOpen(true)}
            aria-label="Open Admin Dashboard"
            title="Open Admin Dashboard to edit themes, colors, and content"
          >
            <Settings size={15} />
            <span>Admin</span>
          </button>

          <button
            type="button"
            className="menu-btn"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation menu"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
    </nav>
  );
};
