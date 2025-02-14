import Express, { Application, Request, Response } from "express"
import dgram from "dgram"
import http from "http"
import { Server, Socket } from "socket.io";
import ioClient from "socket.io-client"
import cors from "cors";
import morgan from "morgan";

// Utils
import { connectDB } from "./config/connectDB"
import { getLocalIp } from "./utils/getLocalIp";

// Routes
import { profileRouter } from "./routes/profile.routes"
import { chatRouter } from "./routes/chat.routes";
import { messageRouter } from "./routes/message.routes";
import { profileChatRouter } from "./routes/profile_chat.routes";
import { setupSocketListeners } from "./utils/setupSocketListeners";
import { getUserDataById } from "./utils/getUserData";

const app: Application = Express()
const server = http.createServer(app)
const io = new Server(server, { cors: { origin: "*" } })

const udpSocket = dgram.createSocket("udp4")
const peers: Set<string> = new Set()

const UDP_PORT = 41234; // Puerto para UDP broadcast
const PORT = 3500; // Puerto para Socket.IO

let loggedUser: string | null = null;

app.use(morgan("dev"))
app.use(cors())
app.use(Express.json())

app.use("/profile", profileRouter)
app.use("/chat", chatRouter)
app.use("/message", messageRouter)
app.use("/profile-chat", profileChatRouter)

app.post("/login/:idUser", (req: Request, res: Response) => {
    try {
        const { idUser } = req.params;
        loggedUser = idUser;
        
        res.status(200).send("Logged in");
    } catch (err) {
        console.error(err);
    }
})
app.post("/logout", (_req: Request, res: Response) => {
    try {
        loggedUser = null;
        
        res.status(200).send("Logged out");
    } catch (err) {
        console.error(err);
    }
})

udpSocket.bind(UDP_PORT, () => {
    udpSocket.setBroadcast(true)
    console.log(`UDP server listening on port ${UDP_PORT}`);
})

setInterval(() => {
    if (loggedUser !== null) {
        (async () => {
            const userData = await getUserDataById(loggedUser)
            const message = JSON.stringify({ userData, ip: getLocalIp(), port: PORT });
            udpSocket.send(message, 0, message.length, UDP_PORT, '255.255.255.255', (err) => {
                if (err) console.error('Error broadcasting:', err);
            });
            console.log("Emitiendo señal de usuario conectado: " + JSON.stringify(userData));
        })()
    }
}, 5000);

udpSocket.on('message', (msg) => {
    const node = JSON.parse(msg.toString());
    const peerAddress = `http://${node.ip}:${node.port}`;

    if (!peers.has(peerAddress) && peerAddress !== `http://${getLocalIp()}:${PORT}`) {
        console.log(`Nodo descubierto: ${peerAddress}`);
        console.log(`Datos del usuario: ${JSON.stringify(node.userData)}`);
        
        peers.add(peerAddress);

        // Intentar conectarse al nodo descubierto
        const socket = ioClient(peerAddress);
        setupSocketListeners(peers, io, socket);
    }
});

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
