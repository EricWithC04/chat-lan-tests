import dgram from 'dgram';
import { Server } from 'socket.io';
import ioClient from 'socket.io-client';
import http from 'http';

const UDP_PORT = 41234; // Puerto para UDP broadcast
const SOCKET_PORT = 3000; // Puerto para Socket.IO

const udpSocket = dgram.createSocket('udp4');
const peers = new Set(); // Almacena los nodos descubiertos

// Crear servidor HTTP y Socket.IO
const server = http.createServer();
const io = new Server(server);

server.listen(SOCKET_PORT, () => {
    console.log(`Socket.IO server running on http://localhost:${SOCKET_PORT}`);
});

// Anunciar la presencia del nodo en la red cada 5 segundos
setInterval(() => {
    const message = JSON.stringify({ ip: getLocalIp(), port: SOCKET_PORT });
    udpSocket.send(message, 0, message.length, UDP_PORT, '255.255.255.255', (err) => {
        if (err) console.error('Error broadcasting:', err);
    });
}, 5000);

// Escuchar anuncios de otros nodos
udpSocket.on('message', (msg) => {
    const node = JSON.parse(msg.toString());
    const peerAddress = `http://${node.ip}:${node.port}`;

    if (!peers.has(peerAddress) && peerAddress !== `http://${getLocalIp()}:${SOCKET_PORT}`) {
        console.log(`Nodo descubierto: ${peerAddress}`);
        peers.add(peerAddress);

        // Intentar conectarse al nodo descubierto
        const socket = ioClient(peerAddress);
        setupSocketListeners(socket);
    }
});

// Configuración de UDP socket
udpSocket.bind(UDP_PORT, () => {
    udpSocket.setBroadcast(true);
    console.log(`UDP server listening on port ${UDP_PORT}`);
});

// Manejar conexiones entrantes con Socket.IO
io.on('connection', (socket) => {
    console.log('Nueva conexión establecida');

    // Recibir y retransmitir mensajes
    socket.on('chat-message', (data) => {
        console.log('Mensaje recibido:', data);
        socket.broadcast.emit('chat-message', data); // Enviar mensaje a todos los demás clientes
    });

    socket.on('disconnect', () => {
        console.log('Conexión cerrada');
    });
});

// Configurar listeners para conexiones salientes
function setupSocketListeners(socket: any) {
    socket.on('connect', () => {
        console.log('Conectado a nodo:', socket.io.uri);
    });

    socket.on('chat-message', (data: any) => {
        console.log('Mensaje recibido desde otro nodo:', data);
        io.emit('chat-message', data); // Enviar mensaje a todos los clientes locales
    });

    socket.on('disconnect', () => {
        console.log('Nodo desconectado:', socket.io.uri);
        peers.delete(socket.io.uri);
    });
}

// Función para obtener la dirección IP local
function getLocalIp() {
    const interfaces = require('os').networkInterfaces();
    for (const name of Object.keys(interfaces)) {
        for (const iface of interfaces[name]) {
            if (iface.family === 'IPv4' && !iface.internal) {
                return iface.address;
            }
        }
    }
    return '127.0.0.1';
}
