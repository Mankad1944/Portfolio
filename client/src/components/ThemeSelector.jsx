import React, { useState, useRef, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { Palette, Check, Sun, Moon } from 'lucide-react';

export const ThemeSelector = () => {
  const { paletteId, mode, palettes, selectPalette, toggleMode, currentPalette } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div style={{ position: 'relative' }} ref={containerRef}>
      <button
        type="button"
        className="palette-btn"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Select color theme palette"
        title="Choose from 5 curated color themes"
      >
        <span
          className="palette-swatch-mini"
          style={{
            background: mode === 'dark' ? currentPalette.dark.accentPrimary : currentPalette.light.accentPrimary,
          }}
        />
        <Palette size={14} />
        <span style={{ fontSize: '11px' }}>Theme {paletteId}</span>
      </button>

      {isOpen && (
        <div className="palette-popover" role="dialog" aria-label="Theme Palette Selector">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', borderBottom: '1px solid var(--line)', paddingBottom: '10px' }}>
            <div>
              <h4 style={{ margin: 0, font: '700 13px var(--display)' }}>Curated Color Themes</h4>
              <p style={{ margin: 0, fontSize: '11px', color: 'var(--muted)' }}>5 tailor-made developer palettes</p>
            </div>
            <button
              onClick={toggleMode}
              className="theme-toggle-btn"
              style={{ width: '32px', height: '32px' }}
              title={mode === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {mode === 'dark' ? <Sun size={15} color="#FBBF24" /> : <Moon size={15} color="#4F46E5" />}
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {palettes.map((p) => {
              const active = p.id === paletteId;
              const paletteColors = mode === 'dark' ? p.dark : p.light;
              return (
                <div
                  key={p.id}
                  className={`palette-item ${active ? 'active' : ''}`}
                  onClick={() => {
                    selectPalette(p.id);
                  }}
                  role="button"
                  tabIndex={0}
                >
                  <div className="palette-item-info">
                    <strong>
                      {p.id}. {p.name}
                    </strong>
                    <small>{p.badge}</small>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div className="palette-swatches">
                      <span
                        className="palette-swatch-dot"
                        style={{ background: paletteColors.bg }}
                        title="Background"
                      />
                      <span
                        className="palette-swatch-dot"
                        style={{ background: paletteColors.accentPrimary }}
                        title="Primary Accent"
                      />
                      <span
                        className="palette-swatch-dot"
                        style={{ background: paletteColors.accentSecondary }}
                        title="Secondary Accent"
                      />
                    </div>
                    {active && <Check size={14} color="var(--green)" />}
                  </div>
                </div>
              );
            })}
          </div>

          <div style={{ marginTop: '12px', paddingTop: '10px', borderTop: '1px solid var(--line)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '10px', fontFamily: 'var(--mono)', color: 'var(--muted)' }}>
              Mode: {mode === 'dark' ? '🌙 Dark' : '☀️ Light'}
            </span>
            <button
              onClick={() => setIsOpen(false)}
              style={{
                background: 'none',
                border: 'none',
                fontSize: '11px',
                fontFamily: 'var(--mono)',
                color: 'var(--green)',
                fontWeight: 600,
              }}
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
