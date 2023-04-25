const session = require("express-session");
const express = require("express");
const db = require("./database");
const login = require("./controllers/authenticationRoute/login");
const register = require("./controllers/authenticationRoute/register");
const cors = require("cors");
const {createPost} = require("./controllers/postsRoute/createPost");
const deletePost = require("./controllers/postsRoute/deletePost");
const editPost = require("./controllers/postsRoute/editPost");
const getPosts = require("./controllers/postsRoute/getPosts");
const getSinglePost = require("./controllers/postsRoute/getSinglePost");
const likePost = require("./controllers/postsRoute/likePost");
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
app.use("/createpost", createPost);
app.use("/login", login);
app.use("/deletepost", deletePost)
app.use("/editpost", editPost)
app.use("/getposts", getPosts)
app.use("/getsinglepost", getSinglePost)
app.use("/likepost", likePost)
app.listen(4000, () => {
  console.log("Server started on port 4000");
});

module.exports= app
