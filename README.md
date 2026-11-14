# Google Play Arena – Game On Night 🎮✨
### Full-Stack AI-Powered Game Ideathon Platform

A production-ready full-stack event website built with **React**, **Tailwind CSS**, **Framer Motion**, and **MongoDB**. Designed for maximum visual impact, fluid animations, and real-time backend management for Google Student Ambassador events.

---

## ⚡ What's Included

### 1. 🎨 Premium Animation System (Framer Motion)
- **Hero Area**: Dynamic animated gradient background, subtle ambient glowing gaming portal, and floating glowing particles.
- **Scroll Reveals**: Smooth staggered entrance animations across all sections with `whileInView`.
- **Interactive Cards**: Soft glowing borders, elevation hover lift, and shadow depth transitions.
- **Expandable Creation Guidelines**: Animated panel with smooth `AnimatePresence` height transition.
- **Accessibility**: Built with `useReducedMotion()` to respect user accessibility preferences.

### 2. 🗄️ Full-Stack Backend (MongoDB)
- **Database**: Stores and serves event configuration (dates, times, venue mode, Google Meet link, Pre-Survey URL, Post-Survey URL, and certificate statements).
- **Graceful Fallback Mode**: If MongoDB is not yet configured or offline, the platform automatically serves defaults from `eventConfig.js` with **zero downtime or broken buttons**.
- **Dual Deployment Ready**:
  - **Local / VPS**: Express server in `server/index.js` running on port 5001.
  - **Vercel Serverless**: Native serverless handlers in `api/event-config.js` and `api/admin-auth.js`.

### 3. 🔐 Private Administrator Control Panel
- Accessible via:
  - Clicking the **GSA** badge in the navbar
  - Clicking **Organizer Login** in the footer
  - Visiting with URL query: `?admin=true`
  - Keyboard shortcut: <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>A</kbd> (or <kbd>Cmd</kbd> + <kbd>Shift</kbd> + <kbd>A</kbd>)
- **Authentication**: Secure JWT-based admin sign-in.
- **Live Updates**: Edit Event Title, Tagline, Date/Time, Google Meet Link, Pre/Post Survey links, and save directly to MongoDB.

---

## ⚙️ Environment Variables Setup

Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

Set your configuration in `.env`:

```env
# MongoDB Connection String (Atlas or Local)
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/?retryWrites=true&w=majority
MONGODB_DB_NAME=google_play_arena

# Admin Credentials
ADMIN_USERNAME=admin
ADMIN_PASSWORD=your_secure_password_here

# JWT Secret
JWT_SECRET=your_jwt_production_secret_key_2026

# Local Backend Port
PORT=5001
```

---

## 🚀 Running Locally

```bash
# 1. Install dependencies
npm install

# 2. Start the MongoDB Backend API server (Port 5001)
npm run server

# 3. Start the Frontend Vite dev server (Port 3000)
npm run dev

# 4. Or build and preview the production bundle
npm run build
npm run preview
```

---

## 🌐 Deploy to Vercel

The project includes [`vercel.json`](file:///Users/riyapladwa/gsa/vercel.json) pre-configured with API rewrites:

1. Push this repository to GitHub.
2. In [Vercel](https://vercel.com), import the repository.
3. In **Project Settings → Environment Variables**, add:
   - `MONGODB_URI`
   - `MONGODB_DB_NAME`
   - `ADMIN_USERNAME`
   - `ADMIN_PASSWORD`
   - `JWT_SECRET`
4. Click **Deploy**. Both the frontend and serverless API endpoints will deploy automatically!

---

## 🛡️ Participant Security & Privacy Guarantee

- **No Public Registration**: Participants do not enter personal data on this website.
- **Direct Official Links**: Survey buttons open official Google Forms directly:
  - Pre-Survey: `https://producttrialsurvey.geministudentambassador.com/`
  - Post-Survey: `https://producttrialfeedback.geministudentambassador.com/`
- **Safe State Fallbacks**: If any link is unannounced, buttons safely display *"Announced soon"* rather than broken or dummy links.
