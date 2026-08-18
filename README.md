# 🎧 ListenTogether · Heartbeats Arcade

> A nostalgic, cinematic shared listening room and relationship quest mixtape for two.

[![Deployment Status](https://img.shields.io/badge/deployment-live-brightgreen)](https://90sheartbeat.netlify.app/)
[![Tech Stack](https://img.shields.io/badge/stack-React_19_%7C_TypeScript_%7C_Vite_%7C_Tailwind_v4-blue)](https://vitejs.dev/)

---

## ✨ Features

- 🌆 **Cinematic Layered Visual World**: 20-second WebM ambient video background loop, Three.js particle canvas, atmospheric lighting overlays, film grain, and subtle mouse micro-parallax.
- 📜 **7 Relationship Story Stages**: Interactive choice quests spanning from *Talking Stage* to *Golden Era*, featuring curated Hindi & English soundtracks:
  1. **Talking Stage** — *Pehle Bhi Main* by Vishal Mishra
  2. **Getting Closer** — *Sunflower* by Post Malone & Swae Lee
  3. **Crush** — *Tum Hi Ho* by Arijit Singh
  4. **Falling in Love** — *Perfect* by Ed Sheeran
  5. **In Love** — *Raataan Lambiyan* by Jubin Nautiyal
  6. **Deep Cut** — *Channa Mereya* by Arijit Singh
  7. **Golden Era** — *Kal Ho Naa Ho* by Sonu Nigam
- 🎛️ **Engineered Dual Audio Player**:
  - Section-Isolated Loop Controls (`Story Map` vs `Shared Room`).
  - Real-time time counter (`currentTime` / `duration`) & seeking progress bar.
  - Offscreen active iframe player for YouTube audio streams.
  - Native Web Audio API synthesizer backup for guaranteed audible chord harmonies.
- 💌 **Shared Listening Room**: Embedded music player, starter playlist picks, partner radio selector (P1 / P2), link saving, and mood tagging (`soft`, `electric`, `deep`).
- 📱 **Mobile First & Responsive**: Optimized for all viewports from mobile phones to high-res desktop screens.

---

## 🛠️ Tech Stack

- **Framework**: React 19 + TypeScript
- **Bundler**: Vite 8
- **Styling**: Tailwind CSS v4
- **3D Graphics & Canvas**: Three.js & `@react-three/fiber`
- **Audio Output**: YouTube Iframe API + Web Audio API (`AudioContext`)
- **Deployment**: Netlify

---

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Development Server
```bash
npm run dev
```
Open `http://localhost:5173` in your browser.

### 3. Build for Production
```bash
npm run build
```
Output files are generated in the `dist/` directory.

---

## 🌐 Live Production Deployment

The production app is deployed live at: **[https://twoheartsbeat.vercel.app/](https://twoheartsbeat.vercel.app/)**
