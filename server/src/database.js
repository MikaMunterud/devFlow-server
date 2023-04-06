const mongoose = require("mongoose");
require("dotenv").config();

// const user = process.env.DATABASE_USER;
// const password = process.env.DATABASE_PASSWORD;

const url = `mongodb+srv://devFlowAdmin:Nackademin@nackademin.mc9bdzy.mongodb.net/?retryWrites=true&w=majority"`;

db = () => {
  mongoose
    .connect(`${url}`, {
      useNewUrlParser: true,
    })
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.log(err));
};

module.exports = db;
