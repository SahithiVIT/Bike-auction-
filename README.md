<div align="center">

# 🏍️ MotoBid — Real-Time Motorcycle Auction Platform

<p align="center">
<b>A production-grade full-stack motorcycle auction platform featuring real-time bidding, proxy auto-bidding, AI-powered motorcycle valuation, anti-sniping auction extensions, and live operational dashboards.</b>
</p>

<p align="center">

![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-4.x-000000?style=for-the-badge&logo=express&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-v4-38BDF8?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Google Gemini](https://img.shields.io/badge/Google_Gemini-AI-8E75B2?style=for-the-badge&logo=google)
![Cloud Run](https://img.shields.io/badge/Google_Cloud_Run-Deployed-34A853?style=for-the-badge&logo=googlecloud)

</p>

<p align="center">

### 🚀 <a href="https://ais-pre-jfnhc4n7iyjwvasdv2c77m-452563035756.asia-southeast1.run.app" target="_blank">Live Demo</a>

### 📂 <a href="https://github.com/SahithiVIT/Bike-auction-" target="_blank">GitHub Repository</a>

</p>

</div>

---

# 📖 Overview

MotoBid is a production-ready motorcycle auction platform built using React, TypeScript, Express.js and Google Gemini AI. It supports real-time auctions, AI-powered vehicle evaluation, proxy bidding, anti-sniping auction extensions and an admin operations dashboard.

---

# ✨ Features

## ⚡ Real-Time Auctions

- Live Server-Sent Events (SSE)
- Instant bid synchronization
- Live countdown timers
- Reserve price updates

## 🔄 Proxy Auto-Bidding

- Automatic bidding up to a user-defined maximum
- Competitive bid management
- Atomic bid processing

## ⏱ Anti-Sniping Protection

- Automatically extends auctions by 2 minutes whenever a bid is placed during the final 2 minutes.

## 🤖 AI Vehicle Evaluation

Google Gemini analyzes:

- VIN
- Mileage
- Service History
- Title Status
- Modifications

Returns:

- Mechanical health
- Risk score
- Fair market value
- Maintenance recommendations

## 📊 Admin Dashboard

- GMV Monitoring
- Connected SSE Clients
- Active Auctions
- Bid Frequency
- Server Logs
- Operational Metrics

## 🧪 Testing

- Built-in integration tests
- Architecture documentation
- System design pages

---

# 🏗 Architecture

```
React Frontend
      │
      ▼
Server-Sent Events
      │
      ▼
Express Backend
      │
 ┌────┼─────────┐
 │    │         │
 ▼    ▼         ▼
AI  Bid Engine Metrics
 │
 ▼
Auction Store
```

---

# 🛠 Tech Stack

| Layer | Technology |
|--------|------------|
| Frontend | React 19 |
| Language | TypeScript |
| Backend | Express.js |
| Styling | Tailwind CSS v4 |
| Real-Time | Server-Sent Events |
| AI | Google Gemini |
| Build Tool | Vite |
| Deployment | Google Cloud Run |

---

# 📡 API Endpoints

| Method | Endpoint |
|---------|----------|
| GET | /api/auctions |
| GET | /api/auctions/:id |
| POST | /api/auctions |
| POST | /api/auctions/:id/bid |
| POST | /api/auctions/:id/buy-now |
| POST | /api/auctions/:id/toggle-pause |
| GET | /api/stream |
| POST | /api/ai/condition-report |
| GET | /api/metrics |
| GET | /api/logs |

---

# 🚀 Getting Started

## Clone Repository

```bash
git clone https://github.com/SahithiVIT/Bike-auction-.git
cd Bike-auction-
```

## Install

```bash
npm install
```

## Start Development

```bash
npm run dev
```

Visit:

**http://localhost:3000**

---

## Production Build

```bash
npm run build
npm start
```

---

# 📁 Project Structure

```
.
├── README.md
├── SUBMISSION_DOCUMENT.md
├── server.ts
├── package.json
├── vite.config.ts
├── metadata.json
└── src
    ├── App.tsx
    ├── components
    ├── data
    └── types.ts
```

---

# 🌐 Deployment

### 🚀 Live Application

<a href="https://ais-pre-jfnhc4n7iyjwvasdv2c77m-452563035756.asia-southeast1.run.app">
Open MotoBid
</a>

---

# 📂 Source Code

<a href="https://github.com/SahithiVIT/Bike-auction-">
View GitHub Repository
</a
