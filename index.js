const express = require('express');
const app = express();
const port = 3000;
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);


io.on('connection', socket => {
  console.log('connected');
  socket.on(`click`, click => {
    console.log(`clicked: ${click}`);
    io.sockets.emit(`click`, 'yes!');
  })
})

app.use(express.static('public'))
server.listen(port, () => {
  console.log(`App listening on port ${port}`)
})