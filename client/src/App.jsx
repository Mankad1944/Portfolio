import React from 'react';
import { usePortfolioData } from './context/PortfolioDataContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Ticker } from './components/Ticker';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Journey } from './components/Journey';
import { Projects } from './components/Projects';
import { Recognition } from './components/Recognition';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { ScrollToTop } from './components/ScrollToTop';
import { AdminDashboard } from './components/AdminDashboard';

export const App = () => {
  const { isAdminOpen, setIsAdminOpen } = usePortfolioData();

  return (
    <div className="spa-connecting-root">
      {/* Unified Connecting Atmospheric Canvas Background that flows seamlessly through all sections */}
      <div className="spa-connecting-canvas" aria-hidden="true">
        {/* Continuous Architecture Connecting Guide Lines */}
        <div className="spa-guide-line guide-line-left" />
        <div className="spa-guide-line guide-line-center" />
        <div className="spa-guide-line guide-line-right" />

        {/* Ambient Atmospheric Connected Glows */}
        <div className="spa-ambient-glow glow-hero-about" />
        <div className="spa-ambient-glow glow-skills-journey" />
        <div className="spa-ambient-glow glow-projects" />
        <div className="spa-ambient-glow glow-contact" />
      </div>

      <Navbar />
      <main>
        <Hero />
        <Ticker />
        <About />
        <Skills />
        <Journey />
        <Projects />
        <Recognition />
        <Contact />
      </main>
      <Footer />
      <ScrollToTop />

      {/* Admin Dashboard Modal Portal */}
      <AdminDashboard
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
      />
    </div>
  );
};
