const express = require("express");
const router = express.Router();

const upload = require("../../config/multer.config");
const publisher = require("../../redis/publisher");

router.post("/fileupload", upload.array("files"), (req, res) => {
  const packet = {
    seasonName: req.body.seasonName,
    files: req.files.map((file) => ({
      filename: file.filename,
      path: file.path,
      originalname: file.originalname,
    })),
  };
  publisher.publish("message", JSON.stringify(packet));
  res.json(packet);
});

module.exports = router;
