const mongoose = require("mongoose");
require("dotenv").config();


const url = `mongodb+srv://tollispapadopoulos:jajaja123@cluster0.oczoxwr.mongodb.net/test?retryWrites=true&w=majority`;

db = () => {
  mongoose
    .connect(`${url}`, {
      useNewUrlParser: true,
    })
    
    .catch((err) => console.log(err));
};

module.exports = db;
