const express = require('express');
const app = express();

const fs = require('fs');

const options = {
  key: fs.readFileSync('localhost.key'),
  cert: fs.readFileSync('localhost.crt')
}

const server = require('https').Server(options,app);
const port = 443;

app.use(express.static('public'));

server.listen(port, () => {
  console.log(`App listening on port ${port}`)
})


const { Server } = require("socket.io");
const io = new Server(server);

const clients = {};


io.on('connection', socket => {
  console.log('connected');
  clients[socket.id] = {id: socket.id};

  socket.on(`click`, click => {
    console.log(`clicked: ${click}`);
    io.sockets.emit(`click`, 'yes!');
  })

  socket.on('disconnect', () => {
    delete clients[socket.id];
    io.emit('clients', clients);
  });

  socket.on('peerOffer', (peerId, offer) => {
    console.log(`Received peerOffer from ${socket.id} to ${peerId}`);
    io.to(peerId).emit('peerOffer', peerId, offer, socket.id);
  });

  socket.on('peerAnswer', (peerId, answer) => {
    console.log(`Received peerAnswer from ${socket.id} to ${peerId}`);
    io.to(peerId).emit('peerAnswer', peerId, answer, socket.id);
  });

  socket.on('peerIce', (peerId, candidate) => {
    console.log(`Received peerIce from ${socket.id} to ${peerId}`);
    io.to(peerId).emit('peerIce', peerId, candidate, socket.id);
  });

  io.emit('clients', clients);
})

