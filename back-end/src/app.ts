import http from 'http';
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/DBConfig';
import AttackModel from './models/AttackModel';
import { Server as SocketIO } from 'socket.io';
import router from './routes/routes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// יצירת שרת HTTP
const server = http.createServer(app);
const io = new SocketIO(server);

// Middleware
app.use(express.json());
connectDB();
app.use(cors());
app.use("/api", router);

// Routes

// Error handling middleware

// התחברות עם Socket.io
io.on('connection', (socket) => {
  console.log('New client connected');
  
  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

// האזנה לשרת
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// import express from "express";
// import dotenv from "dotenv";
// import cors from "cors"
// import connectDB from "./config/DBConfig";
// import router from "./routes/routes";
// import { create4Users } from "./insert4exsampleUsers";
// import { attack } from "./controllers/enemyController";
// import AttackModel from "./models/AttackModel";
// dotenv.config();

// const app = express();
// const PORT = process.env.PORT || 3000;

// // Middleware
// app.use(express.json());
// connectDB()
// app.use(cors());
// app.use("/api",router)

// // Routes

// // Error handling middleware

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

