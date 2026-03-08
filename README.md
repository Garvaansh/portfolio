# notansh. — Personal Portfolio

My personal portfolio built with React, where I experiment with animations, WebGL visuals, and interactive UI ideas.

**Live:** [https://notansh.is-a.dev](https://notansh.is-a.dev)

---

# Tech Stack

| Category      | Technology                          | Purpose                                              |
| ------------- | ----------------------------------- | ---------------------------------------------------- |
| Framework     | React 19 + TypeScript               | Component architecture and type safety               |
| Build Tool    | Vite 7                              | Dev server and production bundling                   |
| Styling       | Tailwind CSS v4                     | Utility-first styling with CSS variables for theming |
| Animation     | GSAP + ScrollTrigger + GSAP-plugins | Scroll timelines and text animations                 |
| Smooth Scroll | Lenis                               | Interpolated scroll synced with GSAP                 |
| State         | Zustand v5                          | Lightweight global UI + theme state                  |
| WebGL         | Three.js                            | Starfield shader background                          |
| WebGL         | OGL                                 | Lightweight interactive orb shader                   |
| Media         | Cloudinary                          | CDN with automatic format and quality transforms     |

---

# Architecture Overview

<details>
<summary><strong>Application Structure</strong></summary>

```
App.tsx

├── ReactLenis (global scroll container)
├── Lenis ↔ GSAP ticker synchronization
├── Global scroll progress indicator

├── themeStore (Zustand)
│   Handles "dark" ↔ "silk" theme state
│   Used by Hero, Logo, and Portal transitions
│
├── uiStore (Zustand)
│   Stores breakpoint info (isMobile)
│   Used by animation logic

└── Sections

    Hero
    └─ Entrance animation + proximity interaction

    About
    └─ Pinned ScrollTrigger timeline with frame reveals

    Portal
    └─ Theme transition animation
       Animates CSS variables and curtain elements
       Switches theme at animation midpoint

    Projects
    └─ Scroll-revealed project cards

    Skills
    └─ SkillBadge grid

    Contact
    └─ Contact form
```

</details>

---

# Animation System

- All animations are built using **GSAP timelines inside `useGSAP()` hooks**.
- Timelines are scoped to section refs for automatic cleanup.
- **Lenis scroll positions are synced with the GSAP ticker**, allowing `ScrollTrigger` to operate on smoothed scroll values.

Theme transitions are handled differently:

- The **Portal section directly animates CSS variables**
- This keeps theme changes **outside React’s render cycle**
- React only updates the global theme state once the transition reaches its midpoint.

---

# Content Structure

All site content lives in:

```
src/content/
```

Content is stored as **typed TypeScript objects**, not a CMS.

This keeps the project:

- simple
- version-controlled
- portable

---

# Local Development

### Requirements

- Node **≥ 18**
- Yarn **4 (Berry)**

---

### 1. Clone the repository

```bash
git clone https://github.com/Garvaansh/portfolio.git
cd portfolio
```

---

### 2. Install dependencies

```bash
yarn install
```

---

### 3. Configure environment variables

```bash
cp .env.example .env
```

Set your Cloudinary cloud name:

```
VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name
```

If not set, images fall back to placeholder images so the app still runs.

---

### 4. Start the development server

```bash
yarn dev
```

Open:

```
http://localhost:5173
```

---

### Production Build

```bash
yarn build
```

Preview the build locally:

```bash
yarn preview
```

> **Note**: I’m still actively working on this project. If you notice a bug or have an idea for improving something, feel free to open an issue or a PR.
