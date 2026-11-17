# Vanshil Mankad — Portfolio SPA (Pure MERN Stack)

A production-ready, fully animated personal portfolio built with the **MERN Stack** (MongoDB · Express · React · Node.js).

**Live:** [vanshilmankad.vercel.app](https://vanshilmankad.vercel.app) &nbsp;|&nbsp; **API:** [portfolio-vanshil.onrender.com](https://portfolio-vanshil.onrender.com/api/health)

---

## ✨ Features

- 🎨 **5 Color Themes** (Light & Dark) — switchable from Admin Dashboard
- 🔤 **5 Font Themes** — switchable from Admin Dashboard
- 🕹️ **Admin Dashboard** — edit all content, images, colors, fonts, ticker, experience, projects
- 🗂️ **Stacked Project Cards** with retreat animation
- 🛤️ **Horizontal Scrolling Timeline** (Experience) — sticky, pin-on-scroll
- 🔢 **Animated KPI Counters** in About section
- 📧 **Contact Form** wired to MongoDB via Express API
- 🔒 **Security Headers** + HTTPS (dev) / Render TLS (production)
- 📱 **Fully Responsive** — mobile, tablet, desktop

---

## 🏗️ Project Structure

```
portfolio1/
├── client/              # Vite + React SPA
│   ├── src/
│   │   ├── components/  # All UI sections + Admin Dashboard
│   │   ├── context/     # ThemeContext, PortfolioDataContext
│   │   ├── data/        # Default portfolio content (portfolioData.js)
│   │   └── styles/      # index.css (all CSS variables & themes)
│   ├── vercel.json      # Vercel deployment config
│   └── vite.config.js
├── server/              # Express + Mongoose API
│   ├── routes/          # contact.js, portfolio.js, admin.js
│   └── server.js
├── render.yaml          # Render deployment config
├── .env.example         # Environment variable template
└── README.md
```

---

## 🚀 Local Development

### 1. Clone & Install

```bash
git clone https://github.com/Mankad1944/portfolio.git
cd portfolio1

# Install all dependencies
npm run postinstall
# OR manually:
npm --prefix client install
npm --prefix server install
```

### 2. Environment Setup

```bash
cp .env.example .env
# Edit .env — set MONGO_URI to your MongoDB Atlas connection string
```

### 3. Run Dev Servers

```bash
# Terminal 1 — Frontend (HTTPS on https://localhost:5173)
npm run dev

# Terminal 2 — Backend (http://localhost:5000)
npm run dev:server
```

> **Note:** The frontend works standalone without the backend — it falls back to localStorage for all portfolio data. The backend only adds persistent contact form submissions and cross-device data sync.

---

## 🌐 Production Deployment

### Frontend → Vercel

1. Push repo to GitHub
2. Import the repo in [vercel.com](https://vercel.com)
3. Set **Root Directory** to `client`
4. Vercel auto-detects Vite — click **Deploy**
5. After your Render backend is live, update the API rewrite URL in `client/vercel.json`:
   ```json
   { "source": "/api/(.*)", "destination": "https://YOUR-APP.onrender.com/api/$1" }
   ```
   Then redeploy.

### Backend → Render

1. In [render.com](https://render.com), create a new **Web Service**
2. Connect your GitHub repo
3. Set **Root Directory** to `server`
4. **Build Command:** `npm install`
5. **Start Command:** `node server.js`
6. Add environment variable: `MONGO_URI` = your MongoDB Atlas URI
7. Click **Deploy**

> Render's free tier spins down after inactivity — the first request may take ~30 s to wake up.

---

## 🔑 Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `MONGO_URI` | ✅ (backend) | MongoDB Atlas connection string |
| `PORT` | — | Server port (Render sets this automatically) |
| `NODE_ENV` | — | `production` on Render |
| `USE_HTTPS` | — | `false` on Render (TLS handled by platform) |

See [`.env.example`](.env.example) for the full template.

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, Vite, CSS Variables |
| Animation | Intersection Observer, CSS transitions |
| Backend | Node.js, Express 4 |
| Database | MongoDB Atlas, Mongoose |
| Deployment | Vercel (frontend), Render (backend) |
| SSL/TLS | @vitejs/plugin-basic-ssl (dev), platform TLS (prod) |

---

## 📄 License

MIT © 2024 Vanshil Mankad
