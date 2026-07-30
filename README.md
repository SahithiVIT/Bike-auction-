# MotoBid — Production Bike Auction Platform

> A production-grade real-time motorcycle auction platform built with **React 19**, **Express**, **TypeScript**, **Tailwind CSS v4**, **Server-Sent Events (SSE)**, and **Google Gemini AI**. Designed for high concurrency, real-time state synchronization, anti-sniping soft close timer extensions, and operational observability.

---

## 🌐 Live Deployed Application

- **Live Production App URL:** [https://ais-pre-jfnhc4n7iyjwvasdv2c77m-452563035756.asia-southeast1.run.app](https://ais-pre-jfnhc4n7iyjwvasdv2c77m-452563035756.asia-southeast1.run.app)
- **Assignment Submission Document:** Refer to [`SUBMISSION_DOCUMENT.md`](./SUBMISSION_DOCUMENT.md) in this repository for full engineering specs.

---

## ✨ Key Features & Capabilities

### 1. Real-Time Bidding Engine
- **Server-Sent Events (SSE)**: Instant bi-directional broadcast of new high bids, reserve status updates, soft-close extensions, and buy-now events across all active client browsers.
- **Proxy Auto-Bidding**: Set maximum bid ceilings (`maxProxyAmount`) where the server automatically places incremental counter-bids on your behalf up to your limit.
- **Dynamic Tiered Minimum Increments**: Automatically calculated based on current price tiers ($25 for <$500, $50 for <$2,500, $100 for <$10,000, $250 for <$25,000, $500 for $25,000+).
- **Anti-Sniping Soft Close**: Automatically extends auction `endTime` by +2 minutes if a bid is placed within the final 120 seconds, ensuring fair price discovery.

### 2. Comprehensive Motorcycle Specs & AI Mechanical Valuations
- Detailed motorcycle specs including **VIN Verification**, make, model, odometer mileage, title status, service logs, and custom modifications.
- **Gemini AI Risk Assessment**: Server-side proxy integration calling Google Gemini (`@google/genai`) to generate mechanical health analysis, fair market valuation ranges, and buyer risk ratings.

### 3. Operational Observability & Admin Ops
- **Real-Time Telemetry**: Live metric trackers for Gross Merchandise Value (GMV), active SSE client connections, bid throughput, and server health.
- **Structured System Logs**: Live streaming audit logs tracking bid transactions, mutex acquisitions, soft-close triggers, and error events.
- **Admin Management**: Capability to pause/resume auctions, adjust parameters, and trigger automated simulation test bots.

### 4. Interactive Test Runner & Architecture Documentation
- **In-Browser Integration Test Runner**: Execute automated unit & integration test suites directly from the UI tab (`/tests`).
- **Architecture & System Design View**: In-depth interactive system topology charts, data schemas, and trade-off documentation (`/docs`).

---

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript, Tailwind CSS v4, Lucide React Icons
- **Backend**: Node.js, Express.js
- **Real-time Protocol**: Server-Sent Events (SSE)
- **AI Integration**: `@google/genai` (Google Gemini API)
- **Build Tooling**: Vite, esbuild

---

## 🚀 Local Development & Execution Setup

### Prerequisites
- **Node.js** v18+ or v20+
- **npm** or **yarn**

### Quickstart Commands

```bash
# 1. Install dependencies
npm install

# 2. Run local development server (Express + Vite on Port 3000)
npm run dev

# 3. Build for production Cloud Run deployment
npm run build

# 4. Start production Node server
npm start
