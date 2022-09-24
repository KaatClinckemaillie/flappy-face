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


io.on('connection', socket => {
  console.log('connected');
  socket.on(`click`, click => {
    console.log(`clicked: ${click}`);
    io.sockets.emit(`click`, 'yes!');
  })
})

