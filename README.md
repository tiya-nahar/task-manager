Project Overview
This is a Task Management System for small teams to create, assign, track, and manage tasks efficiently. It includes user authentication, task CRUD, team collaboration, and a dashboard for tracking task status.

⚙️ Setup Instructions
1️⃣ Clone the repository

git clone https://github.com/your-username/your-repo.git
cd your-repo
2️⃣ Set up the environment file
Create a .env file based on .env.example:

cp .env.example .env
Fill in your database URL, JWT secret, and other necessary environment variables.

3️⃣ Install dependencies

npm install
4️⃣ Run the app

npm run dev

📡 API & Features
User Authentication
Register
Login
Task Management
Create, Read, Update, Delete tasks
Team Collaboration
Assign tasks to other users
Notifications on task assignment
Dashboard
View tasks assigned to you
View tasks you created
Overdue tasks view
🛠️ Approach & Architecture
Backend: REST API using Node.js + Express
Frontend:React
Database: PostgreSQL
Architecture: Modular MVC pattern, secure JWT-based authentication, and role-based data handling,Axios.

📌 Assumptions & Trade-offs
Notifications are basic (in-app only); no email/SMS for now.
Task assignment assumes all users are in the same team.
The system currently supports no roles 
🖥️ Technologies Used
Frontend: React.js, Tailwind CSS

Backend: Node.js, Express, JWT, bcrypt

Database: PostgreSQL

Other: Vercel (for deployment), Railway/Render (for DB hosting)

