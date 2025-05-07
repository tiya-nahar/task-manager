require('dotenv').config();
// 1. Required modules import kar rahe hain
const express = require('express');
const cors = require('cors');


// 2. Express app create
const app = express();

// 3. Middleware lagana (React ko allow karna + JSON read karna)
app.use(cors()); // React frontend ke requests allow karta hai
app.use(express.json()); // JSON body ko request me parse karta hai

// 4. Routes ko import karna
const authRoutes = require('./routes/auth');
const taskRoutes = require('./routes/task');

// 5. Route middleware banana (yeh APIs ko /api/... pe available karega)
app.use('/api/auth', authRoutes); // /api/auth/register, /login
app.use('/api/tasks', taskRoutes); // /api/tasks/create, /update

// Define a route for the root ('/')
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// 6. Port set karna and server start karna
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
