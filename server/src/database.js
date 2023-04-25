const mongoose = require("mongoose");
require("dotenv").config();

// const user = process.env.DATABASE_USER;
// const password = process.env.DATABASE_PASSWORD;

const url = `mongodb+srv://tollispapadopoulos:jajaja123@cluster0.oczoxwr.mongodb.net/test?retryWrites=true&w=majority`;

db = () => {
  mongoose
    .connect(`${url}`, {
      useNewUrlParser: true,
    })
    
    .catch((err) => console.log(err));
};

module.exports = db;
