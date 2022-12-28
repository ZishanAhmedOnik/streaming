var express = require("express");
var router = express.Router();

const file = require("./file");

router.use("/file", file);

module.exports = router;
