import { Server } from "socket.io";
import express from "express";
import http from "http";

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: ["http://localhost:5173"],
        methods:["GET","POST"]
    }
});

export const getReceiverSocketId = (receiverId) => {
    return userSocketId[receiverId];
}

const userSocketId = {}; // {userId : socketId}
    
io.on('connection', (socket) => {
    console.log("User is connected", socket.id);

    const userId = socket.handshake.query.userId;
    if (userId !== "undefined") userSocketId[userId] = socket.id;

    // io.emit() is the broadcasting of all events to the connected clients
    io.emit("getOnlineUsers", Object.keys(userSocketId));

    // socket.on is an event listener (for both client and server side)
    socket.on("disconnect", () => {
        console.log("User is disconnected", socket.id);
        delete userSocketId[userId];
        io.emit("getOnlineUsers", Object.keys(userSocketId));
    });
});

export { app, io, server };