const express = require("express");
const router = express.Router();

const fs = require("fs");
const path = require("path");

const File = require("../../models/File.model");

const publisher = require("../../redis/publisher");

const prisma = require("../../prisma/client");

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

router.get("/getEpisodes/:seasonId", async (req, res) => {
  const season = await prisma.seasons.findUnique({
    where: {
      Id: parseInt(req.params.seasonId),
    },
    include: {
      Files: true,
    },
  });
  res.json(season.Files);
});

router.post("/updateEpisdeOrderInList/:seasonId", async (req, res) => {
  const newOrdersInLists = [...req.body];
  for (const order of newOrdersInLists) {
    const file = new File({ Id: order[0], OrderInList: order[1] });
    await file.setOrderInList();
  }
  res.json(req.body);
});

router.get("/get", async (req, res) => {
  res.json(await prisma.seasons.findMany());
});

module.exports = router;
