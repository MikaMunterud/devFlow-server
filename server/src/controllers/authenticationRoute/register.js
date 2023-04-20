const express = require("express");
const register = express.Router();
const user = require("./schemas/user")
const Joi = require('joi');

const loginSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
});

register.post("/", async (req, res) => {
    const { error} = loginSchema.validate(req.body);
    if (error) {
      return res.status(404).send(error.details);
    } 
    const username = req.body.username.toLowerCase()
    const password = req.body.password

    try {
        
        const find = await user.find({ username: `${username}` }).lean().select('username').exec()
        if (find.length > 0) {
            res.status(400).send({message: `${username} already exists`})
            return
    }
    
    const createUser = new user({
            username: username,
            password: password
        });
        const savedUser = await createUser.save();
        res.send(savedUser)
    } catch (err) {
        console.log("kallesssss")
        res.send(err)
    }
})


module.exports = register