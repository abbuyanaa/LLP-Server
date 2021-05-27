const express = require("express");
const router = express.Router();
const {
  getCategories,
  getBasic,
  createBasic,
  updateBasic,
} = require("../controllers/CatBasicController");

// Basic Categories
router.route("/").get(getCategories);
router.route("/basic/").post(createBasic);
router.route("/basic/:id").get(getBasic).put(updateBasic);

module.exports = router;
