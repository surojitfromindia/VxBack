const mongoose = require("mongoose");

//
let s1 =
  "mongodb+srv://user_surojit:passsurojit@cluster0.3yu8q.mongodb.net/productionDbTwo";
let s2 =
  "mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000";
function Connect() {
  mongoose
    .connect(`${s2}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Database Connected");
    })
    .catch((err) => console.log(err));
}

module.exports = {
  Connect,
};
