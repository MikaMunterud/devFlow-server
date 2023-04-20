const express = require("express");
const likePost = express.Router();
const user = require("../authenticationRoute/schemas/user")
const {Post} = require("../postsRoute/createPost")


likePost.patch("/", async (req, res) => {
    const userID = req.session.userId
    const blogPostID = req.body.id 
    if(!userID) {
        return res.sendStatus(401)
    }
    const findName = await user.find({_id: `${userID}`}).lean().select('username').exec()
  
    
    const checkIfUserLiked = await Post.findOne({ _id: blogPostID, likes: findName[0].username }).lean().select('likes').exec();
    
   
    if (checkIfUserLiked)  {
        return console.log("User has already liked!")
    }

    const updateLike = Post.updateOne(
        {_id:`${blogPostID}`},
        {$push: {likes: `${findName[0].username}`}}
        )

    try {
        const result = await updateLike
        res.send("ok")
       
    }catch(err) {
        console.log(err)
    }
})

module.exports = likePost