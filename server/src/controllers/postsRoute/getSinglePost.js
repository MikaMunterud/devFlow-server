const express = require("express");
const getSinglePost = express.Router();
const {Post} = require("../postsRoute/createPost")


getSinglePost.get("/:id",  async (req, res) => {
    const id = req.params.id
    
const posts = await Post.find({userId: `${id}`})

res.send(posts)
})

module.exports = getSinglePost
