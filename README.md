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

### 🚀 Live Demo

**https://ais-pre-jfnhc4n7iyjwvasdv2c77m-452563035756.asia-southeast1.run.app**

### 📂 Repository

**https://github.com/SahithiVIT/Bike-auction-**

</div>

---

# 📖 Overview

MotoBid is a modern real-time motorcycle auction platform designed to demonstrate production-ready software engineering principles.

The platform supports:

- ⚡ Real-time live bidding
- 🔄 Proxy auto-bidding
- 🤖 AI motorcycle condition analysis
- ⏱ Anti-sniping auction extensions
- 📊 Live admin monitoring dashboard
- 📈 Operational telemetry
- 🧪 Built-in testing dashboard

---

# ✨ Features

## ⚡ Real-Time Live Auctions

- Server-Sent Events (SSE)
- Instant bid synchronization
- Live countdown timer
- Live reserve status updates

---

## 🔄 Proxy Auto-Bidding

Users can specify a maximum bid amount.

The bidding engine automatically:

- places minimum required bids
- competes against other proxy bidders
- stops once the maximum limit is reached

---

## ⏱ Anti-Sniping Auction Protection

If a bid is placed during the last **2 minutes** of an auction,

the auction automatically extends by **2 additional minutes**, preventing last-second bid sniping.

---

## 💰 Tiered Minimum Bid Increments

| Current Price | Minimum Increment |
|---------------|------------------|
| $1 – $499 | $25 |
| $500 – $2,499 | $50 |
| $2,500 – $9,999 | $100 |
| $10,000 – $24,999 | $250 |
| $25,000+ | $500 |

---

## 🤖 AI Motorcycle Evaluation

Powered by **Google Gemini**

The AI analyzes:

- VIN
- Mileage
- Service History
- Title Status
- Modifications

and generates:

- Mechanical Condition
- Risk Assessment
- Estimated Market Value
- Maintenance Recommendations

---

## 📊 Admin Operations Dashboard

Monitor:

- Gross Merchandise Value (GMV)
- Active Auctions
- Connected SSE Clients
- Bid Frequency
- Server Latency
- Audit Logs

---

## 🧪 Built-in Test Runner

A dedicated testing page allows developers to run integration and unit tests directly from the UI.

---

## 📚 Architecture Documentation

Includes:

- System Architecture
- Component Design
- Data Flow
- Trade-off Analysis
- API Documentation

---

# 🏗 System Architecture

```
                React Frontend
                       │
         ──────────────┼──────────────
                       │
               Server-Sent Events
                       │
                Express Backend
                       │
      ┌────────────────┼────────────────┐
      │                │                │
 Proxy Bid Engine   Gemini AI      Metrics API
      │                │                │
      └────────────────┼────────────────┘
                       │
               In-Memory Auction Store
```

---

# 🛠 Tech Stack

| Layer | Technology |
|--------|------------|
| Frontend | React 19 |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Icons | Lucide React |
| Backend | Express.js |
| Runtime | Node.js |
| Real-Time | Server-Sent Events (SSE) |
| AI | Google Gemini API |
| Build Tool | Vite |
| Deployment | Google Cloud Run |

---

# 📡 API Endpoints

## Auctions

| Method | Endpoint |
|---------|----------|
| GET | /api/auctions |
| GET | /api/auctions/:id |
| POST | /api/auctions |
| POST | /api/auctions/:id/bid |
| POST | /api/auctions/:id/buy-now |
| POST | /api/auctions/:id/toggle-pause |

---

## AI

| Method | Endpoint |
|---------|----------|
| POST | /api/ai/condition-report |

---

## Streaming

| Method | Endpoint |
|---------|----------|
| GET | /api/stream |

---

## Monitoring

| Method | Endpoint |
|---------|----------|
| GET | /api/metrics |
| GET | /api/logs |

---

# 🚀 Local Setup

## Clone Repository

```bash
git clone https://github.com/SahithiVIT/Bike-auction-.git

cd Bike-auction-
```

## Install Dependencies

```bash
npm install
```

## Start Development

```bash
npm run dev
```

Application runs at

```
http://localhost:3000
```

---

## Production Build

```bash
npm run build
```

Run

```bash
npm start
```

---

# 📁 Project Structure

```
.
├── README.md
├── server.ts
├── package.json
├── vite.config.ts
├── metadata.json
├── SUBMISSION_DOCUMENT.md
└── src
    ├── App.tsx
    ├── components
    │   ├── Navbar.tsx
    │   ├── AuctionCard.tsx
    │   ├── AuctionDetailModal.tsx
    │   ├── CreateAuctionModal.tsx
    │   ├── AdminOpsDashboard.tsx
    │   ├── TestRunnerView.tsx
    │   ├── ArchitectureDocsView.tsx
    │   ├── WatchlistDrawer.tsx
    │   └── NotificationBanner.tsx
    ├── data
    │   └── mockData.ts
    └── types.ts
```

---

# 🌐 Live Deployment

**Google Cloud Run**

https://ais-pre-jfnhc4n7iyjwvasdv2c77m-452563035756.asia-southeast1.run.app

---



