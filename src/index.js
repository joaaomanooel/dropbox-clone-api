const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const socket = require('socket.io');
const { Server } = require('http');

const app = express();
const server = Server(app);
const io = socket(server);

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

module.exports = server ;
