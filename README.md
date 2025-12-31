# Wallet & Referral Backend Project
# 💳 Wallet & Referral Management System (Node.js + MongoDB)

This backend system implements a wallet and referral functionality similar to real e-commerce platforms such as **Zomato, Swiggy, Flipkart, Meesho, PhonePe**.  
It allows users to earn wallet balance through referrals, spend wallet balance during checkout (with admin-controlled limits), and automatically blocks coupon usage when wallet is applied.

---

## 🚀 Features

| Feature | Description |
|---------|-------------|
| **User Signup & Login** | Secure authentication using JWT & bcrypt |
| **Referral Rewards System** | Both referrer & referred user earn ₹500 |
| **Wallet Spend Limit** | Admin controls max usable wallet percentage |
| **Wallet Deduction Logic** | Only allowed % gets deducted during checkout |
| **Coupon Blocking Rule** | When wallet is used → coupon cannot be applied |
| **Transaction History** | Stores all wallet credits & debits |
| **Admin Authentication** | Admin has separate login & protected routes |
| **Dynamic Rule Update** | Wallet usage % changes without code change |

---

## 🏗 Tech Stack

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT Authentication
- Express-Validator
- Postman (for API testing)

---

## 📂 Folder Structure

wallet-referral-backend/
├─ Backend/
│  ├─ config/
│  │   └─ db.js
│  │
│  ├─ controllers/
│  │   ├─ adminAuthController.js
│  │   ├─ authController.js
│  │   ├─ paymentController.js
│  │   └─ walletController.js
│  │
│  ├─ middlewares/
│  │   ├─ adminMiddleware.js
│  │   └─ authMiddleware.js
│  │
│  ├─ models/
│  │   ├─ User.js
│  │   ├─ Wallet.js
│  │   ├─ WalletTransaction.js
│  │   └─ WalletConfig.js
│  │
│  ├─ routes/
│  │   ├─ adminAuthRoutes.js
│  │   ├─ authRoutes.js
│  │   ├─ paymentRoutes.js
│  │   └─ walletRoutes.js
│  │
│  ├─ services/
│  │   ├─ referralService.js
│  │   └─ walletService.js
│  │
│  ├─ utils/
│  │   └─ referralCodeGenerator.js
│  │
│  ├─ validations/
│  │   ├─ adminValidation.js
│  │   └─ authValidation.js
│  │
│  ├─ app.js
│  └─ server.js
│
├─ .gitignore
├─ package.json
├─ package-lock.json
├─ README.md
└─ (❗ DO NOT PUSH `.env`)

---

## 🛠 Installation & Setup

### 1️⃣ Clone the Repository
git clone https://github.com/porchezhian-2005/wallet_Management.git
cd wallet-referral-backend

## install dependencies
npm install


## .env file
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_secret_secret_key
PORT=5000

## to run the server
npm run dev

## server starts at 
http://localhost:5000

## Authentication the headers to protect the API
Authorization: Bearer <your_token_here>

