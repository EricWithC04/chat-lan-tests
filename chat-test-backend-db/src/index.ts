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
import { registerLocalUser } from "./utils/registerLocalUser";
import { setUserOffline, setUserOnline } from "./utils/setUserOnline";
import { registerNewMessage } from "./utils/registerNewMessage";
import { localProfileExists } from "./utils/localProfileExists";

interface MessageData {
    senderId: string;
    receiverId: string;
    message: string;
}

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
        const message = JSON.stringify({ idUser: loggedUser, type: "user-disconnected", ip: getLocalIp() });
        
        const subnet = getLocalIp().split('.').slice(0, 2).join('.') + '.0.255'
        udpSocket.send(message, 0, message.length, UDP_PORT, subnet, (err) => {
            if (err) console.error('Error broadcasting:', err);
        });

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
            const message = JSON.stringify({ userData, ip: getLocalIp(), port: PORT, type: "user-connected" });
            const subnet = getLocalIp().split('.').slice(0, 2).join('.') + '.0.255'
            udpSocket.send(message, 0, message.length, UDP_PORT, subnet, (err) => {
                if (err) console.error('Error broadcasting:', err);
            });
            // console.log("Emitiendo señal de usuario conectado: " + loggedUser);
        })()
    }
}, 5000);

udpSocket.on('message', (msg) => {
    // console.log(msg.toString());
    
    (async function() {
        const node = JSON.parse(msg.toString());

        if (node.type === "user-connected") {
            const peerAddress = `http://${node.ip}:${node.port}`;
            const nodeId = node.userData.id;
        
            if (!peers.has(peerAddress) && peerAddress !== `http://${getLocalIp()}:${PORT}`) {
                console.log(`Nodo descubierto: ${peerAddress} ID: ${nodeId}`);
                // console.log(`Datos del usuario: ${JSON.stringify(node.userData)}`);
                
                registerLocalUser(node.userData, io)
                peers.add(peerAddress);
        
                // Intentar conectarse al nodo descubierto
                const socket = ioClient(peerAddress);
                setupSocketListeners(peers, io, socket);
            } else if (await localProfileExists(nodeId) && (nodeId !== loggedUser)) {
                setUserOnline(nodeId)
                io.emit("profile-connected", nodeId);
            } else {
                registerLocalUser(node.userData, io)
            }
        }

        if (node.type === "user-disconnected") {
            setUserOffline(node.idUser)
            io.emit("profile-disconnect", node.idUser);
            peers.delete(node.ip)
        }

        if (node.type === "chat-message") {
            if (node.receiverId === loggedUser) {
                console.log(`Mensaje recibido por UDP desde ${node.senderId}: `, node.message);
    
                const { type, ...rest } = node
    
                registerNewMessage(rest)
    
                io.emit("chat-message-front", rest)
            }
        }
    })()
});

io.on("connection", (socket: Socket) => {
    console.log("Nueva conexión establecida");

    socket.on("message", (message) => {
        socket.broadcast.emit("message", message);
    })

    socket.on("chat-message", (messageData: MessageData) => {
        (async () => {
            // console.log("Datos del mensaje: ", messageData);
            
            const userData: any = await getUserDataById(messageData.receiverId);
            if (userData.online) {
                // socket.emit("chat-message-front", messageData);
                // console.log("Enviando Mensaje al front........");
        
                if (peers.size > 0) {
        
                    const udpMessage = JSON.stringify({ ...messageData, type: "chat-message" })
                    
                    const subnet = getLocalIp().split('.').slice(0, 2).join('.') + '.0.255'
                    udpSocket.send(udpMessage, 0, udpMessage.length, UDP_PORT, subnet, (err) => {
                        if (err) console.error(`Error enviando mensaje a ${"1.2.3.4"}:`, err);
                    });
                }
            } else {
                socket.emit("profile-disconnected", messageData.receiverId)
            }
        })()
    })

    socket.on("chat-message-receive", (messageData: MessageData) => {
        socket.emit("chat-message-front", messageData)
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
