const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
const socketIo = require('socket.io');
const { Server } = require('http');

const app = express();
app.use(cors());

const server = Server(app);
const io = socketIo(server);
io.on('connection', socket => socket.on('connectRoom', box => socket.join(box)));

mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
});

app.use((req, res, next) => {
  req.io = io;
  return next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/files', express.static(path.resolve(__dirname, '../tmp')));
app.use('/api/v1', require('./routes'));

module.exports = server;
