# 🎓 NextGen-ERP
A smart, full-stack College ERP system to streamline academic & administrative workflows for students and faculty.

## 📌 Overview
*NextGen-ERP* is a complete web solution for managing college operations like student data, attendance, timetables, grades, and fee payments. It features secure login, online payments, and an embedded chatbot to help students instantly.

## ✨ Features
- ✅ Student login & profiles
- ✅ Attendance tracking
- ✅ Timetable by semester
- ✅ Marks & grade management
- ✅ Online fee payments (Razorpay)
- ✅ Chatbot for FAQs (Chatbase)
- ✅ JWT-secured authentication

## 🛠 Tech Stack
- *Frontend:* React.js
- *Backend:* Node.js, Express
- *Database:* MongoDB (Mongoose)
- *Payments:* Razorpay
- *Auth:* JWT
- *Chat Bot:* Chatbase

## 🚀 Getting Started
### 🔥 Installation
Clone the repository and install dependencies:
bash
git clone https://github.com/your-username/nextgen-erp.git
cd nextgen-erp
npm install


### ⚙ Running the app
bash
npm start

or if using concurrently for backend & frontend:
bash
npm run dev

Default:
- Frontend: http://localhost:3000
- Backend: http://localhost:5000

## 🔐 Environment Setup
Create a .env file at project root:
env
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
RAZORPAY_KEY=your_razorpay_key
RAZORPAY_SECRET=your_razorpay_secret


## 🚀 Future Enhancements
- 📊 Advanced student performance analytics
- 📧 Email / SMS notifications
- 📱 React Native mobile app
- 🧑‍🏫 Role-based dashboards for faculty & admin

## 🤝 Contributing
1. Fork this repo
2. Create your feature branch (git checkout -b feature/AmazingFeature)
3. Commit your changes (git commit -m 'Add AmazingFeature')
4. Push (git push origin feature/AmazingFeature)
5. Open a pull request

## 📝 License
MIT License

## 🙌 Built by
*Jatin Mehra*
*Karan Patil*
*Jai Anand*
