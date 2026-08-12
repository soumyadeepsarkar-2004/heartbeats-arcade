# 💖 Heartbeats Arcade · Shared Listening Room for Two

[![Netlify Status](https://api.netlify.com/api/v1/badges/64136b73-835e-4f8a-ad94-a785c25df5f7/deploy-status)](https://app.netlify.com/projects/90sheartbeat/deploys)
[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Active-success?logo=github)](https://soumyadeepsarkar-2004.github.io/heartbeats-arcade/)
[![License: MIT](https://img.shields.io/badge/License-MIT-pink.svg)](LICENSE)

> A minimal shared listening room, relationship story map, and interactive music diary designed for two people to stream music together across the internet.

**Live at**: [https://90sheartbeat.netlify.app](https://90sheartbeat.netlify.app)  
👉 **Backup Mirror**: [https://soumyadeepsarkar-2004.github.io/heartbeats-arcade/](https://soumyadeepsarkar-2004.github.io/heartbeats-arcade/)

---

## ✨ Features

### 🎧 1. Universal Multi-Platform Music iFrame Engine
Paste any music URL or embed snippet to stream inside your shared room:
- **Spotify**: Playlists, Albums, and Tracks (`open.spotify.com/...`, `spotify:playlist:...`)
- **YouTube & YouTube Music**: Playlists & Videos (`music.youtube.com/...`, `youtube.com/watch?v=...`, `youtu.be/...`)
- **Apple Music**: Albums & Tracks (`music.apple.com/...` auto-converted to `embed.music.apple.com`)
- **SoundCloud**: Tracks & Sets (`soundcloud.com/...` HTML5 Widget)
- **Bandcamp & Vimeo**: Direct track and video embeds
- **Raw `<iframe>` HTML**: Paste embed code directly
- **Generic Audio Links**: Any valid `http://` / `https://` web link

### 📖 2. 7-Stage Interactive Story Map
Navigate through 7 story stages depicting relationship milestones with dedicated ambient themes and default soundtracks:
1. **Talking Stage** (`level one · soft launch`)
2. **Getting Closer** (`level two · open tabs`)
3. **Crush** (`level three · heart eyes`)
4. **Falling in Love** (`level four · free fall`)
5. **In Love** (`level five · side b`)
6. **Deep Cut** (`level six · low lights`)
7. **Golden Era** (`level seven · final track`)

### ◌ 3. Shared Listening Room (`#roomModal`)
- **Partner Attribution**: Dual-person radios (`Person 1` / `Person 2`) tag entries with `P1` and `P2` badges.
- **Mood Diary**: Filter saved entries by `ALL`, `P1`, or `P2` and delete unwanted tracks with the `×` button.
- **Instant Cross-Device Share Link**: Clicking **"copy invite ↗"** generates a URL hash (`#room=...`) that automatically loads your room's playlists on your partner's device.
- **3–2–1 Sync Countdown**: Live 3-second countdown timer for synchronized simultaneous playback.

### 📻 4. Persistent Home Playbar Dock
Floating player dock at the bottom of the screen that dynamically updates track title, artist, cover art palette, and provider badge (`#sourceBadge`) in real-time.

---

## 🚀 Local Development Setup

No build tools or heavy node dependencies required! To run locally:

```bash
# Clone repository
git clone https://github.com/soumyadeepsarkar-2004/heartbeats-arcade.git
cd heartbeats-arcade

# Serve via local HTTP server
python -m http.server 8000
```

Open `http://localhost:8000/` in your browser.

---

## 🛠️ Tech Stack

- **Frontend**: HTML5, Vanilla JavaScript (ES6+), Vanilla CSS3 (Custom Properties & Glassmorphism)
- **Audio Integration**: Spotify iFrame API, HTML5 Web Audio Synthesizer, YouTube & Multi-Platform iFrame API
- **Deployment**: Netlify Continuous Deployment & GitHub Pages

---

## 📄 License

MIT License © 2026 |
Maintainer : [soumyadeepsarkar-2004](https://github.com/soumyadeepsarkar-2004)
