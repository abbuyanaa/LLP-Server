const express = require("express");
const router = express.Router();
const {
  getDetails,
  getDetail,
  createDetails,
  updateDetails,
  deleteDetails,
} = require("../controllers/DetailsController");

router.route("/:w_id").get(getDetails).post(createDetails);
router
  .route("/:w_id/:wd_id")
  .get(getDetail)
  .put(updateDetails)
  .delete(deleteDetails);

module.exports = router;
