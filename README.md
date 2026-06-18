# 🤖 AI & Robotics Summer Workshop — MERN Landing Page

A full-stack MERN application for an **AI & Robotics Summer Workshop** landing page with registration functionality.

![Workshop Banner](https://img.shields.io/badge/Workshop-AI%20%26%20Robotics-6c3ffa?style=for-the-badge&logo=robot)
![Stack](https://img.shields.io/badge/Stack-MERN-00d4ff?style=for-the-badge)
![Status](https://img.shields.io/badge/Status-Live-4ade80?style=for-the-badge)

---

## ✨ Features

- 🎨 **Modern dark UI** with glassmorphism, gradient animations, and scroll-reveal effects
- 📱 **Fully responsive** — mobile, tablet, and desktop
- 🦸 **Hero Section** — animated blobs, floating card, live enrollment badge
- 📋 **Workshop Details** — age group, duration, mode, fee, start date
- 🎯 **Learning Outcomes** — 6 animated outcome cards
- ❓ **FAQ Accordion** — 6 questions with smooth expand/collapse
- 📝 **Registration Form** — real-time validation + async API submit
- 🔌 **REST API** — Express backend with MongoDB + JSON file fallback
- ✅ **ARIA Accessible** — screen-reader friendly components

---

## 🗂️ Project Structure

```
mern-workshop/
├── client/              # React + Vite frontend
│   ├── src/
│   │   ├── components/  # Navbar, Hero, WorkshopDetails, LearningOutcomes, FAQ, RegistrationForm, Footer
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css    # Full design system
│   ├── vite.config.js   # API proxy config
│   └── package.json
│
└── server/              # Node.js + Express backend
    ├── models/
    │   └── Enquiry.js   # Mongoose schema
    ├── routes/
    │   └── enquiry.js   # POST & GET /api/enquiry
    ├── middleware/
    │   └── errorHandler.js
    ├── server.js
    └── package.json
```

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) v18 or higher
- npm v9 or higher
- MongoDB (optional — falls back to JSON file if not available)

---

### 1. Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/mern-workshop.git
cd mern-workshop
```

### 2. Setup & Run the Backend

```bash
cd server
npm install
```

Create a `.env` file inside `server/`:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/workshop_db
CLIENT_URL=http://localhost:5173
```

Start the server:
```bash
node server.js
```

> **No MongoDB?** No problem — the server automatically falls back to a local `enquiries.json` file.

### 3. Setup & Run the Frontend

Open a **new terminal**:

```bash
cd client
npm install
npm run dev
```

### 4. Open the App

Visit **[http://localhost:5173](http://localhost:5173)** in your browser 🎉

---

## 🔌 API Reference

Base URL: `http://localhost:5000`

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/health` | Server health check |
| `POST` | `/api/enquiry` | Register a new student |
| `GET` | `/api/enquiry` | Get all registrations |

### POST `/api/enquiry`

**Request Body:**
```json
{
  "name": "Priya Sharma",
  "email": "priya@example.com",
  "phoneNumber": "9876543210"
}
```

**Success Response (201):**
```json
{
  "success": true,
  "message": "Registration successful! We will contact you shortly.",
  "data": {
    "id": "enq_1234567890",
    "name": "Priya Sharma",
    "email": "priya@example.com",
    "createdAt": "2026-06-18T07:00:00.000Z"
  }
}
```

---

## 🗄️ MongoDB Atlas Setup (Optional)

1. Create a free cluster at [mongodb.com/atlas](https://www.mongodb.com/atlas)
2. Get your connection string
3. Update `server/.env`:
```env
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/workshop_db
```

---

## 🎨 Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, Vite 5 |
| Styling | Vanilla CSS (custom design system) |
| Backend | Node.js, Express.js |
| Database | MongoDB + Mongoose (JSON fallback) |
| Fonts | Inter + Space Grotesk (Google Fonts) |

---

## 📸 Workshop Details

| Property | Value |
|----------|-------|
| Age Group | 8–14 Years |
| Duration | 4 Weeks |
| Mode | Online |
| Fee | ₹2,999 |
| Start Date | 15 July 2026 |

---

## 📄 License

MIT License — feel free to use and modify for your own projects.
