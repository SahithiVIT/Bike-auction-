# 🏍️ MotoBid – Real-Time Motorcycle Auction Platform

## 📌 Overview
MotoBid is a full-stack web application for conducting real-time motorcycle auctions. Users can browse motorcycles, participate in live bidding, and track auction activity through a responsive interface.

## 🚀 Live Demo
Application:
https://ais-dev-jfnhc4n7iyjwvasdv2c77m-452563035756.asia-southeast1.run.app

## ✨ Features
- Browse premium motorcycle listings
- Real-time motorcycle auctions
- Live bidding system
- Proxy auto-bidding
- Verified VIN inspection specifications
- Anti-sniping soft-close timer
- Search by Make, Model, Year, VIN, or Location
- Live auction statistics
- Responsive design
- Fast and interactive UI

## 🛠️ Tech Stack

### Frontend
- React
- TypeScript
- Vite
- Tailwind CSS

### Backend
- Node.js
- Express.js

### Database
- PostgreSQL

### Deployment
- Google Cloud Run

### Version Control
- Git & GitHub

## 🏗️ Architecture

- React frontend communicates with Express backend using REST APIs.
- Express handles business logic and API requests.
- PostgreSQL stores auction and motorcycle data.
- Deployed on Google Cloud Run.

## ⚙️ Setup Instructions

```bash
git clone <repository-url>
cd MotoBid
npm install
npm run dev
```

## 🚀 Deployment

The application is deployed on Google Cloud Run.

## 🔒 Security Considerations

- Server-side request validation
- Environment variables for configuration
- Database access through backend APIs
- Client-server separation

## 📈 Scalability

- Modular React components
- RESTful API architecture
- PostgreSQL for persistent storage
- Easily deployable to cloud infrastructure

## 📝 Assumptions & Trade-offs

- Built as a prototype focusing on core auction functionality.
- Authentication and payment integration can be added in future.
- Logging and monitoring can be integrated using cloud monitoring tools.

## 🔮 Future Improvements

- User Authentication
- Payment Integration
- Email Notifications
- Logging & Monitoring
- Automated Testing
- CI/CD Pipeline
- Admin Dashboard
- API Documentation

