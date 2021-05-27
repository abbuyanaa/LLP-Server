const express = require("express");
const router = express.Router();
const {
  getAimags,
  createAimag,
  getAimag,
  updateAimag,
  deleteAimag,
} = require("../controllers/AimagsController");

router.route("/aimags").get(getAimags);
router.route("/aimag/create/").post(createAimag);
router.route("/aimag/update/:id").get(getAimag).put(updateAimag);
router.route("/aimag/delete/:id").delete(deleteAimag);

module.exports = router;
