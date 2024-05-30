const express = require("express");
const socket = require("socket.io");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(cors()); // Apply CORS middleware

// Debug logs
console.log("Current directory:", __dirname);
console.log("Serving static files from:", path.join(__dirname, "../frontend"));

// Serve the static files from the frontend directory
app.use(express.static(path.join(__dirname, "../frontend")));  // Adjusted path

// Serve the index.html from the frontend directory
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "index.html"));  // Adjusted path
});

let port = process.env.PORT || 5000;
let server = app.listen(port, () => {
    console.log("Listening to port " + port);
});

let io = socket(server);

io.on("connection", (socket) => {
    console.log("Socket connection 👍");
    
    socket.on("beginPath", (data) => {
        io.sockets.emit("beginPath", data);
    });

    socket.on("drawStroke", (data) => {
        io.sockets.emit("drawStroke", data);
    });

    socket.on("redoUndo", (data) => {
        io.sockets.emit("redoUndo", data);
    });
});
