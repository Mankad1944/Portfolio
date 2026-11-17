import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { usePortfolioData } from '../context/PortfolioDataContext';
import {
  X,
  Palette,
  User,
  Briefcase,
  Layers,
  Award,
  Inbox,
  Save,
  RotateCcw,
  Plus,
  Trash2,
  Check,
  Sun,
  Moon,
  Sparkles,
  Code,
  Image,
  ShieldCheck,
  Lock,
  Type,
} from 'lucide-react';

export const AdminDashboard = ({ isOpen, onClose }) => {
  const {
    paletteId,
    mode,
    palettes,
    selectPalette,
    toggleMode,
    setVariableColor,
    resetToPresetDefaults,
    getActiveVariable,
    customVariables,
    fontThemeId,
    selectFontTheme,
    fontThemes,
    currentFontTheme,
    customFontVariables,
    setFontVariable,
    resetFontDefaults,
    getActiveFont,
  } = useTheme();

  const { data, updateData, resetData } = usePortfolioData();

  const [activeTab, setActiveTab] = useState('themes');
  const [formData, setFormData] = useState(data);
  const [messages, setMessages] = useState([]);
  const [saveToast, setSaveToast] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    setFormData(data);
  }, [data]);

  useEffect(() => {
    if (activeTab === 'inbox') {
      fetch('/api/contact')
        .then((res) => res.json())
        .then((json) => {
          if (json.success && json.data) {
            setMessages(json.data);
          }
        })
        .catch(() => {});
    }
  }, [activeTab]);

  if (!isOpen) return null;

  const showNotification = (msg) => {
    setSaveToast(msg);
    setTimeout(() => setSaveToast(''), 3000);
  };

  const handleSaveAll = async () => {
    setIsSaving(true);
    await updateData(formData);
    setIsSaving(false);
    showNotification('All portfolio updates saved successfully!');
  };

  const handleResetDefaults = async () => {
    if (window.confirm('Reset all portfolio content and custom styling back to original defaults?')) {
      await resetData();
      resetToPresetDefaults();
      showNotification('Portfolio reset to default successfully.');
    }
  };

  const colorVariables = [
    { key: 'paper', label: 'Primary Background', cssVar: '--paper', desc: 'Main canvas & page background' },
    { key: 'paper2', label: 'Secondary Background', cssVar: '--paper-2', desc: 'Subtle section backgrounds & inputs' },
    { key: 'white', label: 'Cards & Surfaces', cssVar: '--white', desc: 'Project cards, modals, & floating containers' },
    { key: 'line', label: 'Borders & Dividers', cssVar: '--line', desc: 'Card outlines, dividers, & grid lines' },
    { key: 'ink', label: 'Primary Text', cssVar: '--ink', desc: 'Headings, main titles, & strong body text' },
    { key: 'muted', label: 'Secondary Text', cssVar: '--muted', desc: 'Subtitles, descriptions, & dates' },
    { key: 'green', label: 'Primary Accent', cssVar: '--green', desc: 'Primary buttons, active indicators, highlights' },
    { key: 'orange', label: 'Secondary Accent', cssVar: '--orange', desc: 'Sub-accents, special tags, & badges' },
    { key: 'yellow', label: 'Highlight Accent', cssVar: '--yellow', desc: 'Illustration sun, badge glows, & icons' },
  ];

  return (
    <div className="admin-overlay" role="dialog" aria-modal="true">
      <div className="admin-modal">
        {/* Top Header */}
        <div className="admin-header">
          <div className="admin-title-area">
            <div className="admin-badge">
              <Sparkles size={13} />
              <span>MERN Stack Admin Portal</span>
            </div>
            <h2>Portfolio Control Center</h2>
          </div>

          <div className="admin-header-actions">
            {saveToast && <div className="admin-toast">{saveToast}</div>}

            <button
              type="button"
              className="admin-btn admin-btn-reset"
              onClick={handleResetDefaults}
              title="Reset everything to factory defaults"
            >
              <RotateCcw size={14} />
              <span>Reset</span>
            </button>

            <button
              type="button"
              className="admin-btn admin-btn-save"
              onClick={handleSaveAll}
              disabled={isSaving}
            >
              <Save size={14} />
              <span>{isSaving ? 'Saving...' : 'Save Changes'}</span>
            </button>

            <button
              type="button"
              className="admin-close-btn"
              onClick={onClose}
              aria-label="Close Admin Dashboard"
              title="Return to site"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="admin-tabs">
          <button
            type="button"
            className={`admin-tab-btn ${activeTab === 'themes' ? 'active' : ''}`}
            onClick={() => setActiveTab('themes')}
          >
            <Palette size={15} />
            <span>Theme & Colors</span>
          </button>

          <button
            type="button"
            className={`admin-tab-btn ${activeTab === 'general' ? 'active' : ''}`}
            onClick={() => setActiveTab('general')}
          >
            <User size={15} />
            <span>Profile & Hero</span>
          </button>

          <button
            type="button"
            className={`admin-tab-btn ${activeTab === 'experience' ? 'active' : ''}`}
            onClick={() => setActiveTab('experience')}
          >
            <Briefcase size={15} />
            <span>Experience Timeline</span>
          </button>

          <button
            type="button"
            className={`admin-tab-btn ${activeTab === 'projects' ? 'active' : ''}`}
            onClick={() => setActiveTab('projects')}
          >
            <Layers size={15} />
            <span>Projects & Images</span>
          </button>

          <button
            type="button"
            className={`admin-tab-btn ${activeTab === 'skills' ? 'active' : ''}`}
            onClick={() => setActiveTab('skills')}
          >
            <Code size={15} />
            <span>Skills & Toolkit</span>
          </button>

          <button
            type="button"
            className={`admin-tab-btn ${activeTab === 'recognition' ? 'active' : ''}`}
            onClick={() => setActiveTab('recognition')}
          >
            <Award size={15} />
            <span>Achievements (Images)</span>
          </button>

          <button
            type="button"
            className={`admin-tab-btn ${activeTab === 'inbox' ? 'active' : ''}`}
            onClick={() => setActiveTab('inbox')}
          >
            <Inbox size={15} />
            <span>Messages Inbox {messages.length > 0 && `(${messages.length})`}</span>
          </button>

          <button
            type="button"
            className={`admin-tab-btn ${activeTab === 'security' ? 'active' : ''}`}
            onClick={() => setActiveTab('security')}
          >
            <ShieldCheck size={15} />
            <span>SSL / TLS (Free)</span>
          </button>
        </div>

        {/* Tab Body Content */}
        <div className="admin-body">
          {/* TAB 1: THEMES & COLOR VARIABLES */}
          {activeTab === 'themes' && (
            <div className="admin-section">
              <div className="admin-section-intro">
                <h3>Global Theme & CSS Variable Engine</h3>
                <p>
                  Switch combination presets or fine-tune individual CSS variables in real time. All changes apply simultaneously to both the client portfolio and this control panel!
                </p>
              </div>

              {/* Mode Toggle */}
              <div className="admin-card" style={{ marginBottom: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <h4 style={{ margin: 0, font: '700 15px var(--display)' }}>Light / Dark Display Mode</h4>
                    <p style={{ margin: '4px 0 0', color: 'var(--muted)', fontSize: '13px' }}>
                      Current mode: <strong>{mode.toUpperCase()}</strong>
                    </p>
                  </div>
                  <button
                    type="button"
                    className="btn secondary"
                    onClick={toggleMode}
                    style={{ padding: '8px 18px', fontSize: '12px' }}
                  >
                    {mode === 'dark' ? <Sun size={15} color="#F59E0B" /> : <Moon size={15} color="#4F46E5" />}
                    <span>Switch to {mode === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
                  </button>
                </div>
              </div>

              {/* Curated Presets Selection */}
              <div style={{ marginBottom: '32px' }}>
                <h4 style={{ font: '700 16px var(--display)', marginBottom: '12px' }}>
                  Curated Combination Options (Theme 2 Default)
                </h4>
                <div className="admin-palette-grid">
                  {palettes.map((p) => {
                    const isSelected = p.id === paletteId;
                    const pColors = mode === 'dark' ? p.dark : p.light;
                    return (
                      <div
                        key={p.id}
                        className={`admin-palette-card ${isSelected ? 'selected' : ''}`}
                        onClick={() => selectPalette(p.id)}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                          <span style={{ font: '700 13px var(--display)' }}>
                            {p.id}. {p.name}
                          </span>
                          {isSelected && <Check size={16} color="var(--green)" />}
                        </div>
                        <span style={{ font: '10px var(--mono)', color: 'var(--muted)', display: 'block', marginBottom: '12px' }}>
                          {p.badge}
                        </span>

                        <div className="admin-color-preview-bar">
                          <span style={{ background: pColors.bg }} title="Canvas Bg" />
                          <span style={{ background: pColors.surface }} title="Surface" />
                          <span style={{ background: pColors.accentPrimary }} title="Primary Accent" />
                          <span style={{ background: pColors.accentSecondary }} title="Secondary Accent" />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Set Colors Variable by Variable */}
              <div className="admin-card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px', borderBottom: '1px solid var(--line)', paddingBottom: '12px' }}>
                  <div>
                    <h4 style={{ margin: 0, font: '700 16px var(--display)' }}>
                      Variable-by-Variable Color Tuning
                    </h4>
                    <p style={{ margin: '4px 0 0', color: 'var(--muted)', fontSize: '13px' }}>
                      Override individual design tokens. The system automatically updates active CSS variables.
                    </p>
                  </div>
                  {Object.keys(customVariables).length > 0 && (
                    <button
                      type="button"
                      className="btn secondary"
                      onClick={resetToPresetDefaults}
                      style={{ padding: '6px 14px', fontSize: '11px' }}
                    >
                      Reset Variables to Preset
                    </button>
                  )}
                </div>

                <div className="admin-var-grid">
                  {colorVariables.map((variable) => {
                    const currentColor = getActiveVariable(variable.key);
                    const isCustom = !!customVariables[variable.key];

                    return (
                      <div key={variable.key} className="admin-var-item">
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <input
                            type="color"
                            className="admin-color-picker"
                            value={currentColor}
                            onChange={(e) => setVariableColor(variable.key, e.target.value)}
                            title={`Pick color for ${variable.label}`}
                          />
                          <div>
                            <strong>{variable.label}</strong>
                            <small>{variable.cssVar}</small>
                          </div>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <input
                            type="text"
                            className="admin-hex-input"
                            value={currentColor}
                            onChange={(e) => setVariableColor(variable.key, e.target.value)}
                            maxLength={7}
                          />
                          {isCustom && (
                            <span className="admin-custom-indicator" title="Custom override active">
                              Custom
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* 5 CURATED FONT THEMES */}
              <div style={{ marginTop: '36px', marginBottom: '32px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                  <div>
                    <h4 style={{ font: '700 16px var(--display)', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Type size={18} color="var(--green)" />
                      5 Curated Font Themes & Typography
                    </h4>
                    <p style={{ margin: '4px 0 0', color: 'var(--muted)', fontSize: '13px' }}>
                      Change font combination across the entire portfolio SPA with live preview.
                    </p>
                  </div>
                </div>

                <div className="admin-palette-grid">
                  {(fontThemes || []).map((f) => {
                    const isSelected = f.id === fontThemeId;
                    return (
                      <div
                        key={f.id}
                        className={`admin-palette-card ${isSelected ? 'selected' : ''}`}
                        onClick={() => selectFontTheme(f.id)}
                        style={{ cursor: 'pointer' }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                          <span style={{ font: `700 14px ${f.cssDisplay}` }}>
                            {f.id}. {f.name}
                          </span>
                          {isSelected && <Check size={16} color="var(--green)" />}
                        </div>
                        <span style={{ font: `500 10px ${f.cssMono}`, color: 'var(--muted)', display: 'block', marginBottom: '10px' }}>
                          {f.badge}
                        </span>

                        <div style={{ fontSize: '11.5px', lineHeight: 1.5, color: 'var(--ink)' }}>
                          <div><strong>Heading:</strong> {f.heading} ({f.headingWeights})</div>
                          <div><strong>Body:</strong> {f.body} ({f.bodyWeights})</div>
                          <div><strong>Mono:</strong> {f.mono} ({f.monoWeight})</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Variable-by-Variable Font Family Tuning */}
              <div className="admin-card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px', borderBottom: '1px solid var(--line)', paddingBottom: '12px' }}>
                  <div>
                    <h4 style={{ margin: 0, font: '700 16px var(--display)' }}>
                      Variable-by-Variable Font Family Tuning
                    </h4>
                    <p style={{ margin: '4px 0 0', color: 'var(--muted)', fontSize: '13px' }}>
                      Fine-tune individual CSS font family variables (--display, --sans, --mono).
                    </p>
                  </div>
                  {Object.keys(customFontVariables || {}).length > 0 && (
                    <button
                      type="button"
                      className="btn secondary"
                      onClick={resetFontDefaults}
                      style={{ padding: '6px 14px', fontSize: '11px' }}
                    >
                      Reset Fonts to Preset
                    </button>
                  )}
                </div>

                <div className="admin-form-grid">
                  <div className="form-group full-width">
                    <label>Heading Font Family (--display)</label>
                    <input
                      type="text"
                      value={getActiveFont ? getActiveFont('display') : ''}
                      placeholder="'Space Grotesk', system-ui, sans-serif"
                      onChange={(e) => setFontVariable('display', e.target.value)}
                    />
                  </div>
                  <div className="form-group full-width">
                    <label>Body Font Family (--sans)</label>
                    <input
                      type="text"
                      value={getActiveFont ? getActiveFont('sans') : ''}
                      placeholder="'Inter', system-ui, sans-serif"
                      onChange={(e) => setFontVariable('sans', e.target.value)}
                    />
                  </div>
                  <div className="form-group full-width">
                    <label>Monospace Font Family (--mono)</label>
                    <input
                      type="text"
                      value={getActiveFont ? getActiveFont('mono') : ''}
                      placeholder="'JetBrains Mono', monospace"
                      onChange={(e) => setFontVariable('mono', e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: GENERAL & PROFILE */}
          {activeTab === 'general' && (
            <div className="admin-section">
              <div className="admin-section-intro">
                <h3>Profile, Hero & About Content</h3>
                <p>Customize developer persona, headlines, bio description, and avatar imagery.</p>
              </div>

              <div className="admin-card" style={{ marginBottom: '22px' }}>
                <h4 style={{ font: '700 15px var(--display)', marginBottom: '16px' }}>Hero Banner Info</h4>
                <div className="admin-form-grid">
                  <div className="form-group">
                    <label>Full Name</label>
                    <input
                      type="text"
                      value={formData.personal?.name || ''}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          personal: { ...formData.personal, name: e.target.value },
                        })
                      }
                    />
                  </div>

                  <div className="form-group">
                    <label>Navbar Brand Short Name</label>
                    <input
                      type="text"
                      value={formData.personal?.shortName || ''}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          personal: { ...formData.personal, shortName: e.target.value },
                        })
                      }
                    />
                  </div>

                  <div className="form-group full-width">
                    <label>Eyebrow Status Line</label>
                    <input
                      type="text"
                      value={formData.personal?.eyebrow || ''}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          personal: { ...formData.personal, eyebrow: e.target.value },
                        })
                      }
                    />
                  </div>

                  <div className="form-group">
                    <label>Tagline Line 1</label>
                    <input
                      type="text"
                      value={formData.personal?.taglineLine1 || ''}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          personal: { ...formData.personal, taglineLine1: e.target.value },
                        })
                      }
                    />
                  </div>

                  <div className="form-group">
                    <label>Tagline Accent Line</label>
                    <input
                      type="text"
                      value={formData.personal?.taglineAccent || ''}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          personal: { ...formData.personal, taglineAccent: e.target.value },
                        })
                      }
                    />
                  </div>

                  <div className="form-group full-width">
                    <label>Hero Bio Description</label>
                    <textarea
                      rows="3"
                      value={formData.personal?.bio || ''}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          personal: { ...formData.personal, bio: e.target.value },
                        })
                      }
                    />
                  </div>

                  <div className="form-group">
                    <label>Email Address</label>
                    <input
                      type="email"
                      value={formData.personal?.email || ''}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          personal: { ...formData.personal, email: e.target.value },
                        })
                      }
                    />
                  </div>

                  <div className="form-group">
                    <label>Phone Number</label>
                    <input
                      type="text"
                      value={formData.personal?.phone || ''}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          personal: { ...formData.personal, phone: e.target.value },
                        })
                      }
                    />
                  </div>

                  <div className="form-group full-width">
                    <label>Location & Availability Note</label>
                    <input
                      type="text"
                      value={formData.personal?.location || ''}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          personal: { ...formData.personal, location: e.target.value },
                        })
                      }
                    />
                  </div>

                  <div className="form-group full-width">
                    <label>Custom Hero Image URL (Leave empty to use original CSS Art portrait)</label>
                    <input
                      type="text"
                      placeholder="https://images.unsplash.com/photo-..."
                      value={formData.personal?.customAvatarUrl || ''}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          personal: { ...formData.personal, customAvatarUrl: e.target.value },
                        })
                      }
                    />
                  </div>
                </div>
              </div>

              {/* Ticker / Marquee Items & Editable Icons */}
              <div className="admin-card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                  <div>
                    <h4 style={{ font: '700 15px var(--display)', margin: 0 }}>Ticker / Marquee Banner Items & Icons</h4>
                    <p style={{ color: 'var(--muted)', fontSize: '12px', margin: '4px 0 0' }}>
                      Edit individual text, logos or symbol icons, plus the separator icon scrolling across the top marquee.
                    </p>
                  </div>
                  <button
                    type="button"
                    className="btn"
                    onClick={() => {
                      const current = (formData.tickerItems || []).map((it) =>
                        typeof it === 'string' ? { text: it, icon: '✦' } : it
                      );
                      setFormData({
                        ...formData,
                        tickerItems: [...current, { text: 'New Highlight', icon: '⚡' }],
                      });
                    }}
                    style={{ padding: '6px 14px', fontSize: '11.5px' }}
                  >
                    <Plus size={13} /> Add Marquee Item
                  </button>
                </div>

                <div className="form-group" style={{ marginBottom: '16px' }}>
                  <label>Global Marquee Separator / Divider Icon</label>
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <input
                      type="text"
                      style={{ width: '80px', textAlign: 'center', fontSize: '16px' }}
                      value={formData.tickerSeparator || '✳'}
                      onChange={(e) => setFormData({ ...formData, tickerSeparator: e.target.value })}
                    />
                    <div style={{ display: 'flex', gap: '6px' }}>
                      {['✳', '✦', '★', '⚡', '•', '◈', '⚛', '🚀'].map((sym) => (
                        <button
                          key={sym}
                          type="button"
                          className="btn secondary"
                          style={{ padding: '4px 8px', fontSize: '12px' }}
                          onClick={() => setFormData({ ...formData, tickerSeparator: sym })}
                        >
                          {sym}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div style={{ display: 'grid', gap: '10px' }}>
                  {((formData.tickerItems || []).map((it) => (typeof it === 'string' ? { text: it, icon: '✦' } : it))).map((item, idx) => (
                    <div
                      key={idx}
                      style={{
                        display: 'grid',
                        gridTemplateColumns: '120px 1fr 38px',
                        gap: '10px',
                        alignItems: 'center',
                        background: 'var(--paper)',
                        padding: '10px 12px',
                        borderRadius: '10px',
                        border: '1px solid var(--line)',
                      }}
                    >
                      <div>
                        <label style={{ fontSize: '10px', display: 'block', marginBottom: '2px', color: 'var(--muted)' }}>
                          Icon / Logo URL
                        </label>
                        <input
                          type="text"
                          value={item.icon || ''}
                          placeholder="✦ or URL"
                          style={{ fontSize: '13px' }}
                          onChange={(e) => {
                            const newItems = (formData.tickerItems || []).map((it) =>
                              typeof it === 'string' ? { text: it, icon: '✦' } : { ...it }
                            );
                            newItems[idx].icon = e.target.value;
                            setFormData({ ...formData, tickerItems: newItems });
                          }}
                        />
                      </div>
                      <div>
                        <label style={{ fontSize: '10px', display: 'block', marginBottom: '2px', color: 'var(--muted)' }}>
                          Marquee Text
                        </label>
                        <input
                          type="text"
                          value={item.text || ''}
                          placeholder="Headline text..."
                          style={{ fontSize: '13px' }}
                          onChange={(e) => {
                            const newItems = (formData.tickerItems || []).map((it) =>
                              typeof it === 'string' ? { text: it, icon: '✦' } : { ...it }
                            );
                            newItems[idx].text = e.target.value;
                            setFormData({ ...formData, tickerItems: newItems });
                          }}
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          const newItems = (formData.tickerItems || []).filter((_, i) => i !== idx);
                          setFormData({ ...formData, tickerItems: newItems });
                        }}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: '#EF4444',
                          cursor: 'pointer',
                          display: 'grid',
                          placeItems: 'center',
                          padding: '6px',
                        }}
                        title="Delete item"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* About Section Facts / KPIs */}
              <div className="admin-card">
                <h4 style={{ font: '700 15px var(--display)', marginBottom: '14px' }}>About Section 4 KPI Counters</h4>
                <div className="admin-form-grid">
                  {(formData.about?.facts || []).map((fact, index) => (
                    <div key={index} className="form-group">
                      <label>KPI {index + 1} Stat & Label</label>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <input
                          type="text"
                          style={{ width: '85px' }}
                          value={fact.stat}
                          onChange={(e) => {
                            const newFacts = [...formData.about.facts];
                            newFacts[index].stat = e.target.value;
                            setFormData({
                              ...formData,
                              about: { ...formData.about, facts: newFacts },
                            });
                          }}
                        />
                        <input
                          type="text"
                          value={fact.label}
                          onChange={(e) => {
                            const newFacts = [...formData.about.facts];
                            newFacts[index].label = e.target.value;
                            setFormData({
                              ...formData,
                              about: { ...formData.about, facts: newFacts },
                            });
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: EXPERIENCE TIMELINE */}
          {activeTab === 'experience' && (
            <div className="admin-section">
              <div className="admin-section-intro" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h3>Experience Journey Milestones</h3>
                  <p>Chapters alternate automatically (top / bottom across the horizon timeline).</p>
                </div>
                <button
                  type="button"
                  className="btn"
                  onClick={() => {
                    const newItem = {
                      period: '2024 – PRESENT',
                      role: 'New Engineering Role',
                      company: 'Company Name · Location',
                      desc: 'Describe key achievements and responsibilities in this role...',
                      tags: ['React', 'Node.js', 'TypeScript'],
                    };
                    setFormData({
                      ...formData,
                      experience: [newItem, ...(formData.experience || [])],
                    });
                  }}
                  style={{ padding: '8px 18px', fontSize: '12px' }}
                >
                  <Plus size={14} /> Add Milestone
                </button>
              </div>

              {/* Road Ahead (Front / First) & Start Point (Origin / End) Config */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px', marginBottom: '16px' }}>
                <div className="admin-card">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                    <span className="admin-index-pill" style={{ background: 'color-mix(in srgb, var(--green) 15%, transparent)', color: 'var(--green)' }}>
                      Front / First Milestone
                    </span>
                    <strong style={{ font: '700 14px var(--display)' }}>The Road Ahead ↗</strong>
                  </div>
                  <div className="admin-form-grid">
                    <div className="form-group full-width">
                      <label>Badge / Period</label>
                      <input
                        type="text"
                        value={formData.journeyMeta?.roadAhead?.label || 'PRESENT & FUTURE'}
                        onChange={(e) => setFormData({
                          ...formData,
                          journeyMeta: {
                            ...formData.journeyMeta,
                            roadAhead: { ...(formData.journeyMeta?.roadAhead || {}), label: e.target.value },
                          },
                        })}
                      />
                    </div>
                    <div className="form-group full-width">
                      <label>Title</label>
                      <input
                        type="text"
                        value={formData.journeyMeta?.roadAhead?.title || 'The Road Ahead ↗'}
                        onChange={(e) => setFormData({
                          ...formData,
                          journeyMeta: {
                            ...formData.journeyMeta,
                            roadAhead: { ...(formData.journeyMeta?.roadAhead || {}), title: e.target.value },
                          },
                        })}
                      />
                    </div>
                    <div className="form-group full-width">
                      <label>Description</label>
                      <textarea
                        rows="2"
                        value={formData.journeyMeta?.roadAhead?.desc || ''}
                        onChange={(e) => setFormData({
                          ...formData,
                          journeyMeta: {
                            ...formData.journeyMeta,
                            roadAhead: { ...(formData.journeyMeta?.roadAhead || {}), desc: e.target.value },
                          },
                        })}
                      />
                    </div>
                  </div>
                </div>

                <div className="admin-card">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                    <span className="admin-index-pill" style={{ background: 'color-mix(in srgb, var(--orange) 15%, transparent)', color: 'var(--orange)' }}>
                      Terminal Point / The Beginning
                    </span>
                    <strong style={{ font: '700 14px var(--display)' }}>Start Point · 2019 Beginning</strong>
                  </div>
                  <div className="admin-form-grid">
                    <div className="form-group full-width">
                      <label>Period / Beginning Date</label>
                      <input
                        type="text"
                        value={formData.journeyMeta?.startPoint?.period || '2019 · BEGINNING'}
                        onChange={(e) => setFormData({
                          ...formData,
                          journeyMeta: {
                            ...formData.journeyMeta,
                            startPoint: { ...(formData.journeyMeta?.startPoint || {}), period: e.target.value },
                          },
                        })}
                      />
                    </div>
                    <div className="form-group full-width">
                      <label>Role / Title</label>
                      <input
                        type="text"
                        value={formData.journeyMeta?.startPoint?.role || 'Day One / The Genesis'}
                        onChange={(e) => setFormData({
                          ...formData,
                          journeyMeta: {
                            ...formData.journeyMeta,
                            startPoint: { ...(formData.journeyMeta?.startPoint || {}), role: e.target.value },
                          },
                        })}
                      />
                    </div>
                    <div className="form-group full-width">
                      <label>Description</label>
                      <textarea
                        rows="2"
                        value={formData.journeyMeta?.startPoint?.desc || ''}
                        onChange={(e) => setFormData({
                          ...formData,
                          journeyMeta: {
                            ...formData.journeyMeta,
                            startPoint: { ...(formData.journeyMeta?.startPoint || {}), desc: e.target.value },
                          },
                        })}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div style={{ display: 'grid', gap: '16px' }}>
                {(formData.experience || []).map((item, index) => {
                  const isTop = index % 2 === 0;
                  return (
                    <div key={index} className="admin-card">
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <span className="admin-index-pill">
                            #{index + 1} · {isTop ? 'Top Horizon' : 'Bottom Horizon'}
                          </span>
                          <strong style={{ font: '700 15px var(--display)' }}>{item.role}</strong>
                        </div>
                        <button
                          type="button"
                          className="admin-delete-btn"
                          onClick={() => {
                            const filtered = formData.experience.filter((_, i) => i !== index);
                            setFormData({ ...formData, experience: filtered });
                          }}
                          title="Delete Milestone"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>

                      <div className="admin-form-grid">
                        <div className="form-group">
                          <label>Time Period</label>
                          <input
                            type="text"
                            value={item.period}
                            onChange={(e) => {
                              const updated = [...formData.experience];
                              updated[index].period = e.target.value;
                              setFormData({ ...formData, experience: updated });
                            }}
                          />
                        </div>

                        <div className="form-group">
                          <label>Role / Designation</label>
                          <input
                            type="text"
                            value={item.role}
                            onChange={(e) => {
                              const updated = [...formData.experience];
                              updated[index].role = e.target.value;
                              setFormData({ ...formData, experience: updated });
                            }}
                          />
                        </div>

                        <div className="form-group full-width">
                          <label>Company & City</label>
                          <input
                            type="text"
                            value={item.company}
                            onChange={(e) => {
                              const updated = [...formData.experience];
                              updated[index].company = e.target.value;
                              setFormData({ ...formData, experience: updated });
                            }}
                          />
                        </div>

                        <div className="form-group full-width">
                          <label>Description & Impact</label>
                          <textarea
                            rows="2"
                            value={item.desc}
                            onChange={(e) => {
                              const updated = [...formData.experience];
                              updated[index].desc = e.target.value;
                              setFormData({ ...formData, experience: updated });
                            }}
                          />
                        </div>

                        <div className="form-group full-width">
                          <label>Tags (Comma separated)</label>
                          <input
                            type="text"
                            value={(item.tags || []).join(', ')}
                            onChange={(e) => {
                              const updated = [...formData.experience];
                              updated[index].tags = e.target.value.split(',').map((t) => t.trim());
                              setFormData({ ...formData, experience: updated });
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 4: PROJECTS (WITH EDITABLE PROJECT IMAGES) */}
          {activeTab === 'projects' && (
            <div className="admin-section">
              <div className="admin-section-intro" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h3>Featured Projects & Screenshot Images</h3>
                  <p>Edit project titles, descriptions, direct GitHub links, live website demo URLs, and project showcase images.</p>
                </div>
                <button
                  type="button"
                  className="btn"
                  onClick={() => {
                    const newProj = {
                      id: String((formData.projects?.length || 0) + 1).padStart(2, '0'),
                      category: 'WEB APPLICATION',
                      title: 'New Featured Project',
                      desc: 'Describe what problem this project solves and the core stack utilized.',
                      tags: ['React', 'Node.js', 'MongoDB'],
                      type: 'Personal · Full stack',
                      image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=900&q=80',
                      caseStudy: {
                        problem: 'Enter user problem statement...',
                        solution: 'Enter architectural solution...',
                        features: ['Key feature 1', 'Key feature 2'],
                        github: 'https://github.com/',
                        demo: 'https://example.com/',
                      },
                    };
                    setFormData({
                      ...formData,
                      projects: [...(formData.projects || []), newProj],
                    });
                  }}
                  style={{ padding: '8px 18px', fontSize: '12px' }}
                >
                  <Plus size={14} /> Add Project
                </button>
              </div>

              <div style={{ display: 'grid', gap: '22px' }}>
                {(formData.projects || []).map((proj, index) => (
                  <div key={index} className="admin-card">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                      <strong style={{ font: '700 16px var(--display)' }}>
                        #{proj.id} — {proj.title}
                      </strong>
                      <button
                        type="button"
                        className="admin-delete-btn"
                        onClick={() => {
                          const filtered = formData.projects.filter((_, i) => i !== index);
                          setFormData({ ...formData, projects: filtered });
                        }}
                        title="Delete Project"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>

                    <div className="admin-form-grid">
                      <div className="form-group">
                        <label>Project Title</label>
                        <input
                          type="text"
                          value={proj.title}
                          onChange={(e) => {
                            const updated = [...formData.projects];
                            updated[index].title = e.target.value;
                            setFormData({ ...formData, projects: updated });
                          }}
                        />
                      </div>

                      <div className="form-group">
                        <label>Category Label</label>
                        <input
                          type="text"
                          value={proj.category}
                          onChange={(e) => {
                            const updated = [...formData.projects];
                            updated[index].category = e.target.value;
                            setFormData({ ...formData, projects: updated });
                          }}
                        />
                      </div>

                      {/* Project Image URL Input with Live Preview */}
                      <div className="form-group full-width">
                        <label>
                          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                            <Image size={13} color="var(--orange)" /> Project Preview Image URL (Editable)
                          </span>
                        </label>
                        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                          <input
                            type="text"
                            placeholder="https://images.unsplash.com/photo-..."
                            value={proj.image || ''}
                            onChange={(e) => {
                              const updated = [...formData.projects];
                              updated[index].image = e.target.value;
                              setFormData({ ...formData, projects: updated });
                            }}
                            style={{ flex: 1 }}
                          />
                          {proj.image && (
                            <div style={{ width: '50px', height: '36px', borderRadius: '6px', overflow: 'hidden', border: '1px solid var(--line)', flexShrink: 0 }}>
                              <img src={proj.image} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="form-group full-width">
                        <label>Brief Summary</label>
                        <textarea
                          rows="2"
                          value={proj.desc}
                          onChange={(e) => {
                            const updated = [...formData.projects];
                            updated[index].desc = e.target.value;
                            setFormData({ ...formData, projects: updated });
                          }}
                        />
                      </div>

                      <div className="form-group">
                        <label>Live Website Demo URL</label>
                        <input
                          type="url"
                          placeholder="https://example.com"
                          value={proj.caseStudy?.demo || ''}
                          onChange={(e) => {
                            const updated = [...formData.projects];
                            updated[index].caseStudy = {
                              ...(updated[index].caseStudy || {}),
                              demo: e.target.value,
                            };
                            setFormData({ ...formData, projects: updated });
                          }}
                        />
                      </div>

                      <div className="form-group">
                        <label>GitHub Repository URL</label>
                        <input
                          type="url"
                          placeholder="https://github.com/..."
                          value={proj.caseStudy?.github || ''}
                          onChange={(e) => {
                            const updated = [...formData.projects];
                            updated[index].caseStudy = {
                              ...(updated[index].caseStudy || {}),
                              github: e.target.value,
                            };
                            setFormData({ ...formData, projects: updated });
                          }}
                        />
                      </div>

                      <div className="form-group full-width">
                        <label>Tech Stack Tags (Comma separated)</label>
                        <input
                          type="text"
                          value={(proj.tags || []).join(', ')}
                          onChange={(e) => {
                            const updated = [...formData.projects];
                            updated[index].tags = e.target.value.split(',').map((t) => t.trim());
                            setFormData({ ...formData, projects: updated });
                          }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: SKILLS & TOOLKIT */}
          {activeTab === 'skills' && (
            <div className="admin-section">
              <div className="admin-section-intro" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h3>Skills & Technologies Toolkit</h3>
                  <p>Organize frontend, backend, database, and developer tooling.</p>
                </div>
                <button
                  type="button"
                  className="btn"
                  onClick={() => {
                    const newSkill = {
                      name: 'TypeScript',
                      desc: 'Type safety',
                      icon: 'TS',
                      category: 'frontend',
                    };
                    setFormData({
                      ...formData,
                      skills: [...(formData.skills || []), newSkill],
                    });
                  }}
                  style={{ padding: '8px 18px', fontSize: '12px' }}
                >
                  <Plus size={14} /> Add Skill
                </button>
              </div>

              <div className="admin-skills-editor-grid">
                {(formData.skills || []).map((skill, index) => (
                  <div key={index} className="admin-skill-box">
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <input
                        type="text"
                        style={{ width: '42px', textAlign: 'center', fontWeight: 'bold' }}
                        value={skill.icon}
                        onChange={(e) => {
                          const updated = [...formData.skills];
                          updated[index].icon = e.target.value;
                          setFormData({ ...formData, skills: updated });
                        }}
                      />
                      <button
                        type="button"
                        className="admin-delete-btn"
                        onClick={() => {
                          const filtered = formData.skills.filter((_, i) => i !== index);
                          setFormData({ ...formData, skills: filtered });
                        }}
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>

                    <input
                      type="text"
                      style={{ fontWeight: 700, marginBottom: '4px' }}
                      value={skill.name}
                      onChange={(e) => {
                        const updated = [...formData.skills];
                        updated[index].name = e.target.value;
                        setFormData({ ...formData, skills: updated });
                      }}
                    />

                    <input
                      type="text"
                      style={{ fontSize: '11px', marginBottom: '6px' }}
                      value={skill.desc}
                      onChange={(e) => {
                        const updated = [...formData.skills];
                        updated[index].desc = e.target.value;
                        setFormData({ ...formData, skills: updated });
                      }}
                    />

                    <select
                      value={skill.category}
                      onChange={(e) => {
                        const updated = [...formData.skills];
                        updated[index].category = e.target.value;
                        setFormData({ ...formData, skills: updated });
                      }}
                      style={{ width: '100%', padding: '4px 8px', fontSize: '11px', borderRadius: '6px' }}
                    >
                      <option value="frontend">Frontend</option>
                      <option value="backend">Backend & DB</option>
                      <option value="tools">Tools & Others</option>
                    </select>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: RECOGNITION (PROPER IMAGE ARRANGEMENTS) */}
          {activeTab === 'recognition' && (
            <div className="admin-section">
              <div className="admin-section-intro">
                <h3>Achievements & Certifications (Badge Images)</h3>
                <p>Manage badge images instead of plain emojis for an authentic, professional credentials showcase.</p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                {/* Achievements Col with Image support */}
                <div className="admin-card">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                    <h4 style={{ font: '700 16px var(--display)', margin: 0 }}>Achievements</h4>
                    <button
                      type="button"
                      className="btn secondary"
                      onClick={() => {
                        const newAch = {
                          image: 'https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?auto=format&fit=crop&w=400&q=80',
                          year: '2025 · SAMPLE',
                          title: 'New Award Milestone',
                          desc: 'Description of award or hackathon recognition...',
                        };
                        setFormData({
                          ...formData,
                          recognition: {
                            ...formData.recognition,
                            achievements: [...(formData.recognition?.achievements || []), newAch],
                          },
                        });
                      }}
                      style={{ padding: '5px 12px', fontSize: '11px' }}
                    >
                      <Plus size={13} /> Add
                    </button>
                  </div>

                  <div style={{ display: 'grid', gap: '16px' }}>
                    {(formData.recognition?.achievements || []).map((ach, index) => (
                      <div key={index} className="admin-credential-item">
                        <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '8px' }}>
                          <div style={{ width: '48px', height: '48px', borderRadius: '10px', overflow: 'hidden', border: '1px solid var(--line)', flexShrink: 0, background: 'var(--paper-2)' }}>
                            {ach.image ? (
                              <img src={ach.image} alt="Badge" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            ) : (
                              <div style={{ display: 'grid', placeItems: 'center', height: '100%' }}>🏆</div>
                            )}
                          </div>
                          <div style={{ flex: 1 }}>
                            <input
                              type="text"
                              placeholder="Badge Image URL"
                              value={ach.image || ''}
                              onChange={(e) => {
                                const updated = [...formData.recognition.achievements];
                                updated[index].image = e.target.value;
                                setFormData({
                                  ...formData,
                                  recognition: { ...formData.recognition, achievements: updated },
                                });
                              }}
                              style={{ fontSize: '11px', marginBottom: '4px' }}
                            />
                            <div style={{ display: 'flex', gap: '6px' }}>
                              <input
                                type="text"
                                placeholder="Year / Tag"
                                style={{ width: '110px', fontSize: '11px' }}
                                value={ach.year}
                                onChange={(e) => {
                                  const updated = [...formData.recognition.achievements];
                                  updated[index].year = e.target.value;
                                  setFormData({
                                    ...formData,
                                    recognition: { ...formData.recognition, achievements: updated },
                                  });
                                }}
                              />
                              <input
                                type="text"
                                placeholder="Title"
                                style={{ flex: 1, fontWeight: 'bold' }}
                                value={ach.title}
                                onChange={(e) => {
                                  const updated = [...formData.recognition.achievements];
                                  updated[index].title = e.target.value;
                                  setFormData({
                                    ...formData,
                                    recognition: { ...formData.recognition, achievements: updated },
                                  });
                                }}
                              />
                            </div>
                          </div>
                          <button
                            type="button"
                            className="admin-delete-btn"
                            onClick={() => {
                              const updated = formData.recognition.achievements.filter((_, i) => i !== index);
                              setFormData({
                                ...formData,
                                recognition: { ...formData.recognition, achievements: updated },
                              });
                            }}
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                        <textarea
                          rows="2"
                          placeholder="Achievement details..."
                          style={{ fontSize: '12px' }}
                          value={ach.desc}
                          onChange={(e) => {
                            const updated = [...formData.recognition.achievements];
                            updated[index].desc = e.target.value;
                            setFormData({
                              ...formData,
                              recognition: { ...formData.recognition, achievements: updated },
                            });
                          }}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Certifications Col with Image support */}
                <div className="admin-card">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                    <h4 style={{ font: '700 16px var(--display)', margin: 0 }}>Certifications</h4>
                    <button
                      type="button"
                      className="btn secondary"
                      onClick={() => {
                        const newCert = {
                          image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=400&q=80',
                          year: '2025 · CERTIFIED',
                          title: 'New Professional Certificate',
                          desc: 'Description of credential syllabus and verified skills...',
                          id: 'CERT-' + Math.floor(10000 + Math.random() * 90000),
                        };
                        setFormData({
                          ...formData,
                          recognition: {
                            ...formData.recognition,
                            certifications: [...(formData.recognition?.certifications || []), newCert],
                          },
                        });
                      }}
                      style={{ padding: '5px 12px', fontSize: '11px' }}
                    >
                      <Plus size={13} /> Add
                    </button>
                  </div>

                  <div style={{ display: 'grid', gap: '16px' }}>
                    {(formData.recognition?.certifications || []).map((cert, index) => (
                      <div key={index} className="admin-credential-item">
                        <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '8px' }}>
                          <div style={{ width: '48px', height: '48px', borderRadius: '10px', overflow: 'hidden', border: '1px solid var(--line)', flexShrink: 0, background: 'var(--paper-2)' }}>
                            {cert.image ? (
                              <img src={cert.image} alt="Badge" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            ) : (
                              <div style={{ display: 'grid', placeItems: 'center', height: '100%' }}>📜</div>
                            )}
                          </div>
                          <div style={{ flex: 1 }}>
                            <input
                              type="text"
                              placeholder="Certificate Badge Image URL"
                              value={cert.image || ''}
                              onChange={(e) => {
                                const updated = [...formData.recognition.certifications];
                                updated[index].image = e.target.value;
                                setFormData({
                                  ...formData,
                                  recognition: { ...formData.recognition, certifications: updated },
                                });
                              }}
                              style={{ fontSize: '11px', marginBottom: '4px' }}
                            />
                            <div style={{ display: 'flex', gap: '6px' }}>
                              <input
                                type="text"
                                placeholder="Year"
                                style={{ width: '100px', fontSize: '11px' }}
                                value={cert.year}
                                onChange={(e) => {
                                  const updated = [...formData.recognition.certifications];
                                  updated[index].year = e.target.value;
                                  setFormData({
                                    ...formData,
                                    recognition: { ...formData.recognition, certifications: updated },
                                  });
                                }}
                              />
                              <input
                                type="text"
                                placeholder="Certificate Title"
                                style={{ flex: 1, fontWeight: 'bold' }}
                                value={cert.title}
                                onChange={(e) => {
                                  const updated = [...formData.recognition.certifications];
                                  updated[index].title = e.target.value;
                                  setFormData({
                                    ...formData,
                                    recognition: { ...formData.recognition, certifications: updated },
                                  });
                                }}
                              />
                            </div>
                          </div>
                          <button
                            type="button"
                            className="admin-delete-btn"
                            onClick={() => {
                              const updated = formData.recognition.certifications.filter((_, i) => i !== index);
                              setFormData({
                                ...formData,
                                recognition: { ...formData.recognition, certifications: updated },
                              });
                            }}
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>

                        <div style={{ display: 'flex', gap: '8px', marginBottom: '6px' }}>
                          <input
                            type="text"
                            placeholder="Credential ID"
                            style={{ width: '180px', fontSize: '11px', fontFamily: 'var(--mono)' }}
                            value={cert.id || ''}
                            onChange={(e) => {
                              const updated = [...formData.recognition.certifications];
                              updated[index].id = e.target.value;
                              setFormData({
                                ...formData,
                                recognition: { ...formData.recognition, certifications: updated },
                              });
                            }}
                          />
                        </div>

                        <textarea
                          rows="2"
                          placeholder="Certificate details..."
                          style={{ fontSize: '12px' }}
                          value={cert.desc}
                          onChange={(e) => {
                            const updated = [...formData.recognition.certifications];
                            updated[index].desc = e.target.value;
                            setFormData({
                              ...formData,
                              recognition: { ...formData.recognition, certifications: updated },
                            });
                          }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 7: INBOX */}
          {activeTab === 'inbox' && (
            <div className="admin-section">
              <div className="admin-section-intro">
                <h3>Contact Inquiries Inbox</h3>
                <p>Messages submitted through the portfolio contact form via Express & MongoDB.</p>
              </div>

              {messages.length === 0 ? (
                <div className="admin-card" style={{ textAlign: 'center', padding: '40px 20px', color: 'var(--muted)' }}>
                  <Inbox size={42} style={{ margin: '0 auto 12px', opacity: 0.4 }} />
                  <h4>No contact messages yet</h4>
                  <p style={{ fontSize: '13px', margin: 0 }}>
                    When visitors submit the contact form on your portfolio SPA, their messages will arrive here.
                  </p>
                </div>
              ) : (
                <div style={{ display: 'grid', gap: '14px' }}>
                  {messages.map((msg, index) => (
                    <div key={index} className="admin-card">
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                        <div>
                          <strong style={{ fontSize: '15px', color: 'var(--ink)' }}>{msg.name}</strong>{' '}
                          <span style={{ fontSize: '12px', color: 'var(--muted)' }}>&lt;{msg.email}&gt;</span>
                          <div style={{ font: '600 12px var(--mono)', color: 'var(--green)', marginTop: '2px' }}>
                            Subject: {msg.subject || 'General Inquiry'}
                          </div>
                        </div>
                        <span style={{ font: '10px var(--mono)', color: 'var(--muted)' }}>
                          {new Date(msg.createdAt).toLocaleString()}
                        </span>
                      </div>
                      <p style={{ color: 'var(--ink)', fontSize: '14px', lineHeight: 1.6, background: 'var(--paper-2)', padding: '12px 14px', borderRadius: '10px', margin: 0 }}>
                        {msg.message}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 8: SSL / TLS SECURITY */}
          {activeTab === 'security' && (
            <div className="admin-section">
              <div className="admin-section-intro">
                <h3>SSL / TLS Encryption & Security (Free Version)</h3>
                <p>Status and configuration guide for 100% free SSL / TLS certificates across development and production.</p>
              </div>

              {/* Status Banner */}
              <div
                className="admin-card"
                style={{
                  background: 'color-mix(in srgb, #22C55E 8%, var(--paper))',
                  borderColor: '#22C55E',
                  marginBottom: '20px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                  <ShieldCheck size={24} color="#22C55E" />
                  <div>
                    <h4 style={{ margin: 0, font: '700 16px var(--display)', color: '#22C55E' }}>
                      Free SSL / TLS Ready & Configured
                    </h4>
                    <span style={{ fontSize: '12px', color: 'var(--muted)' }}>
                      Local Dev: @vitejs/plugin-basic-ssl · Backend: HSTS & Security Headers Active
                    </span>
                  </div>
                </div>
                <p style={{ fontSize: '13px', margin: 0, color: 'var(--ink)', lineHeight: 1.6 }}>
                  Your portfolio is equipped with free TLS encryption for local development and ready for zero-cost automated SSL in production deployment.
                </p>
              </div>

              {/* 3 Free SSL Deployment Options */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px', marginBottom: '20px' }}>
                <div className="admin-card">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                    <Lock size={16} color="var(--orange)" />
                    <strong style={{ font: '700 14px var(--display)' }}>1. Cloudflare Universal SSL</strong>
                  </div>
                  <span className="admin-index-pill" style={{ marginBottom: '8px', display: 'inline-block' }}>100% Free Forever</span>
                  <p style={{ fontSize: '12.5px', color: 'var(--muted)', lineHeight: 1.6, margin: 0 }}>
                    Route your custom domain through free Cloudflare DNS to get automatic wildcard SSL/TLS, HTTP/3, and automatic HTTP-to-HTTPS redirects with zero maintenance.
                  </p>
                </div>

                <div className="admin-card">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                    <Lock size={16} color="var(--green)" />
                    <strong style={{ font: '700 14px var(--display)' }}>2. Let's Encrypt / Certbot</strong>
                  </div>
                  <span className="admin-index-pill" style={{ marginBottom: '8px', display: 'inline-block' }}>100% Free Open Standard</span>
                  <p style={{ fontSize: '12.5px', color: 'var(--muted)', lineHeight: 1.6, margin: 0 }}>
                    For VPS (AWS, DigitalOcean, Hetzner, Linode). Run <code>sudo certbot --nginx</code> to issue official free TLS certificates that automatically renew every 90 days.
                  </p>
                </div>

                <div className="admin-card">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                    <Lock size={16} color="#3B82F6" />
                    <strong style={{ font: '700 14px var(--display)' }}>3. Vercel / Render / Netlify</strong>
                  </div>
                  <span className="admin-index-pill" style={{ marginBottom: '8px', display: 'inline-block' }}>Automatic Free TLS</span>
                  <p style={{ fontSize: '12.5px', color: 'var(--muted)', lineHeight: 1.6, margin: 0 }}>
                    When deploying frontend and backend to platforms like Vercel, Netlify, or Render, free SSL certificates are provisioned automatically within seconds of domain setup.
                  </p>
                </div>
              </div>

              {/* Dev SSL Verification */}
              <div className="admin-card">
                <h4 style={{ font: '700 15px var(--display)', marginBottom: '10px' }}>Active Security Features</h4>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px', fontSize: '12.5px' }}>
                  <div style={{ padding: '8px 12px', background: 'var(--paper-2)', borderRadius: '8px' }}>
                    <strong>HTTP Strict Transport Security (HSTS):</strong> Active
                  </div>
                  <div style={{ padding: '8px 12px', background: 'var(--paper-2)', borderRadius: '8px' }}>
                    <strong>X-Frame-Options (Clickjack Defense):</strong> SAMEORIGIN
                  </div>
                  <div style={{ padding: '8px 12px', background: 'var(--paper-2)', borderRadius: '8px' }}>
                    <strong>X-Content-Type-Options:</strong> nosniff
                  </div>
                  <div style={{ padding: '8px 12px', background: 'var(--paper-2)', borderRadius: '8px' }}>
                    <strong>Vite HTTPS Plugin:</strong> @vitejs/plugin-basic-ssl
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
