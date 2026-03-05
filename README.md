# Noman Trajectory — Personal Portfolio

A modern, dark-themed developer portfolio built with **React**, **Tailwind CSS**, and **Framer Motion**. Features a two-part architecture:

- **Portfolio Side** (`/`) — A polished, animated portfolio page for public viewing (deployed to GitHub Pages)
- **Admin Side** (`/admin`) — A local-only dashboard to manage your portfolio data through forms

All portfolio data is stored in a single `portfolioData.json` file. The admin panel writes to it via a local Express server, and the portfolio reads from it at runtime.

---

## Tech Stack

| Layer     | Technology                        |
| --------- | --------------------------------- |
| Frontend  | React 18, React Router, Vite      |
| Styling   | Tailwind CSS 3                    |
| Animation | Framer Motion                     |
| Icons     | React Icons (Feather)             |
| Backend   | Express.js (local admin API only) |
| Deploy    | GitHub Pages via `gh-pages`       |

---

## Project Structure

```
noman-trajectory/
├── public/
│   └── data/
│       └── portfolioData.json      # All portfolio data (the single source of truth)
├── server/
│   └── index.js                    # Express server for admin save API
├── src/
│   ├── components/
│   │   ├── admin/                  # Admin form components
│   │   │   ├── PersonalInfoForm.jsx
│   │   │   ├── SkillsForm.jsx
│   │   │   ├── ProjectsForm.jsx
│   │   │   ├── ExperienceForm.jsx
│   │   │   ├── EducationForm.jsx
│   │   │   └── ContactForm.jsx
│   │   └── portfolio/              # Portfolio display components
│   │       ├── Navbar.jsx
│   │       ├── Hero.jsx
│   │       ├── About.jsx
│   │       ├── Skills.jsx
│   │       ├── Projects.jsx
│   │       ├── Experience.jsx
│   │       ├── Education.jsx
│   │       ├── Contact.jsx
│   │       └── Footer.jsx
│   ├── hooks/
│   │   └── usePortfolioData.js     # Custom hook to fetch JSON data
│   ├── pages/
│   │   ├── PortfolioPage.jsx       # Main portfolio layout
│   │   └── AdminPage.jsx           # Admin dashboard layout
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
└── postcss.config.js
```

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later)
- npm (comes with Node.js)

### Installation

```bash
git clone https://github.com/<your-username>/noman-trajectory.git
cd noman-trajectory
npm install
```

### Running Locally (Admin + Portfolio)

You need **two processes** — the Vite dev server and the Express API server:

```bash
# Option 1: Run both at once
npm run dev:all

# Option 2: Run separately in two terminals
npm run dev       # Vite dev server → http://localhost:5173
npm run server    # Express API → http://localhost:3001
```

Then open:

- **Portfolio**: [http://localhost:5173](http://localhost:5173)
- **Admin Panel**: [http://localhost:5173/admin](http://localhost:5173/admin)

### How It Works

1. Open the **Admin Panel** at `/admin`
2. Fill in your personal info, skills, projects, experience, education, and contact details
3. Click **Save All** — this writes to `public/data/portfolioData.json` via the Express server
4. Visit `/` to see your updated portfolio live
5. When ready, build and deploy!

---

## Deployment to GitHub Pages

### One-time setup

1. Make sure your GitHub repo is named `noman-trajectory`
2. Update the `base` in `vite.config.js` if your repo name is different:
   ```js
   base: mode === 'production' ? '/your-repo-name/' : '/',
   ```

### Deploy

```bash
npm run build
npm run deploy
```

This builds the project and pushes the `dist/` folder to the `gh-pages` branch. GitHub Pages will serve it at:

```
https://<your-username>.github.io/noman-trajectory/
```

> **Note:** The admin panel (`/admin`) is included in the build but won't be able to save data in production (no backend). It's designed for local use only.

---

## Customizing Your Portfolio

### Via Admin Panel (Recommended)

Run `npm run dev:all`, go to `/admin`, fill in the forms, and hit Save.

### Via JSON File Directly

Edit `public/data/portfolioData.json` directly. The structure:

```json
{
  "personalInfo": {
    "name": "Your Name",
    "title": "Your Title",
    "subtitle": "Your tagline",
    "bio": "About you...",
    "avatar": "https://url-to-photo.jpg",
    "resumeUrl": "https://url-to-resume.pdf"
  },
  "skills": [{ "category": "Frontend", "items": ["React", "TypeScript"] }],
  "projects": [
    {
      "id": 1,
      "title": "Project Name",
      "description": "What it does",
      "image": "https://screenshot-url.jpg",
      "technologies": ["React", "Node.js"],
      "liveUrl": "https://live-demo.com",
      "githubUrl": "https://github.com/repo"
    }
  ],
  "experience": [
    {
      "id": 1,
      "company": "Company",
      "role": "Your Role",
      "duration": "2022 - Present",
      "description": "What you did",
      "technologies": ["React", "AWS"]
    }
  ],
  "education": [
    {
      "id": 1,
      "institution": "University",
      "degree": "BS Computer Science",
      "year": "2016 - 2020",
      "description": "Details"
    }
  ],
  "contact": {
    "email": "you@example.com",
    "phone": "",
    "location": "City, Country",
    "social": {
      "github": "https://github.com/you",
      "linkedin": "https://linkedin.com/in/you",
      "twitter": "https://twitter.com/you",
      "website": ""
    }
  }
}
```

---

## Available Scripts

| Command           | Description                                  |
| ----------------- | -------------------------------------------- |
| `npm run dev`     | Start Vite dev server (portfolio + admin UI) |
| `npm run server`  | Start Express API server (for admin save)    |
| `npm run dev:all` | Run both dev + server concurrently           |
| `npm run build`   | Production build to `dist/`                  |
| `npm run preview` | Preview production build locally             |
| `npm run deploy`  | Deploy `dist/` to GitHub Pages               |

---

## Testing on Local PC / Laptop

Run this single command from the project folder:

```bash
npm run dev:all
```

Then open these two links in your browser:

| Page                            | URL                         |
| ------------------------------- | --------------------------- |
| 🌐 Portfolio (public view)      | http://localhost:5173       |
| 🛠 Admin Panel (edit your data) | http://localhost:5173/admin |

> Go to **Admin Panel** first → fill in your info → click **Save All** → then visit the Portfolio to see it live.

---

## Updating Your Portfolio & Publishing to GitHub Pages

Every time you want to update your live portfolio, run all these steps **on your local PC**:

```bash
# Step 1 — start local servers
npm run dev:all

# Step 2 — open admin panel, make your changes, click "Save All"
# (this updates public/data/portfolioData.json on your PC)

# Step 3 — stop the dev server (Ctrl + C), then build the new version
npm run build

# Step 4 — push the build to GitHub Pages
npm run deploy
```

After `npm run deploy` finishes, your live site at  
`https://azizulhaquenoman.github.io/noman-trajectory/`  
will be updated within a minute or two.

> **Yes** — steps 3 and 4 (`build` + `deploy`) must always be run from your local PC.  
> GitHub Pages only hosts the built files; it cannot build or save data on its own.

**Shortcut** — if you only changed text/data (no code), you can skip step 1 and just edit  
`public/data/portfolioData.json` directly in VS Code, then run:

```bash
npm run build
npm run deploy
```

---

## License

MIT
