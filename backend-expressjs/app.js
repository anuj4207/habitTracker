require("dotenv").config();
require("express-async-errors");
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();
const express = require("express");
const app = express();

const mainRouter = require("./routes/main");
const cors = require("cors");
const connectDB = require("./db/connect");
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

app.use(cors());
//app.use(express.static("./front"));
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Methods", "POST,GET,PUT,DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
// middleware
app.use("/api/v1", jsonParser, mainRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

// cors
app.use(express.json());

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
