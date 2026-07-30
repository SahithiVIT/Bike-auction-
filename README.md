<div align="center">

# 🏍️ MotoBid — Real-Time Motorcycle Auction Platform

[![React 19](https://img.shields.io/badge/React-19.0.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Express](https://img.shields.io/badge/Express-4.21-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS-v4.0-38BDF8?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Google Gemini API](https://img.shields.io/badge/Google_Gemini-AI_Valuations-8E75B2?style=for-the-badge&logo=google&logoColor=white)](https://ai.google.dev/)
[![Deployment Status](https://img.shields.io/badge/Deployment-Active_Cloud_Run-22c55e?style=for-the-badge&logo=googlecloud&logoColor=white)](https://ais-pre-jfnhc4n7iyjwvasdv2c77m-452563035756.asia-southeast1.run.app)

<p align="center">
  <b>A production-grade, full-stack live motorcycle auction platform built for high concurrency, real-time synchronization, anti-sniping dynamic soft-close extensions, and operational telemetry.</b>
</p>

[🌐 Live App Demo](https://ais-pre-jfnhc4n7iyjwvasdv2c77m-452563035756.asia-southeast1.run.app) •
[📂 GitHub Repository](https://github.com/SahithiVIT/Bike-auction-) •
[📄 Submission Specification Document](./SUBMISSION_DOCUMENT.md)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Key Features & System Architecture](#-key-features--system-architecture)
- [System Architecture & Data Flow](#-system-architecture--data-flow)
- [API Endpoints Specification](#-api-endpoints-specification)
- [Tech Stack](#-tech-stack)
- [Local Development & Setup](#-local-development--setup)
- [Project Directory Structure](#-project-directory-structure)
- [Submission Deliverables Checklist](#-submission-deliverables-checklist)

---

## 🌟 Overview

**MotoBid** is engineered as a software engineering internship assignment solution demonstrating production-ready application design, real-time bid state synchronization, anti-sniping protection, automated mechanical risk assessment using Google Gemini AI, and live telemetry observability.

### 🔗 Production Links

| Resource | URL | Description |
| :--- | :--- | :--- |
| 🚀 **Live Production App** | [`ais-pre-jfnhc4n7iyjwvasdv2c77m-452563035756.asia-southeast1.run.app`](https://ais-pre-jfnhc4n7iyjwvasdv2c77m-452563035756.asia-southeast1.run.app) | Production environment deployed on Cloud Run |
| 🐙 **GitHub Repository** | [`github.com/SahithiVIT/Bike-auction-`](https://github.com/SahithiVIT/Bike-auction-) | Primary source code repository |
| 📄 **Submission Package** | [`SUBMISSION_DOCUMENT.md`](./SUBMISSION_DOCUMENT.md) | Technical specs, trade-off matrix, and architecture documentation |

---

## ✨ Key Features & System Architecture

### 1. ⚡ Real-Time Bidding & Concurrency Controls
- **Server-Sent Events (SSE)**: Pushes instantaneous live bid updates, reserve status changes, and time extension notifications across all connected client browser sessions without polling overhead.
- **Proxy Auto-Bidding Engine**: Allows users to set maximum proxy bid limits. The engine automatically bids incrementally on their behalf to maintain leading status up to their ceiling.
- **Dynamic Tiered Minimum Increments**:
  - `$1` – `$499`: `$25` minimum increment
  - `$500` – `$2,499`: `$50` minimum increment
  - `$2,500` – `$9,999`: `$100` minimum increment
  - `$10,000` – `$24,999`: `$250` minimum increment
  - `$25,000+`: `$500` minimum increment
- **Anti-Sniping Soft-Close Extension**: If a bid is submitted within 2 minutes ($120,000\text{ ms}$) of an auction closing, the duration is dynamically extended by $+2\text{ minutes}$ to give bidders fair counter-opportunities and prevent last-second bot sniping.

### 2. 🤖 AI-Powered Mechanical Condition & Valuation Proxy
- Integrated with Google Gemini (`@google/genai`) on the Express backend server.
- Analyzes VIN number, mileage, service records, title status, and custom modifications to produce instant mechanical health evaluations, risk ratings, and fair market price ranges.

### 3. 📊 Admin Ops Dashboard & Telemetry Stream
- **System Metrics**: Real-time tracking of Gross Merchandise Value (GMV), bid placement frequency, connected SSE streams, and system latency.
- **Audit Logs**: Filterable live server transaction stream logging mutex acquisitions, outbid notifications, and status transitions.
- **Simulation Control**: Admin controls to simulate high-frequency bot bidding traffic and test system resilience under load.

### 4. 🧪 Automated Integration Test Suite & Architecture Docs
- **Interactive Test Runner**: Execute automated unit and integration tests directly inside the UI application under the `/tests` tab.
- **System Design View**: Interactive architecture specs, ER diagram specifications, and trade-off justification tables under the `/docs` tab.

---

## 📐 System Architecture & Data Flow
