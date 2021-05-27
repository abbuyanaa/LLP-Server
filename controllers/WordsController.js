const db = require("../config/db-mysql");
const asyncHandler = require("../middleware/asyncHandler");

exports.getWords = asyncHandler(async (req, res, next) => {
  const selectQuery = await "SELECT * FROM `words` ORDER BY `w_id` DESC LIMIT 10";

  db.query(selectQuery, (error, result) => {
    res.status(200).json({
      success: true,
      data: result,
    });
  });
});

exports.getWord = asyncHandler(async (req, res, next) => {
  const wid = req.params.wid;

  const selectQuery = "SELECT * FROM `words` WHERE `w_id`=?";

  db.query(selectQuery, [wid], (error, result) => {
    res.status(200).send({
      success: true,
      data: result,
    });
  });
});

exports.createWord = asyncHandler(async (req, res, next) => {
  const { word_foreign, cat_id, aimag_id, level_id, images } = req.body;
  const createQuery =
    "INSERT INTO `words`(`word_foreign`, `cat_id`, `aimag_id`, `level_id`, `images`) VALUES (?,?,?,?,?)";

  db.query(
    createQuery,
    [word_foreign, cat_id, aimag_id, level_id, images],
    (err, result) => {
      res.status(200).json({
        success: true,
        data: "Амжилттай шинэ үг нэмлээ.",
      });
    }
  );
});

exports.updateWord = asyncHandler(async (req, res, next) => {
  const wid = req.params.wid;
  const { word_foreign, cat_id, aimag_id, level_id, images } = req.body;

  const wQuery = await "UPDATE `words` SET `word_foreign`=?,`cat_id`=?,`aimag_id`=?,`level_id`=?,`images`=? WHERE `w_id`=?";

  db.query(
    wQuery,
    [word_foreign, cat_id, aimag_id, level_id, images, wid],
    (err, result) => {
      res.status(200).json({
        success: true,
        data: `Амжилттай ${wid} ID-тай гадаад үг шинэчилэлээ.`,
      });
    }
  );
});

exports.deleteWord = asyncHandler(async (req, res, next) => {
  const wid = req.params.wid;
  const deleteQuery = await "DELETE FROM `words_details` WHERE `word_id`=?;DELETE FROM `words` WHERE `w_id`=?";

  db.query(deleteQuery, [wid, wid], (error, result) => {
    res.status(200).send({
      success: true,
      data: `${wid} ID-тай гадаад үгийг холбоотой бүх үгтэй хамт устгалаа.`,
    });
  });
});
