const router = require("express").Router();

router.get("/", (_, res) => {
  res.render("tasks/tasks");
});

module.exports = router;
