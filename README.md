# 🎵 Spotify Clone

> A responsive front-end clone of the Spotify web player — built with vanilla **HTML**, **CSS**, and **JavaScript**. No frameworks, no build step. (The app title shown in the browser tab is *"Music App"*.)

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)


---

## 📋 Table of Contents

- [About](#-about)
- [Features](#-features)
- [Screenshots](#-screenshots)
- [Tech Stack](#-tech-stack)
- [Folder Structure](#-folder-structure)
- [Getting Started](#-getting-started)
- [Usage](#-usage)
- [Customization](#-customization)
- [Roadmap](#-roadmap)
- [License](#-license)

---

## 📖 About

This project recreates the look and feel of Spotify's web player as a static
front-end app. It focuses on layout, responsive design, and interactive UI built
purely with vanilla web technologies — no libraries or frameworks.

Playback is **simulated**: instead of streaming real audio, a timer drives the
progress bar and time display (see `SONG_DURATION_SECONDS` in `script.js`). This
keeps the project lightweight while still demonstrating the full player UX.

> **Note:** This is a personal learning project and is not affiliated with,
> endorsed by, or connected to Spotify AB. All Spotify trademarks belong to their
> respective owners. Album artwork is loaded from Spotify's public image CDN, so an
> internet connection is required to display cover images.

---

## ✨ Features

**Working now**

- ▶️ **Play / pause** — toggle button drives a simulated progress timer
- 📊 **Interactive seekbar** — click anywhere on the bar to jump, or grab and drag the handle
- ⏱️ **Live time display** — elapsed and total time shown as `m:ss` (e.g. `0:12/0:20`)
- 📂 **Dynamic playlists** — playlist cards are rendered from a JavaScript data array
- 🎧 **Playlist → Library flow** — click a playlist card and its tracks load into "Your Library"; the first track auto-plays
- 🔀 **Now-playing bar** — updates the track name, artist, and icon with a smooth fade transition
- ⌨️ **Keyboard accessible** — playlist cards and library songs respond to `Enter` / `Space`
- 📱 **Fully responsive** — an off-canvas library drawer (hamburger menu) appears below 1500px, with layouts tuned all the way down to 300px

**Planned / UI-only** (present in the design but not yet wired up — see [Roadmap](#-roadmap))

- ⏮️ ⏭️ Previous / Next track buttons
- 🔍 Search bar
- 👤 Login / Sign up / Install App actions

---

## 📸 Screenshots

<!-- Drop your images in a /screenshots folder and update the paths below -->

| Desktop | Mobile (drawer open) |
| :-----: | :------------------: |
| ![Desktop view](./screenshots/desktop.png) | ![Mobile view](./screenshots/mobile.png) |

---

## 🛠 Tech Stack

| Technology | Used for |
| ---------- | -------- |
| **HTML5**  | Semantic page structure |
| **CSS3**   | Grid & Flexbox layout, transitions, and responsive media queries |
| **JavaScript (ES6+)** | DOM rendering, player logic (`setInterval`), drag handling, and `matchMedia` for the responsive drawer |
| **SVG** | Logo and UI icons (`logo.svg`, `home.svg`, `musicicon.svg`) |

---

## 📁 Folder Structure

```text
spotify-clone/
├── index.html      # Page markup
├── style.css       # All styling + responsive media queries
├── script.js       # Player logic, playlist rendering, drag & responsive drawer
├── logo.svg        # App logo
├── home.svg        # Home icon
└── musicicon.svg   # Now-playing / track icon
```

---

## 🚀 Getting Started

No installation or build tools required — it's a static site.

### Option 1 — Open directly

Download or clone the repo, then double-click `index.html` to open it in your
browser. (An internet connection is needed so the album covers load from
Spotify's CDN.)

### Option 2 — Run a local server (recommended)

```bash
# Clone the repository
git clone https://github.com/your-username/spotify-clone.git
cd spotify-clone

# Then start any static server, for example:

# Using Python 3
python -m http.server 8000

# — or — using Node
npx serve
```

Then open `http://localhost:8000` in your browser.

---

## 🎮 Usage

1. Pick a **playlist card** on the right — its songs load into "Your Library" on
   the left and the first track starts playing.
2. Click any song in **Your Library** to play it; the now-playing bar updates with
   a fade animation.
3. Use the **play / pause** button to toggle playback.
4. **Click** the seekbar or **drag** the white handle to scrub through the track.
5. On narrow screens, tap the **hamburger button** (top-left) to open or close the
   library drawer.

---

## 🔧 Customization

- **Add or edit songs/playlists:** update the `musicPlaylists` array near the top
  of `script.js`. Each playlist has a `title`, an `image` URL, and a `songs` list
  of `{ name, artist }` objects.
- **Change track length:** adjust `SONG_DURATION_SECONDS` in `script.js` (default
  is `20`) to change how long the simulated progress takes.
- **Theme color:** the Spotify green (`#1db954`) is used for the progress bar and
  hover states in `style.css` — swap it to re-theme the player.

---

## 🗺 Roadmap

- [ ] Real audio playback with the HTML5 `<audio>` element
- [ ] Wire up the Previous / Next track buttons
- [ ] Functional search (filter songs/playlists by name)
- [ ] Shuffle & repeat modes
- [ ] Volume control
- [ ] Persist the last-played song / liked songs

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](./LICENSE)
file for details.

---

