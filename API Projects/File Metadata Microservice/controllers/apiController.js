const multer = require('multer');

const multerOptions = {
  storage: multer.memoryStorage() // store temporarily in memory
};

// middlware for uploading files
// req.file will contain 'upfile'
exports.upload = multer(multerOptions).single('upfile');

exports.uploadFile = (req, res) => {
  res.json({
    name: req.file.originalname,
    type: req.file.mimetype,
    size: req.file.size
  });
};
