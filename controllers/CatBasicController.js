const db = require("../config/db-mysql");
const asyncHandler = require("../middleware/asyncHandler");

exports.getCategories = asyncHandler(async (req, res, next) => {
  // const selectQuery = `SELECT cb.cb_id, cb.name_foreign, cb.name_native,
  // (
  //     SELECT GROUP_CONCAT(cs.name_foreign SEPARATOR ', ')
  //     FROM category_sub AS cs
  //     WHERE cs.basic_id = cb.cb_id
  // ) AS csname_foreign
  // FROM category_basic AS cb ORDER BY cb.cb_id DESC`;
  const selectQuery = await "SELECT * FROM `category_basic` ORDER BY `cb_id` DESC";

  db.query(selectQuery, (error, result) => {
    res.status(200).json({
      success: true,
      data: result,
    });
  });
});

exports.getBasic = asyncHandler(async (req, res, next) => {
  const bcid = req.params.id;
  const selectQuery = await `SELECT * FROM category_basic WHERE cb_id = ${bcid}`;

  db.query(selectQuery, (error, result) => {
    res.status(200).send({
      success: true,
      data: result,
    });
  });
});

exports.createBasic = asyncHandler(async (req, res, next) => {
  const { word_foreign, word_native } = req.body;
  const createQuery = await "INSERT INTO `category_basic`(`name_foreign`, `name_native`) VALUES (?, ?)";

  db.query(createQuery, [word_foreign, word_native], (err, result) => {
    res.status(200).json({
      success: true,
      data: "Амжилттай үндсэн категори нэмлээ.",
    });
  });
});

exports.updateBasic = asyncHandler(async (req, res, next) => {
  const cb_id = req.params.id;
  const { word_foreign, word_native } = req.body;
  const updateQuery = await "UPDATE `category_basic` SET `name_foreign`=?, `name_native`=? WHERE `cb_id`=?";

  db.query(updateQuery, [word_foreign, word_native, cb_id], (err, result) => {
    res.status(200).json({
      success: true,
      data: `Амжилттай ${cb_id} ID-тай категори шинэчиллээ.`,
    });
  });
});
