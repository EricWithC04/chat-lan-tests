export const setupSocketListeners = (peers: Set<string>, io: any, socket: any) => {
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