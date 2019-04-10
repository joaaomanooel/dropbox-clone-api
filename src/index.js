const express = require('express');
const mongoose = require('mongoose');

const app = express();
mongoose.connect('mongodb+srv://dropbox-clone-api:dropbox-clone-api123@cluster0-df4ak.mongodb.net/dropbox?retryWrites=true', {
  useNewUrlParser: true,
});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/v1', require('./routes'));

module.exports = app;
