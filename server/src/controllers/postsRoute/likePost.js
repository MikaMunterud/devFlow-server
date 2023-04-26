const express = require("express");
const likePost = express.Router();
const user = require("../authenticationRoute/schemas/user")
const {Post} = require("../postsRoute/createPost")
const Joi = require('joi');

const schema = Joi.object({
  
  id: Joi.string().required(),
  
});


likePost.patch("/", async (req, res) => {
    const { error} = schema.validate(req.body);
    if (error) {
      return res.status(404).send(error.details);
    } 

    const userID = req.session.userId
    const blogPostID = req.body.id 
    if(!userID) {
        return res.sendStatus(401)
    }
    const postExists = await Post.exists({ _id: `${blogPostID}` });
   
    if (!postExists) {
      return res.sendStatus(404);
    }
    const findName = await user.find({_id: `${userID}`}).lean().select('username').exec()
   
  

    const checkIfUserLiked = await Post.findOne({ _id: blogPostID, likes: findName[0].username }).lean().select('likes').exec();
    
   
    if (checkIfUserLiked)  {
        return res.sendStatus(400)
    }

    const updateLike = Post.updateOne(
        {_id:`${blogPostID}`},
        {$push: {likes: `${findName[0].username}`}}
        )
     
    try {
        const result = await updateLike
        res.sendStatus(200)
       
    }catch(err) {
      res.sendStatus(500)
    }
})

module.exports = likePost