const user = require("../authenticationRoute/schemas/user")
const express = require("express");
const createPost = express.Router();
const mongoose = require("mongoose");
const Joi = require('joi');

const postValidationSchema = Joi.object({
  post: Joi.string().required(),
});
const postSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    
    post: {
        type: String,
        required: true
    },
    likes: {
        type: Array,
        default: []
    },
    comments: [{
        comment: {
            type: String,
            required: true
        },
        username: {
            type: String,
            required: true
        },
       
    }],
  
  },{ strict: "throw" })
  const Post = mongoose.model('Post', postSchema);

createPost.post("/", async (req, res) => {
    const userID = req.session.userId
    if(!userID) {
        return res.sendStatus(401)
    }
   
    const post = req.body.post

    const {error} = postValidationSchema.validate(req.body)
    if(error) {
        return res.status(404).send(error.details)
    }

   const findName = await user.find({_id: `${userID}`}).lean().select('username').exec()
   const createPostData = {
    userId: userID,
    username: findName[0].username,
    post: post,
  
  };
  
  const createPost = new Post(createPostData);
    try {
      
       
        await createPost.save()
        res.send({message: "Post created!"})
    } catch (err) {
        res.status(500).send(err)
    }
})

module.exports = {createPost, Post}