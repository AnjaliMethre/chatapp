import { createServer } from "http";
import { Server } from "socket.io";
import { v4 as uuidv4 } from "uuid"
const httpServer = createServer();
const io=new Server(httpServer,{
    cors:{
        origin: "http://localhost:3000",
        methods:["GET", "POST"],
    },
});

io.use((socket, next)=>{
    const username = socket.handshake.auth.username;
    if(!username){
        return next(new Error("Invalid username"));
    }
    socket.username = username; 
    socket.userId = uuidv4();
    next();
});

io.on("connection",async(socket)=>{
//socket events
socket.emit("session", { userId: socket.userId, username: socket.username })
});

console.log("Listening to port...");
httpServer.listen(process.env.PORT || 4000);