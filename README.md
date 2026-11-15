# Google Play Arena – Game On Night 🎮✨
### Official Full-Stack Event & Guidance Platform for the AI-Powered Game Ideathon

[![React](https://img.shields.io/badge/React-18.3-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6.0-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-14.1-black?style=for-the-badge&logo=framer&logoColor=white)](https://www.framer.com/motion/)
[![MongoDB Atlas](https://img.shields.io/badge/MongoDB_Atlas-Live_Cloud_DB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/atlas)
[![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Vercel](https://img.shields.io/badge/Vercel-Production_Ready-black?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/)
[![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)](LICENSE)

An official **Google Student Ambassador (GSA)** initiative platform designed to guide students through inventing an original video game concept using **Google Gemini** and **Nano Banana**, documenting their design in **Google Docs**, and pitching their vision in 60 seconds during a live **Google Meet** session.

> [!IMPORTANT]
> **This is an Ideathon, NOT a Hackathon.**  
> Participants are **not** required to code, program, or develop a playable game engine. The challenge focuses purely on creative imagination, prompt craftsmanship, story design, game mechanics, visual poster creation, and presentation clarity.

---

## 📌 Table of Contents

- [Overview & Vision](#-overview--vision)
- [Design System & Palette](#-design-system--palette)
- [Key Features](#-key-features)
  - [1. Dynamic Survey Gating](#1-dynamic-survey-gating--attendance-flow)
  - [2. Interactive Certificate Generator](#2-interactive-certificate-generator)
  - [3. Full-Stack Backend & MongoDB Atlas](#3-full-stack-backend--mongodb-atlas)
  - [4. Private Organizer Admin Control Panel](#4-private-organizer-admin-control-panel)
- [Website Section Walkthrough](#-website-section-walkthrough)
- [Architecture & Tech Stack](#-architecture--tech-stack)
- [Project Directory Structure](#-project-directory-structure)
- [API Reference](#-api-reference)
- [Environment Variables](#-environment-variables)
- [Getting Started Locally](#-getting-started-locally)
- [Deployment Guide](#-deployment-guide)
  - [Deploying to Vercel](#deploying-to-vercel)
  - [Deploying with Node / Express](#deploying-with-node--express)
- [Official Event Rules & Guidelines](#-official-event-rules--guidelines)
- [Credits & Acknowledgments](#-credits--acknowledgments)

---

## 🌟 Overview & Vision

**Google Play Arena – Game On Night** is a centralized, high-conversion event landing page that participants reach by scanning QR codes on campus promotional posters. 

The website functions as a **complete information and guidance platform**:
- Explains the ideathon concept, submission criteria, and step-by-step workflow.
- Directs participants to mandatory external Google Forms (**Pre-Survey** and **Post-Survey**).
- Houses an interactive, in-browser **Certificate of Participation Engine** that dynamically renders certificates stamped with the participant's name and current day's date.
- Provides real-time event status updates managed via an authenticated **Organizer Admin Dashboard** connected to **MongoDB Atlas**.

---

## 🎨 Design System & Palette

The user interface adheres to a sophisticated light-theme design system combining clean white space with soft pastel accents for maximum readability and a premium technology-event aesthetic.

| Color Role | Hex Code | Visual Swatch | Purpose / Usage |
| :--- | :--- | :---: | :--- |
| **Main Background** | `#FFFFFF` | `[  White  ]` | Dominant canvas background for high contrast & clarity |
| **Alternate Background** | `#F7F4FA` | `[ Soft Lilac ]` | Subtle section separation across About, Submission, & Footer |
| **Primary Accent** | `#8B78B8` | `[ Lavender ]` | Primary action buttons, active badges, and focus rings |
| **Secondary Accent** | `#A8BFA5` | `[ Sage Green ]` | Success indicators, verification seals, and secondary actions |
| **Highlight Accent** | `#F5D6C6` | `[ Soft Peach ]` | Prize calls (Pixel Phone), special notices, and alert borders |
| **Main Typography** | `#34343B` | `[ Dark Slate ]` | High-contrast body text and prominent section headings |
| **Secondary Typography** | `#777780` | `[ Muted Gray ]` | Metadata, guidelines, captions, and helper descriptions |
| **Borders & Dividers** | `#EAE7ED` | `[ Crisp Light ]` | Card strokes, input outlines, and layout dividers |

### Typography Stack
- **Headings & Display**: `Space Grotesk` (weights: 600, 700, 900)
- **Body & Interface**: `Plus Jakarta Sans` (weights: 400, 500, 600, 700)
- **Code & Metadata**: `JetBrains Mono` (weights: 400, 500)

---

## ✨ Key Features

### 1. Dynamic Survey Gating & Attendance Flow
To guarantee legitimate participant verification and structured event execution:
- **Pre-Survey Form (`ACTIVE`)**: Accessible immediately so visitors can confirm their eligibility and register attendance before the session.
- **Post-Survey Form (`GATED`)**: Safely locked by default in both MongoDB and the frontend UI. Clicking the locked button displays a friendly reminder that post-event feedback unlocks after the Google Meet session.
- **One-Click Real-Time Unlock**: The event organizer can unlock the post-survey with a single switch in the admin dashboard once the session concludes.

### 2. Interactive Certificate Generator
Built into Section 5 using high-resolution HTML5 Canvas, SVG vectors, and **jsPDF**:
- **Automatic Current Date Stamping**: Automatically calculates and prints the current day's date (e.g., `November 15, 2026`) dynamically at generation time.
- **Personalized Live Preview**: Participants type their name and optional college/department, viewing a real-time responsive preview.
- **Multi-Format Export**:
  - **Download Official PDF**: Vector-crisp, print-ready A4 landscape PDF.
  - **Download High-Res PNG**: 1920×1080 raster image.
- **Celebration Effects**: Fires celebratory confetti (`canvas-confetti`) when downloaded.
- **Template Swapping**: Compatible with custom certificate background image (`public/certificate-template.png`).

### 3. Full-Stack Backend & MongoDB Atlas
- **Centralized Event Configuration**: Official dates, times, Google Meet links, survey URLs, and lock/unlock statuses are stored in MongoDB Atlas (`google_play_arena.event_config`).
- **Resilient Fallback Architecture**: If the database is temporarily unreachable or unconfigured, the application gracefully serves default settings from `eventConfig.js` with **zero UI downtime or broken links**.
- **Cross-Platform Deployable**: Works out-of-the-box as an Express REST server (Local/VPS) and as Vercel Serverless Functions (`/api/*`).

### 4. Private Organizer Admin Control Panel
Organizers have a secure, private dashboard built right into the platform:
- **Access Triggers**:
  - Clicking the **GSA** badge in the sticky navigation bar
  - Clicking **Organizer Login** in the footer
  - Visiting the page with query parameter: `?admin=true`
  - Keyboard shortcut: <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>A</kbd> (or <kbd>Cmd</kbd> + <kbd>Shift</kbd> + <kbd>A</kbd>)
- **Authentication**: JWT-based session security with token expiry verification.
- **Live Fields Managed**:
  - Event Schedule (Date, Time, Venue Mode, Duration)
  - Official URLs (Google Meet room, Pre-Survey, Post-Survey, Guidelines doc)
  - Post-Survey & Certificate Lock/Unlock state
  - Event Announcements & Prize statements

---

## 🧭 Website Section Walkthrough

```
┌─────────────────────────────────────────────────────────────┐
│  Sticky Navbar: Brand Logo, Section Links, GSA Admin Trigger │
├─────────────────────────────────────────────────────────────┤
│  SECTION 1: HERO (#FFFFFF)                                  │
│  - Event title, category, and tagline                       │
│  - 4 Pastel Highlight Cards (Free, Pixel Chance, Certs)     │
│  - Primary Action Buttons (Explore Challenge, Join Arena)   │
├─────────────────────────────────────────────────────────────┤
│  SECTION 2: ABOUT THE EVENT (#F7F4FA)                       │
│  - Zero-coding ideathon philosophy                          │
│  - 4-Step Process: Imagine -> Poster -> Document -> Pitch   │
├─────────────────────────────────────────────────────────────┤
│  SECTION 3: THE CREATION CHALLENGE (#FFFFFF)                │
│  - 7 Required Elements grid                                 │
│  - Expandable Creation Guide (Gemini prompt & Doc template) │
├─────────────────────────────────────────────────────────────┤
│  SECTION 4: SUBMISSION WORKFLOW (#F7F4FA)                   │
│  - 3 Submission Milestones (Generate -> Prepare -> Submit)  │
│  - Public Google Docs sharing reminder alert                │
├─────────────────────────────────────────────────────────────┤
│  SECTION 5: SURVEYS, MEET & CERTIFICATES (#FFFFFF)          │
│  - 3 High-contrast Action Buttons (Pre, Post, Meet)         │
│  - Interactive Certificate of Participation Generator       │
├─────────────────────────────────────────────────────────────┤
│  SECTION 6: MINIMAL FOOTER (#F7F4FA)                        │
│  - Organizer credit, campus lead attribution, Admin trigger │
└─────────────────────────────────────────────────────────────┘
```

---

## 🛠️ Architecture & Tech Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend Framework** | [React 18](https://react.dev/) + [Vite 6](https://vitejs.dev/) |
| **Styling & Design System** | [Tailwind CSS 3.4](https://tailwindcss.com/) + [PostCSS](https://postcss.org/) |
| **Animation Engine** | [Framer Motion 14](https://www.framer.com/motion/) |
| **Iconography** | [Lucide React](https://lucide.dev/) |
| **Certificate Engine** | HTML5 Canvas API + [jsPDF 2.5](https://github.com/parallax/jsPDF) + [canvas-confetti](https://www.npmjs.com/package/canvas-confetti) |
| **Backend & APIs** | [Express 5](https://expressjs.com/) (Node.js) + Vercel Serverless Functions |
| **Database** | [MongoDB Atlas](https://www.mongodb.com/atlas) (Official MongoDB Node Driver) |
| **Authentication** | [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken) (JWT) |

---

## 📂 Project Directory Structure

```plaintext
gsa/
├── api/                           # Vercel Serverless Function Handlers
│   ├── admin-auth.js              # Admin login & JWT verification
│   └── event-config.js            # Live config retrieval & update endpoint
├── public/                        # Static Public Assets
│   └── certificate-template.png   # High-resolution certificate template
├── server/                        # Express Backend Server (Local / VPS)
│   ├── auth.js                    # JWT token sign, verify & auth middleware
│   ├── db.js                      # MongoDB connection pool & auto-seeder
│   └── index.js                   # Express server entry point (Port 5001)
├── src/                           # Frontend React Application
│   ├── components/                # Modular UI Components
│   │   ├── AboutSection.jsx       # Section 2: 4-step event process
│   │   ├── AdminModal.jsx         # Private Organizer Admin Control Panel
│   │   ├── CertificateGenerator.jsx# Certificate engine with Canvas & jsPDF
│   │   ├── ChallengeSection.jsx   # Section 3: 7 elements & expandable guide
│   │   ├── Footer.jsx             # Section 6: Minimal footer & admin link
│   │   ├── Hero.jsx               # Section 1: Hero area & 4 highlight cards
│   │   ├── Navbar.jsx             # Sticky navigation header
│   │   ├── SubmissionSection.jsx  # Section 4: Submission flow & reminders
│   │   └── SurveysAndAccessSection.jsx # Section 5: Survey buttons & access
│   ├── config/
│   │   └── eventConfig.js         # Single source of truth for event data
│   ├── context/
│   │   └── EventContext.jsx       # React context for state & DB sync
│   ├── utils/
│   │   └── helpers.js             # Clipboard, scrolling & utility helpers
│   ├── App.jsx                    # Root layout component
│   ├── index.css                  # Tailwind directives & CSS variables
│   └── main.jsx                   # React DOM application mount
├── .env.example                   # Environment variable template
├── index.html                     # HTML5 root template with OpenGraph meta
├── package.json                   # Project dependencies and script runner
├── tailwind.config.js             # Custom Tailwind color palette & typography
├── vercel.json                    # Vercel routing & serverless rewrites
└── vite.config.js                 # Vite bundler & API proxy configuration
```

---

## 🔌 API Reference

### Public Endpoints

#### `GET /api/health`
Checks server and database connection status.
```json
{
  "status": "ok",
  "database": "connected",
  "timestamp": "2026-11-15T07:29:19.234Z"
}
```

#### `GET /api/event-config`
Retrieves the current event configuration. Returns MongoDB data when connected, or local fallback defaults if database is unconfigured.
```json
{
  "_id": "current",
  "EVENT_NAME": "GOOGLE PLAY ARENA",
  "EVENT_TITLE": "GAME ON NIGHT",
  "EVENT_CATEGORY": "AI-POWERED GAME IDEATHON",
  "TAGLINE": "IMAGINE IT. DESIGN IT. PITCH IT.",
  "PRE_SURVEY_URL": "https://producttrialsurvey.geministudentambassador.com/",
  "POST_SURVEY_URL": "https://producttrialfeedback.geministudentambassador.com/",
  "POST_SURVEY_UNLOCKED": false,
  "GOOGLE_MEET_URL": "",
  "_source": "mongodb"
}
```

### Protected Admin Endpoints

#### `POST /api/admin/login`
Authenticates the event organizer and returns a signed JWT.
- **Request Body**:
  ```json
  { "username": "admin", "password": "your_secure_password" }
  ```
- **Response**:
  ```json
  { "success": true, "token": "eyJhbGciOiJIUzI1NiIs...", "user": { "username": "admin", "role": "admin" } }
  ```

#### `GET /api/admin/verify`
Validates an existing Bearer token from the `Authorization` header.

#### `PUT /api/event-config`
Updates live event configuration fields in MongoDB Atlas.
- **Headers**: `Authorization: Bearer <token>`
- **Request Body**: JSON object containing updated fields (e.g. `POST_SURVEY_UNLOCKED: true`).

---

## ⚙️ Environment Variables

Create a `.env` file in the project root based on `.env.example`:

```env
# MongoDB Connection String (Atlas Cluster URI)
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.gw7hvzj.mongodb.net/google_play_arena?retryWrites=true&w=majority
MONGODB_DB_NAME=google_play_arena

# Organizer Administrator Credentials
ADMIN_USERNAME=admin
ADMIN_PASSWORD=your_secure_admin_password

# JWT Token Secret
JWT_SECRET=your_jwt_secret_key_here

# Backend Server Port
PORT=5001
```

> [!WARNING]
> Never commit `.env` into git. It is included in `.gitignore` to protect your MongoDB Atlas credentials and secrets.

---

## 💻 Getting Started Locally

### Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher
- **MongoDB Atlas** account (or local MongoDB daemon)

### 1. Clone the Repository
```bash
git clone https://github.com/riyaladwa/GameonNight.git
cd GameonNight
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment
```bash
cp .env.example .env
# Edit .env and supply your MONGODB_URI and admin password
```

### 4. Run Full-Stack Development
```bash
# Runs backend server (port 5001) and frontend dev (port 3000) concurrently
npm run dev:full
```

Or run services individually:
```bash
# Terminal 1: Backend Express Server
npm run server

# Terminal 2: Frontend Vite Development Server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🚀 Deployment Guide

### Deploying to Vercel (Recommended)

1. Push your repository to GitHub (`https://github.com/riyaladwa/GameonNight`).
2. Log in to [Vercel](https://vercel.com/) and click **Add New Project**.
3. Select and import **`GameonNight`**.
4. In the **Environment Variables** section, configure:
   - `MONGODB_URI`
   - `MONGODB_DB_NAME`
   - `ADMIN_USERNAME`
   - `ADMIN_PASSWORD`
   - `JWT_SECRET`
5. Click **Deploy**. Vercel will automatically configure serverless functions via [vercel.json](file:///Users/riyapladwa/gsa/vercel.json) and deploy the SPA bundle.

### Deploying with Node / Express (VPS, Docker, Cloud Run)

```bash
# Build the production frontend assets
npm run build

# Start the Node.js production server
npm start
```

---

## 📜 Official Event Rules & Guidelines

```
1. IMAGINE IT    -> Brainstorm an original, non-violent game concept using Google Gemini.
2. DESIGN IT     -> Generate an eye-catching, high-resolution game poster with Nano Banana.
3. DOCUMENT IT   -> Record all 7 required design elements in an organized Google Doc.
4. PITCH IT      -> Present the game concept in a crisp 60-second pitch on Google Meet.
```

### The 7 Required Concept Elements
1. **Game Title**: Memorable, punchy, and original title.
2. **Tagline**: One-sentence hook summarizing the game's core appeal.
3. **Story Premise**: The world, background lore, and protagonist's purpose.
4. **Specific Mission & Objective**: The concrete goal the player must accomplish.
5. **Non-Violent Core Mechanics**: Creative problem-solving, puzzles, exploration, strategy, or physics.
6. **Gemini Prompt Crafting**: The exact AI prompts used to develop the concept and lore.
7. **Nano Banana Poster**: Visually compelling game poster artwork.

---

## 👥 Credits & Acknowledgments

- **Initiative**: [Google Student Ambassador Program](https://www.google.com/)
- **Campus Lead & Lead Organizer**: **Riya P Ladwa** (Google Student Ambassador)
- **AI Technologies**: [Google Gemini](https://gemini.google.com/) & [Nano Banana](https://gemini.google.com/)
- **Event Branding**: Google Play Arena – Game On Night (AI-Powered Game Ideathon)

---

<p align="center">
  <b>Google Play Arena – Game On Night</b><br>
  <i>Imagine It. Design It. Pitch It.</i>
</p>
