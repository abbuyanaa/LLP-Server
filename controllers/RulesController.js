const db = require("../config/db-mysql");
const asyncHandler = require("../middleware/asyncHandler");

exports.getRules = asyncHandler(async (req, res, next) => {
  const selectQuery = await `SELECT r.*
  FROM rules AS r
  LEFT JOIN levels AS l ON r.level_id = l.l_id
  ORDER BY r.r_id DESC`;

  db.query(selectQuery, (error, result) => {
    res.status(200).json({
      success: true,
      data: result,
    });
  });
});

exports.getRule = asyncHandler(async (req, res, next) => {
  const rid = req.params.rid;
  const selectQuery = await "SELECT * FROM `rules` WHERE `r_id`=?";

  db.query(selectQuery, [rid], (error, result) => {
    res.status(200).send({
      success: true,
      data: result,
    });
  });
});

exports.createRule = asyncHandler(async (req, res, next) => {
  const { rule, content, level_id } = req.body;
  const createQuery = await "INSERT INTO `rules`(`rule`, `content`, `level_id`) VALUES (?,?,?)";

  db.query(createQuery, [rule, content, level_id], (err, result) => {
    res.status(200).json({
      success: true,
      data: "Амжилттай шинэ дүрэм нэмлээ.",
    });
  });
});

exports.updateRule = asyncHandler(async (req, res, next) => {
  const rid = req.params.rid;
  const { rule, content, level_id } = req.body;

  const updateQuery = await "UPDATE `rules` SET `rule`=?,`content`=?,`level_id`=? WHERE `r_id`=?";

  db.query(updateQuery, [rule, content, level_id, rid], (err, result) => {
    res.status(200).json({
      success: true,
      data: `Амжилттай ${rid} ID-тай дүрмийг шинэчиллээ.`,
    });
  });
});

exports.deleteRule = asyncHandler(async (req, res, next) => {
  const rid = req.params.rid;
  const deleteQuery = await "DELETE FROM `rules` WHERE `r_id`=?";

  db.query(deleteQuery, [rid], (err, result) => {
    if (err) throw err;
    res.status(200).json({
      success: true,
      data: `Амжилттай ${rid} ID-тай дүрмийг устгалаа.`,
    });
  });
});
