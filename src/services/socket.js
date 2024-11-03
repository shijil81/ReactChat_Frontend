import { io } from "socket.io-client";
import { serverUrl } from "./serverUrl";





let socket;
// Initiating socket connection
export const initiateSocketConnection=(userId)=>{
    socket=io(serverUrl,{query:{userId}})
    console.log(`Connecting socket... for user ${userId}`);
}
// Sending message
export const sendMessage=(messageData)=>{
    if(socket) socket.emit("send_message", messageData)
}

// Subscribe to receiving messages
export const subscribeToMessages = (callback) => {
    if (!socket) return;
    socket.on('messageReceived', (message) => {
        console.log('Message received:', message);
        callback(message);
    });
};

// Joining a chat room
export const joinRoom = (roomId) => {
    if (socket) {
        socket.emit('joinRoom', { roomId });
        console.log(`Joined room: ${roomId}`);
    }
};

// Disconnect from the socket
export const disconnectSocket = () => {
    if (socket) {
        socket.disconnect();
        console.log("Socket disconnected");
    }
};


// Export socket for usage in other files (e.g., Chat.js)
export const getSocket = () => socket;