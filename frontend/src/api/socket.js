// src/api/socket.js
import { io } from "socket.io-client";

const SOCKET_URL = "http://localhost:5000"; // your backend server url

const socket = io(SOCKET_URL, {
    autoConnect: false,  // manual control over connection
});

export default socket;
