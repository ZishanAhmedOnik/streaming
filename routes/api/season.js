const express = require("express");
const router = express.Router();

const fs = require("fs");
const path = require("path");

const publisher = require("../../redis/publisher");

router.post("/createSeason", async (req, res) => {
  publisher.publish("message", JSON.stringify(req.body));
  res.json({ status: "ok" });
});

router.post("/fileupload/", (req, res) => {
  req.pipe(req.busboy);
  req.busboy.on("file", (name, file, info) => {
    const fileNameToWrite = info.filename;
    const fstream = fs.createWriteStream(path.join("uploads", fileNameToWrite));
    file.pipe(fstream);
    fstream.on("close", () => {
      res.json({
        stat: info.filename,
      });
    });
  });
});

module.exports = router;
