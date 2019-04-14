const mongoose = require('mongoose');

const File = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    path: {
      type: String,
      required: true,
    },
  }, {
    timestamps: true,
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  },
);

File
  .virtual('url')
  .get(function getFileUrl() {
    const { URL, PORT } = process.env;
    const url = URL || `http://localhost:${PORT || 5000}`;
    return `${url}/files/${encodeURIComponent(this.path)}`;
  });

module.exports = mongoose.model('File', File);
