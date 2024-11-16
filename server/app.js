const express = require("express");
const cors = require("cors");
const path = require("path");
const connectMongoDB = require("./config/mongoConnect");
const routes = require("./routes");
const errorHandler = require("./error/errorHandler");
const app = express();

app.use(cors());

app.use(express.json());

app.use("/assets", express.static(path.join(__dirname, "assets")));

app.use("/api", routes);

app.use(errorHandler);

connectMongoDB().then(() => {
  app.listen(5000, () => {
    console.log("Server running on Port 5000");
  });
});
