# Google Play Arena – Game On Night 🎮✨
### Full-Stack AI-Powered Game Ideathon Platform

A production-ready full-stack event website built with **React**, **Tailwind CSS**, **Framer Motion**, and **MongoDB**. Designed with a refined white-and-pastel design system for maximum readability, fluid animations, and real-time backend management for Google Student Ambassador events.

---

## 🎨 Design System

* **Main Background:** `#FFFFFF`
* **Alternate Section Background:** `#F7F4FA`
* **Primary Accent (Buttons & Focus):** `#8B78B8` (Muted Lavender Purple)
* **Secondary Accent:** `#A8BFA5` (Sage Green)
* **Highlight Accent:** `#F5D6C6` (Soft Peach)
* **Main Text:** `#34343B` (High Contrast Slate)
* **Secondary Text:** `#777780`
* **Borders:** `#EAE7ED`

---

## 🧭 Core Sections & Functionality

1. **Section 1 – Hero (`#FFFFFF`)**:
   - Event branding, tagline (*"Imagine It. Design It. Pitch It."*), and subhead.
   - 4 Highlight Cards: **Free Entry**, **Chance to Win a Google Pixel Phone for the National Winner**, **Winner Certificate**, and **Participation Certificate**.
   - Primary CTAs: *Explore The Challenge* and *Join The Arena*.

2. **Section 2 – About the Event (`#F7F4FA`)**:
   - Concise summary explaining that zero coding is required.
   - 4-Step Process: 1. Imagine → 2. Poster with Nano Banana → 3. Document in Google Docs → 4. Pitch in 60s.

3. **Section 3 – The Creation Challenge (`#FFFFFF`)**:
   - 7 Required Elements in crisp cards with soft pastel indicators.
   - Compact Creative Guidelines box with Sage Green checkmarks.
   - **View Creation Guidelines** button: smoothly expands inline with sample Gemini prompt & Google Docs template.

4. **Section 4 – Submission (`#F7F4FA`)**:
   - 3 simple steps (Generate Poster → Prepare Google Doc → Submit in Post-Survey).
   - Document sharing permission reminder card.

5. **Section 5 – Surveys & Event Access (`#FFFFFF`)**:
   - **Pre-Survey Form (Active Now)**: Open for all participants before the live session to record attendance and eligibility.
   - **Post-Survey Form (Gated)**: Safely locked until the live Google Meet session finishes. Unlocked by organizer with 1-click in the Admin Panel.
   - **Google Meet Session**: One-click join room link when announced.
   - **Certificate of Participation Generator**:
     - Requires feedback completion.
     - Stamped with dynamic **Current Day's Date**.
     - Real-time live canvas preview with personalized participant name.
     - Instant high-res **PDF** and **PNG** downloads with celebration confetti.

6. **Section 6 – Minimal Footer (`#F7F4FA`)**:
   - Event title, host credit, dates, and discreet Organizer Admin Login trigger.

---

## 🗄️ Full-Stack Backend & MongoDB

- **Database**: MongoDB Atlas (`event_config` collection) manages live dates, official survey URLs, Meet link, and survey lock/unlock status.
- **Graceful Fallback**: Automatically serves local configuration with zero downtime if the database is offline or unconfigured.
- **Organizer Admin Panel**:
  - Accessible via the **GSA** badge in the navbar, footer link, or `?admin=true` (shortcut: `Ctrl+Shift+A`).
  - Allows the organizer to update event info and toggle the Post-Survey & Certificate status as soon as the Google Meet session ends.

---

## 🚀 Running Locally

```bash
# 1. Install dependencies
npm install

# 2. Configure environment
cp .env.example .env
# Add your MONGODB_URI in .env

# 3. Start MongoDB Backend API (Port 5001)
npm run server

# 4. Start Frontend (Port 3000)
npm run dev
# or for production preview
npm run build && npm run preview
```

* **Frontend:** [http://localhost:3000](http://localhost:3000)
* **Backend API:** [http://localhost:5001/api/event-config](http://localhost:5001/api/event-config)
* **Admin Login:** Click the GSA badge in navbar or press `Ctrl + Shift + A` (Default: `admin` / `gsa_admin_2026`).
