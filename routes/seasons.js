var express = require("express");
var router = express.Router();
const Season = require("../models/Season.model");

router.get("/", async (_, res) => {
  const seasons = await Season.GetAll();
  res.render("seasons/index", { seasons });
});

router.get("/addseason", (_, res) => {
  res.render("seasons/add_season", {});
});

router.post("/addseason", async (req, res) => {
  // await Season.AddSeason(req.body.Name);
  res.redirect("/seasons");
});

router.get("/:seasonId/episodes/:pageId?", async (req, res) => {
  const limit = 10;
  const pageId = req.params.pageId ? req.params.pageId : 1;
  const offset = (pageId - 1) * limit;
  let season = await Season.LoadEpisodes(req.params.seasonId, offset, limit);
  season.Files = season.Files.map((s) => {
    const percentCompleted =
      (Number.parseFloat(s.CurrentTime) / Number.parseFloat(s.Duration)) * 100;
    return {
      ...s,
      percentCompleted: Number.isNaN(percentCompleted) ? 0 : percentCompleted,
    };
  });
  res.render("seasons/episodes", { season, pageId, limit });
});

module.exports = router;
