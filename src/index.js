const express = require("express");
const routes = express.Router();
const multer = require("multer");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, __dirname + "/uploads");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix =
      Date.now() + "-" + Math.round(Math.random() * 1e9) + ".png";
    cb(null, uniqueSuffix);
  },
});
const upload = multer({ storage: storage });

routes.post("/api/fileanalyse", upload.single("upfile"), (req, res) => {
  const { originalname, mimetype, size } = req.file;

  const uploadLog = {
    name: originalname,
    type: mimetype,
    size: size,
  };

  console.log(req.file);
  res.json(uploadLog);
});

module.exports = routes;
