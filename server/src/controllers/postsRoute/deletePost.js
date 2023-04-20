const express = require("express");
const deletePost = express.Router();
const {Post} = require("./createPost")
const Joi = require('joi');


const schema = Joi.object({
  id: Joi.string().required(),
});

deletePost.delete("/", async (req, res) => {
    const { error} = schema.validate(req.body);
    if (error) {
      return res.status(404).send(error.details);
    } 
    const itemID = req.body.id
    const userID = req.session.userId

    const userIdAndPostIdMatch = await Post.findOne({_id: `${itemID}`, userId: `${userID}`})
 
    if(!userID ||!userIdAndPostIdMatch){
        return res.sendStatus(401)
    }
  
    try {

        const deletePost = await Post.findOneAndDelete({_id: `${itemID}`})
       
        res.send({message: "Post deleted!"})
    }catch(err) {
        res.sendStatus(500)
    }
})

module.exports = deletePost