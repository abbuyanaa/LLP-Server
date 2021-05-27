const db = require("../config/db-mysql");
const asyncHandler = require("../middleware/asyncHandler");

exports.getAimags = asyncHandler(async (req, res, next) => {
  const selectQuery = await "SELECT * FROM `aimag` ORDER BY `a_id` DESC";

  db.query(selectQuery, (error, result) => {
    res.status(200).json({
      success: true,
      data: result,
    });
  });
});

exports.getAimag = asyncHandler(async (req, res, next) => {
  const id = req.params.id;

  const selectQuery = "SELECT * FROM `aimag` WHERE `a_id`=?";

  db.query(selectQuery, [id], (error, result) => {
    res.status(200).send({
      success: true,
      data: result,
    });
  });
});

exports.createAimag = asyncHandler(async (req, res, next) => {
  const { name_foreign, name_native } = req.body;
  const createQuery =
    "INSERT INTO `aimag`(`name_foreign`, `name_native`) VALUES (?,?)";

  db.query(createQuery, [name_foreign, name_native], (err, result) => {
    res.status(200).json({
      success: true,
      data: "Амжилттай үгсийн аймаг нэмлээ.",
    });
  });
});

exports.updateAimag = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  const { name_foreign, name_native } = req.body;

  const wQuery = await "UPDATE `aimag` SET `name_foreign`=?,`name_native`=? WHERE `a_id`=?";

  db.query(wQuery, [name_foreign, name_native, id], (err, result) => {
    res.status(200).json({
      success: true,
      data: `Амжилттай ${id} ID-тай үгсийн аймгийг шинэчилэлээ.`,
    });
  });
});

exports.deleteAimag = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  const deleteQuery = await "DELETE FROM `aimag` WHERE `a_id`=?";

  db.query(deleteQuery, [id], (error, result) => {
    if (error) throw error;
    res.status(200).send({
      success: true,
      data: `${id} ID-тай үгсийн аймгийг устгалаа.`,
    });
  });
});
