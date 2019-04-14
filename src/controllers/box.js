const Box = require('../models/Box');

const show = async (req, res) => {
  const { id } = req.params;
  const box = await Box.findById(id).populate({
    path: 'files',
    options: { sort: { createdAt: -1 } },
  });
  return res.status(200).send(box);
};

const store = async (req, res) => {
  const { body } = req;
  const box = await Box.create(body);
  return res.status(200).send(box);
};

module.exports = { store, show };
