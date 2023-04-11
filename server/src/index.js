const express = require("express");
const db = require("./database");
const register = require("./controllers/authenticationRoute/register");
const cors = require("cors")


const app = express();
app.use(express.json())

app.use(cors({
  origin: ["http://localhost:3000"],
  methods: ["GET", "POST", "DELETE", "PUT", "PATCH"],
  credentials: true
}));


db();

app.use("/register", register)
app.listen(4000, () => {
  console.log("Server started on port 4000");
});
