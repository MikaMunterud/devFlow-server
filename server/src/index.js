const session = require("express-session");
const express = require("express");
const db = require("./database");
const login = require("./controllers/authenticationRoute/login");
const register = require("./controllers/authenticationRoute/register");
const cors = require("cors");

const app = express();
app.use(express.json());

app.use(
  session({
    key: "userId",
    secret: "mysecret",
    resave: false,
    saveUninitialized: false,

    cookie: {
      domain: "localhost",
      path: "/",
      maxAge: 1000 * 60 * 24,
      httpOnly: true,
    },
  })
);

app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "DELETE", "PUT", "PATCH"],
    credentials: true,
  })
);

db();

app.use("/register", register);

app.use("/login", login);
app.listen(4000, () => {
  console.log("Server started on port 4000");
});

const { createPost, Post } = require("./createPost");

