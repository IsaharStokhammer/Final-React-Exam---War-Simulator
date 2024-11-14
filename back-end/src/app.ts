import http from 'http';
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/DBConfig';
import AttackModel from './models/AttackModel';
import { Server as SocketIO } from 'socket.io';
import router from './routes/routes';
import { createAttackSocket } from './socket/socketFunctions';
import { getRocketTimeToHit } from './controllers/enemyController';
import { ICreateAttackDTO } from './socket/socketDTOs';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

const server = http.createServer(app);
const io = new SocketIO(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});


// Middleware
app.use(express.json());
connectDB();
app.use(cors());
app.use("/api", router);


io.on('connection', (socket) => {
  console.log('New client connected');
  
// Join a room
socket.on("join", (target_room) => {
  socket.join(target_room);
  console.log(`Socket ${socket.id} joined room ${target_room}`);
});

// Leave a room
socket.on("leave", (room) => {
  socket.leave(room);
  console.log(`Socket ${socket.id} left room ${room}`);
});

// createAttack
socket.on("createAttack", async (data: ICreateAttackDTO) => {
  const attackId = await createAttackSocket(data.userName, data.rocket, data.target_room);
  //עדכון בחדר על איום חדש
  io.to(data.target_room).emit("attackCreated", attackId);
  const timeToHit = await getRocketTimeToHit(data.rocket);
  let timeLeft = timeToHit;
  const intervalId = setInterval(() => {
    io.to(data.target_room).emit("time-left", timeLeft);
    timeLeft -= 1;
    if (timeLeft <= 0) {
      clearInterval(intervalId);
    }
  }, 1000);
  io.to(data.target_room).emit("newCountdown", intervalId);
  console.log(data);
});

// cancelAttack
socket.on("cancelAttack", (intervalId, attackId, target_room) => {
  //לבדוק אם המיירט בטווח ירוט של הרקטה
  clearInterval(intervalId);
  const attack = AttackModel.findById(attackId);
  //עדכון הרקטה כמיורטת
  AttackModel.findByIdAndUpdate(attackId, { status: "Intercepted" });
  io.to(target_room).emit("attackCanceled", attackId);
});

// Broadcast to a room
socket.on("message-to-room", (room, message) => {
  io.to(room).emit("room-message", message); // Emit message to specific room
});

// Broadcast to all except sender
socket.on("broadcast", (message) => {
  socket.broadcast.emit("broadcast-message", message); // Emit message to all except sender
  console.log(`Broadcast message sent:`, message);
});

// Acknowledgement example
socket.on("request", (data, callback) => {
  console.log("Request received", data);
  callback({ status: "OK" }); // Acknowledge the request
});

// Volatile event example (heartbeat)
setInterval(() => {
  socket.volatile.emit("heartbeat", { time: new Date().toISOString() }); // Emit heartbeat every second
}, 1000);

socket.on("disconnect", (reason) => {
  console.log("A user disconnected", socket.id, "reason:", reason);
});

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});


server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
