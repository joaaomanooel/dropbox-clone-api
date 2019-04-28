/* eslint-disable no-underscore-dangle */
const File = require('../models/File');
const Box = require('../models/Box');

const store = async (req, res) => {
  const { params, file, io } = req;
  const box = await Box.findById(params.id);
  const newFile = await File.create({ title: file.originalname, path: file.key });
  box.files.push(newFile);
  await box.save();
  io.sockets.in(box._id).emit('file', newFile);
  return res.status(200).send(newFile);
};

module.exports = { store };
