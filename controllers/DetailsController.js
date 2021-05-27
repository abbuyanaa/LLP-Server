const db = require("../config/db-mysql");

exports.getDetails = (req, res, next) => {
  try {
    const w_id = req.params.w_id;

    if (!w_id)
      return res.status(400).json({
        success: false,
        data: `${w_id} ID олдсонгүй!`,
      });

    const wQuery = "SELECT * FROM `words` WHERE `w_id`=?";
    db.query(wQuery, [w_id], (err, w_result) => {
      const wdQuery = "SELECT * FROM `words_details` WHERE `word_id`=?";
      db.query(wdQuery, [w_id], (err, wd_result) => {
        res.status(200).json({
          success: true,
          data: {
            w: w_result,
            wd: wd_result,
          },
        });
      });
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      data: err,
    });
  }
};

exports.getDetail = (req, res, next) => {
  try {
    const w_id = req.params.w_id;

    if (!w_id)
      return res.status(400).json({
        success: false,
        data: `${w_id} ID олдсонгүй!`,
      });

    const wQuery = "SELECT * FROM `words` WHERE `w_id`=?";
    db.query(wQuery, [w_id], (err, w_result) => {
      const wdQuery = "SELECT * FROM `words_details` WHERE `word_id`=?";
      db.query(wdQuery, [w_id], (err, wd_result) => {
        res.status(200).json({
          success: true,
          data: {
            w: w_result,
            wd: wd_result,
          },
        });
      });
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      data: err,
    });
  }
};

exports.createDetails = (req, res, next) => {
  try {
    const w_id = req.params.w_id;
    // console.log(w_id);
    const { word_native, sentences_foreign, sentences_native } = req.body;

    const createQuery =
      "INSERT INTO `words_details`(`word_native`, `sentences_foreign`, `sentences_native`, `word_id`) VALUES (?,?,?,?)";

    db.query(
      createQuery,
      [word_native, sentences_foreign, sentences_native, w_id],
      (err, result) => {
        res.status(200).json({
          success: true,
          data: "Амжилттай үг нэмэгдлээ.",
        });
      }
    );
  } catch (err) {
    res.status(400).json({
      success: false,
      data: err,
    });
  }
};

exports.updateDetails = (req, res, next) => {
  try {
    const w_id = parseInt(req.params.w_id);
    const wd_id = parseInt(req.params.wd_id);
    const { word_native, sentences_foreign, sentences_native } = req.body;

    const wdQuery =
      "UPDATE `words_details` SET `word_native`=?,`sentences_foreign`=?,`sentences_native`=? WHERE `wd_id`=? AND `word_id`=?";
    db.query(
      wdQuery,
      [word_native, sentences_foreign, sentences_native, wd_id, w_id],
      (err, result) => {
        if (err)
          return res.status(400).json({
            status: false,
            error: `Words Detail update: ${err}`,
          });

        res.status(200).json({
          success: true,
          data: "Үгийн дэлгэрэнгүй амжилттай шинэчилэлээ.",
        });
      }
    );
  } catch (err) {
    res.status(400).json({
      success: false,
      error: `Update Word Detail: ${err}`,
    });
  }
};

exports.deleteDetails = (req, res, next) => {
  try {
    const { w_id, wd_id } = req.params;

    const deleteQuery =
      "DELETE FROM `words_details` WHERE `wd_id`=? AND `word_id`=?";
    db.query(deleteQuery, [wd_id, w_id], (err, result) => {
      res.status(200).json({
        success: true,
        data: "Үгийн дэлгэрэнгүй амжилттай устгалаа.",
      });
    });
  } catch (err) {
    res.status(400).send({
      success: false,
      data: `${wd_id} ID-тэй үгийг устгахад алдаа гарлаа!`,
    });
  }
};
