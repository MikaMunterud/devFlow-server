const express = require("express");
const db = require("./database");

const app = express();

db();

app.listen(4000, () => {
  console.log("Server started on port 4000");
});
