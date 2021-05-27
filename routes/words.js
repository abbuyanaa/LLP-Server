const express = require("express");
const router = express.Router();
const {
  getWords,
  getWord,
  createWord,
  updateWord,
  deleteWord,
} = require("../controllers/WordsController");

router.route("/words").get(getWords);
router.route("/word/create/").post(createWord);
router.route("/word/update/:wid").get(getWord).put(updateWord);
router.route("/word/delete/:wid").delete(deleteWord);

module.exports = router;
