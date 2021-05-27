const express = require("express");
const router = express.Router();
const { getSubs } = require("../controllers/CatSubController");

// Sub Categories
router.route("/:bid/sub/:sid").get(getSubs);

module.exports = router;
