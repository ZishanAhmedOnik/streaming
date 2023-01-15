const express = require("express");
const router = express.Router();

const fs = require("fs");
const path = require("path");

const upload = require("../../config/multer.config");
const publisher = require("../../redis/publisher");

const season = require("../../models/Season.model");

router.post("/createSeason", async (req, res) => {
  const newSeason = await season.AddSeason(req.body.seasonName);
  res.json(newSeason);
});

router.post("/fileupload/:seasonId", (req, res) => {
  req.pipe(req.busboy);
  req.busboy.on("file", (name, file, info) => {
    const fileNameToWrite = `${Date.now()} - ${info.filename}`;
    const fstream = fs.createWriteStream(path.join("uploads", fileNameToWrite));
    file.pipe(fstream);
    fstream.on("close", () => {
      const packet = {
        seasonId: req.params.seasonId,
        fileName: fileNameToWrite,
        originalName: info.filename
      };
      publisher.publish("message", JSON.stringify(packet));
      res.json({
        stat: info.filename,
      });
    });
  });
});

module.exports = router;
