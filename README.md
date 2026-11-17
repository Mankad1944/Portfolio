# Aarav Shah — Full-Stack Developer Portfolio SPA (Pure MERN Stack)

A modern, high-performance, single-page application (SPA) portfolio website built with the **pure MERN stack** (MongoDB, Express, React, Node.js), adapted from the provided design and enhanced with rich interactivity, interactive modals, responsive animations, and a real-time contact system.

---

## 🎨 5 Curated Color Themes (Light & Dark Mode)

The application features full runtime theme switching across all 5 curated palettes, with **Theme 1 (Minimalist Slate & Electric Indigo)** as the primary suited aesthetic for full-stack developers:

1. **Minimalist Slate & Electric Indigo** *(Clean & Technical — Default)*
   - **Light:** `#F8FAFC` bg, `#FFFFFF` cards, `#E2E8F0` border, `#0F172A` text, `#4F46E5` primary accent, `#0EA5E9` secondary accent
   - **Dark:** `#090D16` bg, `#111827` cards, `#1E293B` border, `#F8FAFC` text, `#6366F1` primary accent, `#38BDF8` secondary accent
2. **Cinematic Obsidian & Warm Amber** *(Editorial & Bold)*
   - **Light:** `#FAF9F6` bg, `#FFFFFF` cards, `#E7E5E4` border, `#1C1917` text, `#D97706` primary accent, `#0D9488` secondary accent
   - **Dark:** `#0A0A0A` bg, `#141414` cards, `#262626` border, `#FAFAFA` text, `#F59E0B` primary accent, `#2DD4BF` secondary accent
3. **Nordic Sage & Terracotta** *(Organic & Approachable)*
   - **Light:** `#F4F6F4` bg, `#FFFFFF` cards, `#DCE2DD` border, `#1A241E` text, `#2D6A4F` primary accent, `#E07A5F` secondary accent
   - **Dark:** `#0E1310` bg, `#161E19` cards, `#25332B` border, `#EDF2EE` text, `#52B788` primary accent, `#F28482` secondary accent
4. **Monochrome Zinc & Acid Lime** *(High-Contrast & Avant-Garde)*
   - **Light:** `#F4F4F5` bg, `#FFFFFF` cards, `#D4D4D8` border, `#18181B` text, `#18181B` primary accent, `#84CC16` highlight
   - **Dark:** `#09090B` bg, `#121215` cards, `#27272A` border, `#FAFAFA` text, `#A3E635` primary accent, `#E4E4E7` secondary accent
5. **Midnight Plum & Rose Coral** *(Creative & Expressive — from `index (2).html`)*
   - **Light:** `#FDFCFE` bg, `#FFFFFF` cards, `#EAE4F2` border, `#1E162B` text, `#7C3AED` primary accent, `#F43F5E` secondary accent
   - **Dark:** `#0D0A14` bg, `#171224` cards, `#2A213D` border, `#F5F3FF` text, `#A78BFA` primary accent, `#FB7185` secondary accent

> **Instant Theme Switcher:** Click the palette pill in the navigation header to switch between any of the 5 palettes, and use the Sun/Moon button to toggle Light/Dark mode. Preferences are saved automatically to `localStorage`.

---

## 🏗️ Project Architecture

```
portfolio1/
├── index (2).html            # Original reference design
├── package.json              # Root project scripts
├── client/                   # React 19 + Vite Frontend SPA
│   ├── index.html            # HTML entry point with DM Sans, Manrope, DM Mono
│   ├── vite.config.js        # Vite config with API proxy to localhost:5000
│   ├── package.json          # Frontend dependencies
│   ├── dist/                 # Production build bundle
│   └── src/
│       ├── main.jsx          # React DOM entry point
│       ├── App.jsx           # Master SPA composition
│       ├── context/
│       │   └── ThemeContext.jsx # 5 Theme palettes + Light/Dark mode provider
│       ├── styles/
│       │   └── index.css     # CSS design tokens & animations
│       ├── data/
│       │   └── portfolioData.js # Structured content, projects, experience
│       └── components/
│           ├── Navbar.jsx    # Responsive header with brand & drawer
│           ├── ThemeSelector.jsx # Interactive 5-palette modal picker
│           ├── Hero.jsx      # Scroll-driven hero zoom & CSS portrait art
│           ├── Ticker.jsx    # Seamless infinite marquee banner
│           ├── About.jsx     # Introduction & 4 KPI statistic cards
│           ├── Skills.jsx    # 12 Toolkit items with category filtering
│           ├── Journey.jsx   # Horizontal experience timeline + arrow controls
│           ├── Projects.jsx  # Sticky stacked cards with retreat effect
│           ├── ProjectModal.jsx # Case study modal with architecture details
│           ├── Recognition.jsx # Achievements & verified certification milestones
│           ├── Contact.jsx   # Interactive message form + confetti celebration
│           ├── Footer.jsx    # Expanded sitemap & contact links
│           └── ScrollToTop.jsx # Floating back-to-top button
└── server/                   # Express + MongoDB Backend
    ├── server.js             # Express app & static file server
    ├── package.json          # Backend dependencies
    ├── .env                  # Configuration (PORT, MONGO_URI)
    ├── models/
    │   ├── Message.js        # Mongoose schema for inquiries
    │   └── Project.js        # Mongoose schema for projects
    └── routes/
        ├── contact.js        # POST/GET /api/contact with resilient storage
        └── portfolio.js      # GET /api/portfolio/* endpoints
```

---

## 🚀 Running the Application

### 1. Run Frontend Only (Vite Dev Server)
```bash
cd client
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 2. Run Full MERN Stack (Backend + Client)
```bash
# Terminal 1: Start Express & MongoDB Server (port 5000)
cd server
npm start

# Terminal 2: Start React Client with Proxy (port 5173)
cd client
npm run dev
```

### 3. Production Build & Unified Serving
The client bundle has already been compiled to `client/dist`. Starting the Express server serves both the REST API and the production client:
```bash
cd server
npm start
```
Visit [http://localhost:5000](http://localhost:5000).

---

## 🌟 Key Features Implemented

- **Exact faithful translation of `index (2).html`** into clean, modular React components.
- **Admin Dashboard Portal (`/admin` trigger in Navbar)**:
  - **Full Theme & Variable Engine**: Preset combination selector (Theme 2 Default), Light/Dark toggle, and **variable-by-variable color tuning** with live pickers for `--paper`, `--paper-2`, `--white`, `--line`, `--ink`, `--muted`, `--green`, `--orange`, and `--yellow`.
  - **Profile & Hero Manager**: Update name, bio, tagline, contact information, and switch between original CSS Art portrait or custom image URL.
  - **Experience Timeline Manager**: Add, edit, delete, and reorder chapters.
  - **Project Manager**: Add, edit, delete projects, adjust direct GitHub links and Live Demo URLs.
  - **Skills & Toolkit Manager**: Add, edit, and delete skills, icons, and categories.
  - **Achievements & Certifications Manager**: Add, edit, and delete credentials.
  - **Messages Inbox**: View all inquiries submitted through the contact form in real time.
- **Alternating Experience Horizon Timeline**:
  - Vertical-scroll driven horizontal translation gathered from `index (2).html`.
  - Decreased compact card dimensions.
  - Alternating layout: card 1 top (over the timeline), card 2 bottom (under the timeline), card 3 top, and so on.
  - Pinned central horizon bar with dynamic gradient progress line.
  - Text fill reveal effect on scroll (`background-position: 0 0`).
  - Browser scrollbar completely removed.
- **Enlarged Project Container in Laptop View**:
  - Generous 1140px maximum container width.
  - 2 direct action buttons on each project card: **Live Demo** and **GitHub Code**, alongside the deep-dive Case Study viewer.
- **Theme 2 (Cinematic Obsidian & Warm Amber) Default**:
  - Theme change controls removed from the titlebar and cleanly centralized in the Admin Dashboard.
