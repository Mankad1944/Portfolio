import React, { createContext, useContext, useState, useEffect } from 'react';

export const PALETTES = [
  {
    id: 1,
    name: 'Minimalist Slate & Electric Indigo',
    badge: 'Clean & Technical',
    description: 'Best for software engineers & full-stack developers',
    light: {
      bg: '#F8FAFC',
      surface: '#FFFFFF',
      border: '#E2E8F0',
      text: '#0F172A',
      muted: '#475569',
      accentPrimary: '#4F46E5',
      accentSecondary: '#0EA5E9',
      highlight: '#818CF8',
    },
    dark: {
      bg: '#090D16',
      surface: '#111827',
      border: '#1E293B',
      text: '#F8FAFC',
      muted: '#94A3B8',
      accentPrimary: '#6366F1',
      accentSecondary: '#38BDF8',
      highlight: '#818CF8',
    },
  },
  {
    id: 2,
    name: 'Cinematic Obsidian & Warm Amber',
    badge: 'Editorial & Bold (Default)',
    description: 'Best for creative developers & UI/UX showcase',
    light: {
      bg: '#FAF9F6',
      surface: '#FFFFFF',
      border: '#E7E5E4',
      text: '#1C1917',
      muted: '#57534E',
      accentPrimary: '#D97706',
      accentSecondary: '#0D9488',
      highlight: '#F59E0B',
    },
    dark: {
      bg: '#0A0A0A',
      surface: '#141414',
      border: '#262626',
      text: '#FAFAFA',
      muted: '#A3A3A3',
      accentPrimary: '#F59E0B',
      accentSecondary: '#2DD4BF',
      highlight: '#FBBF24',
    },
  },
  {
    id: 3,
    name: 'Nordic Sage & Terracotta',
    badge: 'Organic & Approachable',
    description: 'Best for human-centric & sophisticated interfaces',
    light: {
      bg: '#F4F6F4',
      surface: '#FFFFFF',
      border: '#DCE2DD',
      text: '#1A241E',
      muted: '#4A5950',
      accentPrimary: '#2D6A4F',
      accentSecondary: '#E07A5F',
      highlight: '#52B788',
    },
    dark: {
      bg: '#0E1310',
      surface: '#161E19',
      border: '#25332B',
      text: '#EDF2EE',
      muted: '#95A69B',
      accentPrimary: '#52B788',
      accentSecondary: '#F28482',
      highlight: '#74C69D',
    },
  },
  {
    id: 4,
    name: 'Monochrome Zinc & Acid Lime',
    badge: 'High-Contrast & Avant-Garde',
    description: 'Best for ultra-modern brutalist & interactive edge',
    light: {
      bg: '#F4F4F5',
      surface: '#FFFFFF',
      border: '#D4D4D8',
      text: '#18181B',
      muted: '#52525B',
      accentPrimary: '#18181B',
      accentSecondary: '#84CC16',
      highlight: '#84CC16',
    },
    dark: {
      bg: '#09090B',
      surface: '#121215',
      border: '#27272A',
      text: '#FAFAFA',
      muted: '#A1A1AA',
      accentPrimary: '#A3E635',
      accentSecondary: '#E4E4E7',
      highlight: '#BEF264',
    },
  },
  {
    id: 5,
    name: 'Midnight Plum & Rose Coral',
    badge: 'Creative & Expressive',
    description: 'Best for digital artists & visual storytelling',
    light: {
      bg: '#FDFCFE',
      surface: '#FFFFFF',
      border: '#EAE4F2',
      text: '#1E162B',
      muted: '#5B506B',
      accentPrimary: '#7C3AED',
      accentSecondary: '#F43F5E',
      highlight: '#F9A8D4',
    },
    dark: {
      bg: '#0D0A14',
      surface: '#171224',
      border: '#2A213D',
      text: '#F5F3FF',
      muted: '#A69BB8',
      accentPrimary: '#A78BFA',
      accentSecondary: '#FB7185',
      highlight: '#C4B5FD',
    },
  },
];

export const FONT_THEMES = [
  {
    id: 1,
    name: 'Engineered Tech',
    badge: 'Clean & Technical',
    heading: 'Space Grotesk',
    headingWeights: '600, 700',
    body: 'Inter',
    bodyWeights: '400, 500',
    mono: 'JetBrains Mono',
    monoWeight: '400',
    cssDisplay: "'Space Grotesk', system-ui, sans-serif",
    cssSans: "'Inter', -apple-system, system-ui, sans-serif",
    cssMono: "'JetBrains Mono', monospace",
  },
  {
    id: 2,
    name: 'Sleek Product UI',
    badge: 'Modern & Seamless',
    heading: 'Geist Sans',
    headingWeights: '600, 700',
    body: 'Geist Sans',
    bodyWeights: '400, 500',
    mono: 'Geist Mono',
    monoWeight: '400',
    cssDisplay: "'Geist', 'Geist Sans', system-ui, sans-serif",
    cssSans: "'Geist', 'Geist Sans', system-ui, sans-serif",
    cssMono: "'Geist Mono', monospace",
  },
  {
    id: 3,
    name: 'Bold & Kinetic',
    badge: 'Punchy & Expressive',
    heading: 'Syne',
    headingWeights: '700, 800',
    body: 'Plus Jakarta Sans',
    bodyWeights: '400, 500, 600',
    mono: 'Space Mono',
    monoWeight: '400',
    cssDisplay: "'Syne', system-ui, sans-serif",
    cssSans: "'Plus Jakarta Sans', system-ui, sans-serif",
    cssMono: "'Space Mono', monospace",
  },
  {
    id: 4,
    name: 'Minimalist Neo-Grotesque',
    badge: 'Architectural & Crisp',
    heading: 'Satoshi',
    headingWeights: '700, 900',
    body: 'General Sans',
    bodyWeights: '400, 500',
    mono: 'IBM Plex Mono',
    monoWeight: '400',
    cssDisplay: "'Satoshi', system-ui, sans-serif",
    cssSans: "'General Sans', system-ui, sans-serif",
    cssMono: "'IBM Plex Mono', monospace",
  },
  {
    id: 5,
    name: 'Clean All-Rounder',
    badge: 'Balanced & Friendly',
    heading: 'Outfit',
    headingWeights: '600, 700',
    body: 'Outfit',
    bodyWeights: '400, 500',
    mono: 'Fira Code',
    monoWeight: '400',
    cssDisplay: "'Outfit', system-ui, sans-serif",
    cssSans: "'Outfit', system-ui, sans-serif",
    cssMono: "'Fira Code', monospace",
  },
];

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  // SET THEME 2 AS DEFAULT THEME (as requested)
  const [paletteId, setPaletteId] = useState(() => {
    try {
      const saved = localStorage.getItem('portfolio-palette');
      return saved ? parseInt(saved, 10) : 2;
    } catch {
      return 2;
    }
  });

  const [mode, setMode] = useState(() => {
    try {
      const saved = localStorage.getItem('portfolio-mode');
      if (saved) return saved;
      return 'dark'; // Defaulting to cinematic dark or light
    } catch {
      return 'dark';
    }
  });

  // Custom individual variable overrides (variable by variable)
  const [customVariables, setCustomVariables] = useState(() => {
    try {
      const saved = localStorage.getItem('portfolio-custom-vars');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // 5 CURATED FONT THEMES (Engineered Tech, Sleek Product UI, Bold & Kinetic, Minimalist Neo-Grotesque, Clean All-Rounder)
  const [fontThemeId, setFontThemeId] = useState(() => {
    try {
      const saved = localStorage.getItem('portfolio-font-theme');
      return saved ? parseInt(saved, 10) : 1;
    } catch {
      return 1;
    }
  });

  const [customFontVariables, setCustomFontVariables] = useState(() => {
    try {
      const saved = localStorage.getItem('portfolio-custom-font-vars');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const currentPalette = PALETTES.find((p) => p.id === paletteId) || PALETTES[1];
  const currentFontTheme = FONT_THEMES.find((f) => f.id === fontThemeId) || FONT_THEMES[0];

  // Apply theme attributes and individual variable overrides to :root
  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-palette', paletteId.toString());
    root.setAttribute('data-theme', mode);
    root.setAttribute('data-font-theme', fontThemeId.toString());

    // Apply any custom variable overrides
    const varMap = {
      paper: '--paper',
      paper2: '--paper-2',
      white: '--white',
      line: '--line',
      ink: '--ink',
      muted: '--muted',
      green: '--green',
      orange: '--orange',
      yellow: '--yellow',
    };

    Object.keys(varMap).forEach((key) => {
      const cssProp = varMap[key];
      if (customVariables && customVariables[key]) {
        root.style.setProperty(cssProp, customVariables[key]);
      } else {
        root.style.removeProperty(cssProp);
      }
    });

    // Apply any custom font variable overrides
    const fontMap = {
      display: '--display',
      sans: '--sans',
      mono: '--mono',
    };

    Object.keys(fontMap).forEach((key) => {
      const cssProp = fontMap[key];
      if (customFontVariables && customFontVariables[key]) {
        root.style.setProperty(cssProp, customFontVariables[key]);
      } else {
        root.style.removeProperty(cssProp);
      }
    });

    const activeColors = mode === 'dark' ? currentPalette.dark : currentPalette.light;
    const effectiveBg = customVariables.paper || activeColors.bg;

    const themeMeta = document.querySelector('meta[name="theme-color"]');
    if (themeMeta) {
      themeMeta.setAttribute('content', effectiveBg);
    }

    try {
      localStorage.setItem('portfolio-palette', paletteId.toString());
      localStorage.setItem('portfolio-mode', mode);
      localStorage.setItem('portfolio-custom-vars', JSON.stringify(customVariables));
      localStorage.setItem('portfolio-font-theme', fontThemeId.toString());
      localStorage.setItem('portfolio-custom-font-vars', JSON.stringify(customFontVariables));
    } catch (e) {
      console.warn('Failed saving theme to localStorage', e);
    }
  }, [paletteId, mode, customVariables, currentPalette, fontThemeId, customFontVariables]);

  const toggleMode = () => {
    setMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const selectPalette = (id) => {
    setPaletteId(id);
    // When a preset combination is chosen, clear individual overrides so the curated preset shines
    setCustomVariables({});
  };

  const selectFontTheme = (id) => {
    setFontThemeId(id);
    setCustomFontVariables({});
  };

  const setFontVariable = (key, fontName) => {
    setCustomFontVariables((prev) => ({
      ...prev,
      [key]: fontName,
    }));
  };

  const resetFontDefaults = () => {
    setCustomFontVariables({});
    try {
      localStorage.removeItem('portfolio-custom-font-vars');
    } catch (_) {}
  };

  const getActiveFont = (key) => {
    if (customFontVariables && customFontVariables[key]) return customFontVariables[key];
    switch (key) {
      case 'display': return currentFontTheme.cssDisplay;
      case 'sans': return currentFontTheme.cssSans;
      case 'mono': return currentFontTheme.cssMono;
      default: return '';
    }
  };

  const setVariableColor = (variableName, colorHex) => {
    setCustomVariables((prev) => ({
      ...prev,
      [variableName]: colorHex,
    }));
  };

  const resetToPresetDefaults = () => {
    setCustomVariables({});
    try {
      localStorage.removeItem('portfolio-custom-vars');
    } catch (_) {}
  };

  // Get active color value for any variable (custom if overridden, otherwise preset)
  const getActiveVariable = (varKey) => {
    if (customVariables[varKey]) return customVariables[varKey];
    const p = mode === 'dark' ? currentPalette.dark : currentPalette.light;
    switch (varKey) {
      case 'paper': return p.bg;
      case 'paper2': return mode === 'dark' ? '#141414' : '#F2EFE9';
      case 'white': return p.surface;
      case 'line': return p.border;
      case 'ink': return p.text;
      case 'muted': return p.muted;
      case 'green': return p.accentPrimary;
      case 'orange': return p.accentSecondary;
      case 'yellow': return p.highlight;
      default: return '#000000';
    }
  };

  return (
    <ThemeContext.Provider
      value={{
        paletteId,
        mode,
        setMode,
        currentPalette,
        palettes: PALETTES,
        toggleMode,
        selectPalette,
        customVariables,
        setVariableColor,
        resetToPresetDefaults,
        getActiveVariable,
        fontThemeId,
        selectFontTheme,
        fontThemes: FONT_THEMES,
        currentFontTheme,
        customFontVariables,
        setFontVariable,
        resetFontDefaults,
        getActiveFont,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
