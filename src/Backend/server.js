const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const fs = require("fs");
const cors = require("cors");
const multer = require("multer");

const app = express();
const server = http.createServer(app);

const io = socketIo(server, {
  cors: {
    origins: ["http://localhost:3000"],
  },
});

const PORT = process.env.PORT || 3001;

app.use(cors());

// Serve your React app (assuming it's built and in the 'client/build' directory)
app.use(express.static("client/build"));

// Socket.IO connection
io.on("connection", (socket) => {
  console.log("Client connected");

  // Read JSON file and emit data to connected clients
  const jsonFilePath = "jsondata.json"; // Provide the correct path
  fs.readFile(jsonFilePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading JSON file:", err);
      return;
    }

    const jsonData = JSON.parse(data);

    // Emit data to the connected clients
    io.emit("updateChartData", jsonData);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

// Setup Multer for handling file uploads
const storage = multer.memoryStorage(); // Save file as Buffer in memory
const upload = multer({ storage: storage });

// Endpoint for uploading JSON file
app.post("/upload", upload.single("file"), (req, res) => {
  try {
    const jsonData = JSON.parse(req.file.buffer.toString());

    // Emit data to connected clients
    io.emit("updateChartData", jsonData);

    res.status(200).json({ message: "File uploaded successfully" });
  } catch (error) {
    console.error("Error parsing JSON file:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
