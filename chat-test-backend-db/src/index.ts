import Express, { Application } from "express"
import dgram from "dgram"
import http from "http"
import { Server, Socket } from "socket.io";
import ioClient from "socket.io-client"
import cors from "cors";
import morgan from "morgan";
import { connectDB } from "./config/connectDB"
import { profileRouter } from "./routes/profile.routes"
import { chatRouter } from "./routes/chat.routes";
import { messageRouter } from "./routes/message.routes";
import { profileChatRouter } from "./routes/profile_chat.routes";

const app: Application = Express()
const server = http.createServer(app)
const io = new Server(server, { cors: { origin: "*" } })

const udpSocket = dgram.createSocket("udp4")
const peers = new Set()

const UDP_PORT = 41234; // Puerto para UDP broadcast
const PORT = 3500; // Puerto para Socket.IO

app.use(morgan("dev"))
app.use(cors())
app.use(Express.json())

app.use("/profile", profileRouter)
app.use("/chat", chatRouter)
app.use("/message", messageRouter)
app.use("/profile-chat", profileChatRouter)

io.on("connection", (socket: Socket) => {
    console.log("Nueva conexión establecida");

    socket.on("message", (message) => {
        socket.broadcast.emit("message", message);
    })
    
    socket.on("disconnect", () => {
        console.log("Conexión cerrada");
    })
})

connectDB()
    .then(() => {
        server.listen(PORT, () => console.log(`Server is running on port ${PORT}`))
    })
    .catch((err) => {
        console.error(err)
    })
