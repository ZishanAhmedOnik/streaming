const express = require("express");
const router = express.Router();

const File = require("../../models/File.model");

router.post("/postStats", async (req, res) => {
  const { fileId, currentTime, duration } = req.body;
  file = new File({ Id: fileId, CurrentTime: currentTime, Duration: duration });
  await file.setStats();
  res.json({
    stat: "ok",
  });
});

module.exports = router;
