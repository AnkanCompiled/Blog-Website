const express = require("express");
const cors = require("cors");
const path = require("path");
const connectMongoDB = require("./config/mongoConnect");
const routes = require("./routes");
const errorHandler = require("./error/errorHandler");
const app = express();
require("dotenv").config();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", routes);

app.use(errorHandler);

connectMongoDB().then(() => {
  app.listen(process.env.PORT, () => {
    console.log("Server running at localhost:" + process.env.PORT);
  });
});
