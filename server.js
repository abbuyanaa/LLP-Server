const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
var path = require("path");
var rfs = require("rotating-file-stream");
const morgan = require("morgan");
const logger = require("./middleware/logger");
const colors = require("colors");
const errorHandler = require("./middleware/error");

// Аппын тохиргоог process.env рүү ачаалах
dotenv.config({ path: "./config/config.env" });

// Create a write stream (in append mode)
var accessLogStream = rfs.createStream("access.log", {
  interval: "1d", // rotate daily
  path: path.join(__dirname, "log"),
});

// Routers оруулж ирэх
const wordsRouters = require("./routes/words");
const detailsRouters = require("./routes/details");
const rulesRouters = require("./routes/rules");
const aimagsRouters = require("./routes/aimags");
const catBasicRouters = require("./routes/cat-basic");
const catSubRouters = require("./routes/cat-sub");

const app = express();

app.use(express.json());
app.use(logger);
app.use(morgan("combined", { stream: accessLogStream }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

app.use("/api/v1", wordsRouters);
app.use("/api/v1", rulesRouters);
app.use("/api/v1", aimagsRouters);
app.use("/api/v1/word_details", detailsRouters);
app.use("/api/v1/categories", catBasicRouters);
app.use("/api/v1/categories/catsub", catSubRouters);
app.use(errorHandler);

// Check connection
app.listen(
  process.env.PORT,
  console.log(`Express сервер ${process.env.PORT} порт дээр аслаа... `.rainbow)
);
