<div align="center">

# 🌾 KisanApp
### Smart Agriculture Platform — Empowering Farmers Digitally

> **KisanApp** connects farmers with land owners, machinery providers, warehouses, transportation services, and agricultural advisory systems — all in one integrated ecosystem.

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#️-tech-stack)
- [Project Structure](#-project-structure)
- [Installation](#️-installation)
- [Environment Variables](#-environment-variables)
- [API Routes](#-api-routes)
- [Modules](#-main-modules)
- [Future Enhancements](#-future-enhancements)
- [License](#-license)

---

## 🌟 Overview

KisanApp is a full-stack agriculture platform designed to digitally empower farmers and agricultural service providers. It bridges the gap between traditional farming and modern technology by offering tools for crop management, land rental, machinery booking, soil analysis, financial support, and much more — all accessible through a single platform.

---

## 🚀 Features

### 👨‍🌾 Farmer Services

| Feature | Description |
|---|---|
| 🌱 Seed Marketplace | Browse and purchase quality seeds |
| 🧪 Soil Detection & Analysis | Test soil and get recommendations |
| 💧 Water Management | Smart irrigation guidance |
| 🛡 Crop Insurance | Insurance support and filing |
| 📊 Personal Advisory | Expert agricultural consultation |
| 💰 Pay After Harvest | Financial support for farmers |
| 🚜 Machinery Rental | Rent farm equipment easily |
| 🏪 Warehouse Booking | Secure crop storage solutions |
| 🚚 Transportation | Logistics and transport support |
| 🌾 Direct Crop Selling | Farmer-to-buyer marketplace |

### 🏡 Provider Services

| Feature | Description |
|---|---|
| 🏡 Land Rental Listing | List land available for rent |
| 🚜 Machinery Listing | Register machinery for rental |
| 🏪 Warehouse Management | Manage storage facilities |
| 🚚 Transportation Services | Offer transport to farmers |

### 👤 User Management

- 🔐 JWT-based Authentication
- 🔑 Login & Signup System
- 👥 Role-Based Access Control (Farmer / Provider / Buyer)
- 📄 Dynamic Profile Dashboard

---

## 🛠️ Tech Stack

### Frontend
- **React.js** — Component-based UI
- **React Router DOM** — Client-side routing
- **CSS** — Styling
- **React Toastify** — Notifications

### Backend
- **Node.js** — Runtime environment
- **Express.js** — REST API framework
- **MongoDB + Mongoose** — Database & ODM
- **JWT** — Secure authentication
- **Nodemailer** — Email notifications

---

## 📂 Project Structure

```
KisanApp/
│
├── client/                     # React Frontend
│   ├── public/
│   └── src/
│       ├── components/
│       ├── pages/
│       └── App.jsx
│
├── server/                     # Node.js Backend
│   ├── Controllers/            # Business logic
│   ├── Middleware/             # Auth & validation middleware
│   ├── Models/                 # Mongoose schemas
│   ├── Router/                 # API route definitions
│   ├── uploads/                # Uploaded files
│   └── index.js                # Server entry point
│
└── README.md
```

---

## ⚙️ Installation

### 1️⃣ Clone the Repository

```bash
git clone <repository-url>
cd KisanApp
```

### 2️⃣ Backend Setup

```bash
cd server
npm install
```

Create a `.env` file in the `server/` directory (see [Environment Variables](#-environment-variables)), then start the server:

```bash
npm start
```

> Server runs on: **http://localhost:5000**

### 3️⃣ Frontend Setup

```bash
cd client
npm install
npm run dev
```

> Frontend runs on: **http://localhost:5173**

---

## 🔑 Environment Variables

Create a `.env` file in the `server/` directory with the following keys:

```env
PORT=5000
MONGO_CONN=your_mongodb_connection_string
JWT_SECRET=your_secret_key
NEWSDATA_API_KEY=your_news_api_key
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
ADMIN_EMAIL=admin_email@gmail.com
```

> ⚠️ Never commit your `.env` file to version control. Add it to `.gitignore`.

---

## 🔐 Authentication

KisanApp uses a secure **JWT-based authentication** system:

- Protected routes on both frontend and backend
- Role-based access with three distinct roles:
  - 🌾 **Farmer** — Access to all farming tools and services
  - 🏡 **Provider** — List and manage land, machinery, and warehouses
  - 🛒 **Buyer** — Browse and purchase crops directly

---

## 📌 API Routes

### Authentication
```
POST   /auth/signup          Register a new user
POST   /auth/login           Login and receive JWT token
```

### Crops
```
GET    /api/crops            Fetch all listed crops
POST   /api/crops            Add a new crop listing
```

### Land Rental
```
GET    /api/lands            Fetch available land listings
POST   /api/lands            Add a new land listing
```

### Machinery
```
GET    /api/machinery        Fetch available machinery
POST   /api/machinery        Add machinery listing
```

### Other Services
```
POST   /api/insurance        Submit crop insurance request
POST   /api/advisory         Request agricultural advisory
```

---

## 🧩 Main Modules

| Module | Description |
|---|---|
| **KhetRent** | Land rental system connecting farmers and land owners |
| **Warehouse** | Crop storage booking and management |
| **Direct Sell** | Farmer-to-buyer marketplace for fresh produce |
| **Soil Detection** | Soil testing with tailored crop recommendations |
| **Water Management** | Smart irrigation and water usage guidance |
| **Machinery** | Equipment rental marketplace |
| **Seeds** | Quality seed discovery and purchase |
| **Pay After Harvest** | Financial support and deferred payment system |
| **Personal Advisory** | One-on-one expert consultation |
| **Transportation** | Logistics and delivery support |
| **Insurance** | Crop insurance guidance and filing |

---

## 🔮 Future Enhancements

- 📱 **Mobile Responsive UI** — Optimized for smartphones
- 🌐 **Multi-language Support** — Regional language accessibility
- 🤖 **AI-based Crop Recommendation** — Smart planting decisions
- 📍 **Live GPS Tracking** — Real-time transport tracking
- 💳 **Online Payment Gateway** — Secure in-app transactions
- 📊 **Advanced Analytics Dashboard** — Farm productivity insights

---

## 📄 License

This project is developed for **educational and learning purposes** only.

---

<div align="center">

**🌾 KisanApp — Digitally Empowering Every Farmer 🌾**

*Made with ❤️ for the farming community*

</div>
