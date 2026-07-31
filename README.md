<div align="center">

# 🏍️ MotoBid — Real-Time Motorcycle Auction Platform

[![React 19](https://img.shields.io/badge/React-19.0.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Express](https://img.shields.io/badge/Express-4.21-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS-v4.0-38BDF8?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Google Gemini API](https://img.shields.io/badge/Google_Gemini-AI_Valuations-8E75B2?style=for-the-badge&logo=google&logoColor=white)](https://ai.google.dev/)
[![Deployment Status](https://img.shields.io/badge/Deployment-Active_Cloud_Run-22c55e?style=for-the-badge&logo=googlecloud&logoColor=white)](https://ais-pre-jfnhc4n7iyjwvasdv2c77m-452563035756.asia-southeast1.run.app)

<p align="center">
  <b>A production-grade, full-stack live motorcycle auction platform built for high concurrency, real-time synchronization, anti-sniping dynamic soft-close extensions, AI mechanical health evaluations, and operational telemetry observability.</b>
</p>

[🌐 Live Deployed Application](https://ais-pre-jfnhc4n7iyjwvasdv2c77m-452563035756.asia-southeast1.run.app) •
[🐙 GitHub Repository](https://github.com/SahithiVIT/Bike-auction-) •
[📄 Assignment Submission Document](./SUBMISSION_DOCUMENT.md)

</div>

---

## 📋 Table of Contents

- [Overview & Executive Summary](#-overview--executive-summary)
- [Key Features & Capabilities](#-key-features--capabilities)
- [System Architecture & Concurrency Model](#-system-architecture--concurrency-model)
- [API Endpoints Specification](#-api-endpoints-specification)
- [Tech Stack](#-tech-stack)
- [Local Development & Execution Setup](#-local-development--execution-setup)
- [Engineering Trade-Offs & Architectural Decisions](#-engineering-trade-offs--architectural-decisions)
- [Automated Integration Testing & Observability](#-automated-integration-testing--observability)
- [Project Directory Structure](#-project-directory-structure)
- [Deliverables Checklist](#-deliverables-checklist)

---

## 🌟 Overview & Executive Summary

**MotoBid** is an enterprise-grade full-stack real-time motorcycle auction platform created as a complete software engineering internship submission. The platform resolves critical challenges in high-concurrency online bidding—including double-spend race conditions, bid sniping, mechanical health uncertainty, and real-time state synchronization across distributed client browsers.

### 🔗 Quick Resources & Primary Links

| Resource | URL / Reference | Description |
| :--- | :--- | :--- |
| 🚀 **Live Production App** | [`ais-pre-jfnhc4n7iyjwvasdv2c77m-452563035756.asia-southeast1.run.app`](https://ais-pre-jfnhc4n7iyjwvasdv2c77m-452563035756.asia-southeast1.run.app) | Production environment deployed on Google Cloud Run |
| 🐙 **GitHub Repository** | [`github.com/SahithiVIT/Bike-auction-`](https://github.com/SahithiVIT/Bike-auction-) | Primary GitHub source code repository |
| 📄 **Submission Document** | [`SUBMISSION_DOCUMENT.md`](./SUBMISSION_DOCUMENT.md) | Full assignment submission specs and trade-off documentation |

---

## ✨ Key Features & Capabilities

### 1. ⚡ Real-Time Bidding & Concurrency Engine
- **Server-Sent Events (SSE)**: Instantaneous bi-directional broadcast of high bids, reserve status updates, soft-close time extensions, and buy-now transactions across all connected browsers.
- **Proxy Auto-Bidding**: Bidders can configure a maximum ceiling (`maxProxyAmount`). The backend engine automatically places incremental counter-bids on their behalf to maintain leading status up to their limit.
- **Dynamic Tiered Minimum Increments**:
  - `$1` – `$499`: `$25` minimum increment
  - `$500` – `$2,499`: `$50` minimum increment
  - `$2,500` – `$9,999`: `$100` minimum increment
  - `$10,000` – `$24,999`: `$250` minimum increment
  - `$25,000+`: `$500` minimum increment
- **Anti-Sniping Soft-Close Extension**: If a valid bid is placed within 2 minutes (120,000 ms) of auction expiration, the auction `endTime` is automatically extended by +2 minutes to allow fair counter-bids.

### 2. 🤖 AI-Powered Mechanical Condition & Valuation Proxy
- **Google Gemini API (`@google/genai`) Integration**: Server-side proxy analyzing VIN numbers, engine size, mileage, title status, service logs, and custom modifications.
- Generates instant **Mechanical Risk Ratings**, **Fair Market Valuation Ranges**, and **Key Inspection Recommendations** without exposing API keys to the client.

### 3. 📊 Admin Telemetry & Operational Dashboard
- **Live System Metrics**: Metrics tracking Gross Merchandise Value (GMV), active SSE client connections, bid placement throughput, and server health.
- **Audit Logs Stream**: Real-time logging of atomic mutex acquisitions, soft-close triggers, and transaction events.
- **Simulation Control**: Admin toggle to run automated test bot traffic and verify system stability under high load.

### 4. 🧪 In-Browser Test Runner & Interactive Architecture Specs
- **Automated Test Runner**: Execute integration test suites directly within the UI application under the `/tests` tab.
- **Architecture Spec View**: Interactive system topology charts, ER diagrams, and trade-off matrices accessible under the `/docs` tab.

---

## 📐 System Architecture & Concurrency Model

### A. Topology & Data Flow
