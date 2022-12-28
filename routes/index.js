var express = require("express");
var router = express.Router();
const File = require("../models/File.model");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index");
});

router.get("/play_from_beginning/:id", function (req, res) {
  File.getByIdWithSeason(req.params.id).then((result) => {
    result.CurrentTime = 0.0;
    res.render("play", { file: result });
  });
});

router.get("/resume_play/:id", async (req, res) => {
  const file = await File.getByIdWithSeason(req.params.id);
  res.render("play", { file: file });
});

module.exports = router;
