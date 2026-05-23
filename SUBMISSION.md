# Portfolio Submission — Azizul Haque Noman

---

## Technologies Used

### Core Stack
| Technology | Version | Purpose |
|-----------|---------|---------|
| **React 18** | ^18.3 | UI component framework |
| **Vite 5** | ^5.4 | Build tool and dev server |
| **Three.js** | ^0.169 | 3D WebGL rendering |
| **EmailJS** | ^4.4 | Contact form email delivery |
| **React Icons** | ^5.3 | SVG icon library |

### Languages & Styling
- **JavaScript (ES2023)** — all logic and component code
- **CSS3** — custom properties (variables), `@keyframes`, Grid, Flexbox, `clamp()`, `backdrop-filter`
- **HTML5** — semantic markup in `index.html`

### Fonts (Google Fonts)
- **Space Grotesk** — headings (geometric, modern)
- **Inter** — body text (highly legible)
- **JetBrains Mono** — labels, code elements, tech tags

---

## Architecture Decisions

### JSON-driven Content
All portfolio content lives in `src/data/*.json`. Changing a project description, adding an experience entry, or updating social links requires only editing a JSON file — no component code changes needed. This separates content from presentation cleanly.

### No CSS Framework
Pure CSS with custom properties was chosen over Tailwind or Bootstrap to give full control over the design system. All spacing, colors, typography, and animation tokens are defined in `src/index.css` and consistent across the entire site.

### Three.js (no React Three Fiber)
Three.js is used directly via `useRef` + `useEffect` for the 3D visualization rather than React Three Fiber. This gives lower overhead for a single WebGL canvas, easier cleanup/lifecycle management, and full control over the render loop without R3F abstractions.

---

## Special Features

### 1. Neural Constellation (3D Interactive Hero Element)
The right panel of the hero section renders a **custom Three.js neural network visualization**:
- ~250 particles (cyan + purple) distributed volumetrically inside a sphere
- ~4 bright "hub" nodes acting as domain anchors
- Faint synaptic connection lines between nearby nodes (precomputed for performance)
- **Continuous auto-rotation** around the Y axis with gentle X-axis drift
- **Mouse parallax**: the constellation tilts toward the cursor with smooth lerp damping
- **Breathing pulse**: a subtle sine-wave scale animation gives the whole structure life
- `AdditiveBlending` on all particles creates a natural glow without shader complexity
- Fully cleaned up on component unmount (no memory leaks)

**Why this element?** Noman's direction is AI/ML. A neural network visualization directly represents that goal, is visually unique (portfolios typically use geometric shapes or avatars), and is meaningful — each node represents a connected skill or idea, the way an AI model connects its weights.

### 2. Typewriter Role Rotator
The hero headline cycles through five professional identities with a character-by-character typewriter effect built from scratch (no library). Configurable via `about.json → rotatingRoles`.

### 3. Scroll Reveal Animations
A custom `useIntersectionObserver` hook watches all `.fade-up`, `.fade-left`, `.fade-right`, and `.fade-in` elements and adds a `.visible` class when they enter the viewport. CSS handles the actual transition, keeping animation logic tiny and performant.

### 4. Project & Publication Modal System
Clicking any project card or publication opens a full-detail modal with:
- Hero image (with themed SVG fallback if image not provided)
- Full description, feature list, tech stack
- Award recognition with external link to UIU's official announcement page
- Photo gallery (supports up to 4 images per project)
- Keyboard (Escape) and backdrop-click dismissal
- Body scroll lock while open

### 5. JSON-Driven Fallback Thumbnails
If a project image file hasn't been added yet, the card and modal automatically display a themed emoji + color fallback illustration — unique per project. The site looks complete immediately, without requiring all images upfront.

### 6. Dual Contact Delivery
The contact form uses **EmailJS** when configured (`.env` credentials). If EmailJS isn't set up, it gracefully falls back to opening the user's default mail client via `mailto:` — the form never just silently fails.

### 7. Open-to-Work Status Badge
A pulsing green dot badge in the navbar reads "Open to Opportunities." Controlled by a single boolean (`openToWork`) in `about.json` — flip it to `false` when employed and the badge disappears.

### 8. Responsive Design
- **Desktop** (>900px): two-column hero, side-by-side about/education layouts
- **Tablet** (≤900px): stacked single-column, 3D canvas reduced in height
- **Mobile** (<480px): 3D canvas hidden to preserve performance; all text and interaction fully functional
- Fluid typography using `clamp()` throughout headings

### 9. Animated Loading Screen
A brief spinner screen on initial load prevents a flash of unstyled content during Three.js initialization.

### 10. Performance Optimizations
- Three.js split into its own Vite chunk (`manualChunks`) so it loads in parallel
- `Math.min(devicePixelRatio, 2)` caps renderer resolution on high-DPI screens
- Particle connection lines are precomputed once at init, not recalculated per frame
- Scroll reveal uses `IntersectionObserver` (native browser API, no polling)
- `requestAnimationFrame` properly cancelled on component unmount

---

## Sections Delivered

| Section | Status | Notes |
|---------|--------|-------|
| Hero / Introduction | ✅ | Typewriter + 3D Neural Constellation |
| About Me | ✅ | Photo, summary, stats, social links |
| Skills | ✅ | Filterable categories, 25+ skills |
| Projects | ✅ | 5 projects, filter, modal, award badges |
| Publications | ✅ | IEEE paper with Paper/Code/Dataset links |
| Experience | ✅ | Creative timeline, ready for job entries |
| Education | ✅ | UIU card + undergraduate highlights |
| Contact | ✅ | EmailJS form, contact info panel |
| Footer | ✅ | Minimal — name, copyright, social icons |
| Resume Download | ✅ | Navbar + Hero buttons (opens in new tab) |
| Responsive Design | ✅ | Desktop, tablet, mobile |
| Smooth Scrolling | ✅ | CSS `scroll-behavior: smooth` + JS |
| Hover Effects | ✅ | Cards, buttons, nav links, skill pills |
| Scroll Animations | ✅ | Fade-up/left/right on all major elements |
| 3D Interactive Element | ✅ | Three.js Neural Constellation |

---

*Submitted by Azizul Haque Noman — azizulhaquenoman@gmail.com*
