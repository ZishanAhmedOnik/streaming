const router = require("express").Router();

const publisher = require("../../redis/publisher");

router.get("/", async (req, res) => {
  const keys = await publisher.keys("*");
  const tasks = await Promise.all(
    keys.map((key) => publisher.get(key).then((val) => ({ key, val })))
  );
  res.json(tasks);
});

module.exports = router;
