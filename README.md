# 🔐 Passop - Secure Password Manager

Passop is a **full-stack password manager** built with the **MERN stack** that lets users securely store, manage, and access their passwords.  
It includes **AES encryption**, **JWT authentication**, and **Stripe subscriptions** for premium features.

---

## ✨ Features
- 🔑 Secure user authentication (JWT + Google OAuth)
- 🗄️ Password storage with AES-256 encryption
- 💳 Subscription plans (Basic, Pro, Premium) via Stripe
- 👤 User dashboard for managing passwords & subscriptions
- 🎨 Modern UI with React + TailwindCSS

---

## 📂 Project Structure
passop/
│── lib/ # Backend (ExpressJS + MongoDB)
│── src/ # Frontend (ReactJS + Vite + TailwindCSS)
│── public/ # Static assets
│── package.json # Dependencies (frontend)
│── vite.config.js # Vite config
│── .gitignore # Ignored files

Setup backend

cd lib
npm install


Create a .env file inside /lib:

MONGO_URI=your_mongo_url
JWT_SECRET=your_secret
STRIPE_SECRET_KEY=your_key
GOOGLE_CLIENT_ID=xxx
GOOGLE_CLIENT_SECRET=xxx


Run backend:

npm start

Setup frontend
cd ..
npm install
npm run dev

📖 API Endpoints (Backend)
Method	Endpoint	        Description
POST	/api/auth/login	    Login user
GET	    /api/auth/check 	Check auth status
GET	    /api/passwords	    Get all passwords
POST	/api/passwords	    Add new password
GET	    /api/stripe/plans	Fetch subscription plans

🔮Future Roadmap

 Dark mode UI

 Password strength checker

 Export/Import passwords

 Mobile responsive design

🤝 Contributing

Pull requests are welcome! Open an issue to discuss changes before submitting.