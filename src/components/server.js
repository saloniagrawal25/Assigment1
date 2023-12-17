// server.js
const http = require('http');
const express = require('express');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

io.on('connection', (socket) => {
  console.log('Client connected');

  // Send initial data to the client
  socket.emit('updateChartData', getInitialData());

  // Simulate data update every 5 seconds
  setInterval(() => {
    io.emit('updateChartData', getUpdatedData());
  }, 5000);

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

const PORT = 3001;

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

// Helper functions for generating data
function getInitialData() {
  return {
    labels: ['January', 'February', 'March', 'April', 'May'],
    datasets: [
      {
        label: 'Data',
        data: [65, 59, 80, 81, 56],
        backgroundColor: 'rgba(75,192,192,0.2)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 1,
      },
    ],
  };
}

function getUpdatedData() {
  // Generate and return updated data
}
