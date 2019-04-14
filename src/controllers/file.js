const File = require('../models/File');
const Box = require('../models/Box');

const store = async (req, res) => {
  const { params, file } = req;
  const box = await Box.findById(params.id);
  const newFile = await File.create({ title: file.originalname, path: file.key });
  box.files.push(newFile);
  await box.save();
  return res.status(200).send(newFile);
};

module.exports = { store };
