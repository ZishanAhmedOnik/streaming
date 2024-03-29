var express = require("express");
var router = express.Router();
const Season = require("../models/Season.model");
const publisher = require("../redis/publisher");

router.get("/", async (_, res) => {
  const seasons = await Season.GetAll();
  res.render("seasons/index", { seasons });
});

router.get("/addseason", (_, res) => {
  res.render("seasons/add_season", {});
});

router.post("/addseason", async (req, res) => {
  publisher.publish("message", JSON.stringify(req.body));
  res.redirect("/seasons");
});

router.get("/:seasonId/episodes/:pageId?", async (req, res) => {
  const limit = 5;
  const pageId = req.params.pageId ? req.params.pageId : 1;
  const offset = (pageId - 1) * limit;
  let season = await Season.LoadEpisodes(req.params.seasonId, offset, limit);
  const pageCount = Math.ceil(season.EpisodeCount / limit);
  season.Files = season.Files.map((s) => {
    const percentCompleted =
      (Number.parseFloat(s.CurrentTime) / Number.parseFloat(s.Duration)) * 100;
    return {
      ...s,
      percentCompleted: Number.isNaN(percentCompleted) ? 0 : percentCompleted,
    };
  });
  res.render("seasons/episodes", { season, pageId, limit, pageCount });
});

module.exports = router;
