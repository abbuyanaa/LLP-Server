const express = require("express");
const router = express.Router();
const {
  getRules,
  getRule,
  createRule,
  updateRule,
  deleteRule,
} = require("../controllers/RulesController");

router.route("/rules").get(getRules);
router.route("/rule/create/").post(createRule);
router.route("/rule/update/:rid").get(getRule).put(updateRule);
router.route("/rule/delete/:rid").delete(deleteRule);

module.exports = router;
