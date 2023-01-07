var express = require("express");
var router = express.Router();

const file = require("./file");
const season = require("./season");
const tasks = require("./tasks");

router.use("/file", file);
router.use("/season", season);
router.use("/tasks", tasks);

module.exports = router;
