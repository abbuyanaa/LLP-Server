const db = require("../config/db-mysql");
const asyncHandler = require("../middleware/asyncHandler");

exports.getSubs = asyncHandler(async (req, res, next) => {
  const bid = req.params.bid;
  const sid = req.params.sid;
  res.json(req.params);
  res.end();
  // const selectQuery = await "SELECT * FROM `category_sub` WHERE `basic_id`=?";

  // db.query(selectQuery, [id], (error, result) => {
  //   res.status(200).json({
  //     success: true,
  //     data: result,
  //   });
  // });
});

exports.getSub = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
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
