const express = require("express");
const app = express();

app.use(express.json());

app.listen(5000, () => {
  console.log("Server running on Port 5000");
});
