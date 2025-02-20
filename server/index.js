import { createServer } from "http";
import { Server } from "socket.io";
import { v4 as uuidv4 } from "uuid"
const httpServer = createServer();
const io=new Server(httpServer,{
    cors:{
        origin: "http://localhost:3000",
        methods:["GET", "POST"],
        credentials:true,
    },
});

io.use((socket, next) => {
    console.log("🔵 Middleware triggered: Checking username...");
    const username = socket.handshake.auth.username;
    console.log("Received username:", username);

    if (!username) {
        console.log("❌ Connection rejected: Invalid username");
        return next(new Error("Invalid username"));
    }

    socket.username = username;
    socket.userId = uuidv4();
    console.log(`✅ Connection accepted: User ${socket.username} with ID ${socket.userId}`);

    next();
});
io.on("connection", async (socket) => {
    console.log(`🔵 New user connected: ${socket.username}`);

    // Fetch all connected users
    const users = [];
    for (let [id, userSocket] of io.of("/").sockets) {
        users.push({
            userId: userSocket.userId,
            username: userSocket.username,
        });
    }

    console.log(`📋 Current connected users:`, users.map(user => user.username));

    // Send the connected users list to the new user
    socket.emit("users", users);
    console.log(`📤 Sent users list to: ${socket.username}`);

    // Send session details to the new user
    socket.emit("session", { userId: socket.userId, username: socket.username });
    console.log(`📤 Sent session details to: ${socket.username} (ID: ${socket.userId})`);

    // Notify other users about the new connection
    socket.broadcast.emit("user connected", {
        userId: socket.userId,
        username: socket.username
    });
    console.log(`📢 Broadcasted that ${socket.username} joined the chat`);

    // Handle new message event
    socket.on("new message", (message) => {
        console.log(`💬 New message from ${socket.username}: "${message}"`);

        // Broadcast the message to all users except the sender
        socket.broadcast.emit("new message", {
            userId: socket.userId,
            username: socket.username,
            message,
        });

        console.log(`📢 Message broadcasted: "${message}" from ${socket.username}`);
    });

    // Handle user disconnect event
    socket.on("disconnect", () => {
        console.log(`❌ User disconnected: ${socket.username}`);
    });
});

   

console.log("Listening to port...");
httpServer.listen(process.env.PORT || 4000);