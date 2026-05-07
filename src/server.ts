import dotenv from "dotenv";
dotenv.config();

import http from "http";
import { Server } from "socket.io";
import app from "./app";
import { connectDB } from "./config/db";

const server = http.createServer(app);

const io = new Server(server, {
	cors: {
		origin: "*",
	},
});

export { io };

io.on("connection", (socket) => {
	console.log("User connected:", socket.id);

	// Join event room
	socket.on("join_event", (eventId: string) => {
		socket.join(eventId);
	});

	socket.on("disconnect", () => {
		console.log("User disconnected:", socket.id);
	});
});

server.listen(5500, () => {
	console.log("Server running");
});
connectDB();

app.listen(5000, () => console.log("Server running on port 5000"));
