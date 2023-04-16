const express = require("express");
const createPost = express.Router();
const user = require("./User")
const mongoose = require("mongoose");
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
    createdAtDate: {
        type: String,
        required: true
    }
},{ strict: "throw" })
const Post = mongoose.model('Post', postSchema);

createPost.post("/", async (req, res) => {
    const userID = req.session.userId
    if(!userID) {
        return res.sendStatus(401)
    }
   
    const post = req.body.post

    const {error} = schema.validate(req.body)
    if(error) {
        return res.status(404).send(error.details)
    }

   const findName = await user.find({_id: `${userID}`}).lean().select('username').exec()
   console.log(findName)
   const createPostData = {
    userId: userID,
    username: findName[0].username,
    post: post,
    createdAtDate: formattedDate
  
  };
  
  const createPost = new Post(createPostData);
    try {
      
       
        await createPost.save()
        res.send({message: "Post created!"})
        console.log("Created")
    } catch (err) {
        res.status(400).send(err)
    }
})

module.exports = {createPost, Post }