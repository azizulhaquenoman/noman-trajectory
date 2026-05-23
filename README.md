# Noman.Portfolio

Personal portfolio website for **Azizul Haque Noman** — BSc CSE student at United International University, building toward AI/ML Engineering.

**Live:** Deploy to Vercel / Netlify with one click (see below).

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ ([download](https://nodejs.org))
- npm (comes with Node.js)

### 1. Install dependencies
```bash
npm install
```

### 2. Set up the contact form (EmailJS)
Copy the example env file and fill in your credentials:
```bash
cp .env.example .env
```

Go to [emailjs.com](https://www.emailjs.com/) (free plan: 200 emails/month):
1. **Add Email Service** → Connect Gmail → copy the **Service ID**
2. **Create Email Template** → use these variables:
   ```
   From: {{from_name}} <{{from_email}}>
   Subject: {{subject}}
   Message: {{message}}
   ```
   Copy the **Template ID**
3. **Account → API Keys** → copy your **Public Key**

Paste into `.env`:
```env
VITE_EMAILJS_SERVICE_ID=service_xxxxxxx
VITE_EMAILJS_TEMPLATE_ID=template_xxxxxxx
VITE_EMAILJS_PUBLIC_KEY=xxxxxxxxxxxxxxxxxxxx
```

> **No EmailJS?** Skip this step — the contact form will fall back to opening your default email client via `mailto:`.

### 3. Add your assets

Place these files in `public/assets/`:

| File | Description |
|------|-------------|
| `images/profile.jpg` | Your profile photo (used in About section & favicon) |
| `resume.pdf` | Your resume (opens in new tab when clicked) |

**Project thumbnails** (optional — fallback illustrations show automatically):
```
public/assets/images/projects/
  directedge.jpg
  kairos.jpg
  cookcorner.jpg
  healthcare.jpg
  codecampus.jpg
  autotrack.jpg
```

**Gallery images** (optional — add URLs inside each project's `gallery` array in the JSON):
```
public/assets/images/projects/
  directedge-1.jpg   directedge-2.jpg   directedge-3.jpg
  kairos-1.jpg       kairos-2.jpg       kairos-3.jpg
  ... (same pattern for all projects)
```

### 4. Run locally
```bash
npm run dev
```
Opens at **http://localhost:3000**

---

## 🔧 Customization

All content is stored in JSON files inside `src/data/`. Edit these to update the site — no code changes needed.

| File | What it controls |
|------|-----------------|
| `src/data/about.json` | Name, tagline, summary, photo, stats, social links, open-to-work status |
| `src/data/skills.json` | Skill categories and individual skills |
| `src/data/projects.json` | All projects — details, tech, awards, gallery |
| `src/data/publications.json` | Research papers — abstract, links, contributions |
| `src/data/experience.json` | Experience timeline (add work entries here) |
| `src/data/education.json` | University details, coursework, highlights |
| `src/data/contact.json` | Email, phone, social links, EmailJS config |

### Adding work experience
Open `src/data/experience.json` and add to the `timeline` array:
```json
{
  "id": "job-company-2025",
  "year": "2025 – Present",
  "title": "Your Job Title",
  "organization": "Company Name",
  "type": "work",
  "icon": "💼",
  "description": "What you did and achieved in this role."
}
```

### Updating open-to-work status
In `src/data/about.json`, change:
```json
"openToWork": false
```
The green "Open to Opportunities" badge will disappear from the navbar.

### Adding paper links
In `src/data/publications.json`, update the `links.paper` field with the exact IEEE Xplore DOI URL once your paper is live.

---

## 📦 Build for Production

```bash
npm run build
```
Output goes to the `dist/` folder.

Preview the production build locally:
```bash
npm run preview
```

---

## ☁️ Deployment

### Vercel (Recommended — free)
```bash
npm install -g vercel
vercel
```
Follow the prompts. Set your environment variables in the Vercel dashboard under **Settings → Environment Variables**.

### Netlify
1. Push to GitHub
2. Go to [netlify.com](https://netlify.com) → New site from Git
3. Build command: `npm run build`
4. Publish directory: `dist`
5. Add environment variables under **Site settings → Environment variables**

### GitHub Pages
```bash
npm run build
# Then push the dist/ folder to your gh-pages branch
```

---

## 🏗️ Project Structure

```
noman-portfolio/
├── public/
│   └── assets/
│       ├── images/
│       │   ├── profile.jpg          ← ADD YOUR PHOTO
│       │   └── projects/            ← ADD PROJECT THUMBNAILS
│       └── resume.pdf               ← ADD YOUR RESUME
├── src/
│   ├── components/
│   │   ├── Navbar.jsx               Fixed nav with status badge + resume button
│   │   ├── Hero.jsx                 Full-viewport hero with typewriter
│   │   ├── NeuralNebula.jsx         Three.js 3D interactive visualization
│   │   ├── About.jsx                About section with photo + stats
│   │   ├── Skills.jsx               Filterable skill categories
│   │   ├── Projects.jsx             Project grid with filter
│   │   ├── ProjectModal.jsx         Shared modal for projects & papers
│   │   ├── Publications.jsx         Research publications section
│   │   ├── Experience.jsx           Timeline (creative, ready for job entries)
│   │   ├── Education.jsx            Education card + highlights
│   │   ├── Contact.jsx              EmailJS contact form
│   │   └── Footer.jsx               Minimal footer
│   ├── data/                        ← All content in JSON — edit here
│   ├── hooks/
│   │   └── useScrollReveal.js       Intersection Observer scroll animations
│   ├── App.jsx                      Root component
│   ├── index.css                    Global styles + CSS variables
│   └── main.jsx                     React entry point
├── .env.example                     Copy to .env and fill EmailJS credentials
├── .gitignore
├── index.html
├── package.json
└── vite.config.js
```

---

## 🎨 Design System

| Token | Value | Use |
|-------|-------|-----|
| `--bg` | `#06080f` | Page background |
| `--bg-card` | `#0c1220` | Card backgrounds |
| `--accent` | `#00c8ff` | Cyan — primary interactive color |
| `--purple` | `#8b5cf6` | Purple — secondary accent |
| `--text` | `#e2e8f0` | Primary text |
| `--text-muted` | `#94a3b8` | Secondary text |
| `--font-heading` | Space Grotesk | Headings |
| `--font-body` | Inter | Body text |
| `--font-mono` | JetBrains Mono | Labels, code, tags |

---

## 📄 License

MIT — feel free to fork and adapt.
