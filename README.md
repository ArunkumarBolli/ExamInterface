# Exam Interface 🎓

An online exam-taking platform built with **MERN stack** (MongoDB, Express.js, React.js, Node.js).  
The project simulates a student exam portal with timer-based questions, answer tracking, and result calculation.

---

## 🚀 Features
- User authentication (login/signup)  
- Exam dashboard with available tests  
- Timer functionality (auto-submit)  
- MCQs with answer tracking  
- Submit and view results instantly  
- Responsive for desktop & mobile  

---

## 🛠️ Tech Stack
- **Frontend:** React.js, HTML, CSS, Bootstrap/Tailwind CSS  
- **Backend:** Node.js, Express.js  
- **Database:** MongoDB  

---

## 📂 Project Structure
ExamInterface/
├── backend/ # Express APIs, MongoDB models
├── frontend/ # React exam interface
├── package.json # Dependencies
└── README.md # Project documentation

## ⚙️ Setup Instructions

Follow these steps to run the **Exam Interface** project locally:

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/ArunkumarBolli/ExamInterface.git
cd ExamInterface
2️⃣ Backend Setup (Server + APIs)
Navigate to the backend folder:

bash
Copy code
cd backend
Install dependencies:

bash
Copy code
npm install
Create a .env file in the backend/ folder and add:

env
Copy code
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
Start the backend server:

bash
Copy code
npm start
✅ The backend will run at: http://localhost:5000

3️⃣ Frontend Setup (React App)
Open a new terminal and navigate to the frontend folder:

bash
Copy code
cd ../frontend
Install dependencies:

bash
Copy code
npm install
Start the frontend:

bash
Copy code
npm start
✅ The frontend will run at: http://localhost:3000

4️⃣ Usage
Open your browser → http://localhost:3000

Login / Signup (if implemented)

Select an exam from the dashboard

Answer multiple-choice questions

Timer will run in the background ⏱️

Submit answers → View results instantly

5️⃣ Test Functionality
To check if the app works correctly:

Attempt a test with multiple questions

Let the timer run down (auto-submit should trigger)

Submit manually before time ends (results should display)

Try refreshing during exam → Answers should persist (if implemented)

Check results calculation (correct vs wrong answers)
