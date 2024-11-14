import { Server } from "socket.io";
import { Server as HTTPServer } from "http";
import { ICreateAttackDTO as ICreateAttackDTO } from "./socketDTOs";
import { createAttackSocket } from "./socketFunctions";
import { getRocketTimeToHit } from "../controllers/enemyController";
import AttackModel from "../models/AttackModel";

export function initializeSocketServer(httpServer: HTTPServer) {
  const io = new Server(httpServer, {
    cors: {
      origin: "*",
    },
  });

  io.on("connection", (socket) => {
    console.log("A user connected", socket.id);

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
    socket.on("createAttack", async ( userName, rocket, target_room) => {
      console.log(userName, rocket, target_room);
       //עדכון בחדר על איום חדש
      const attackId = await createAttackSocket(userName, rocket, target_room);
      if(attackId){
      io.to(target_room).emit("attackCreated", attackId);
      const timeToHit = await getRocketTimeToHit(rocket);
      let timeLeft = timeToHit;
      const intervalId = setInterval(() => {
        io.to(target_room).emit("time-left", timeLeft);
        timeLeft -= 1;
        if (timeLeft <= 0) {
          clearInterval(intervalId);
        }
      }, 1000);
      io.to(target_room).emit("newCountdown", intervalId);
      console.log("newCountdown");}
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
  });

  return io;
}
