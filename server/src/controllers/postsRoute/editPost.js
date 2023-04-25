const express = require("express");
const editPost = express.Router();
const {Post} = require("../postsRoute/createPost")
const Joi = require('joi');

const schema = Joi.object({
  
  id: Joi.string().required(),
  text: Joi.string().required(),
});


editPost.patch("/", async (req, res) => {
    const {error} = schema.validate(req.body)
    if(error) {
        return res.status(404).send(error.details)
    }

 const userID = req.session.userId
 const postID = req.body.id 
 const newText = req.body.text
 const checkIfUserIsAuthToEdit = await Post.findOne({_id: `${postID}`, userId: `${userID}`})
 

 if(!checkIfUserIsAuthToEdit || !userID){
    return res.sendStatus(401)
 }
try {
    const uptade = await Post.findByIdAndUpdate(postID, {post: `${newText}`})
   res.sendStatus(200)

}catch(err){
    console.log(err)
    res.sendStatus(500)
}
})

module.exports = editPost