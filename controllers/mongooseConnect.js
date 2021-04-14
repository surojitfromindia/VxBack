const mongoose = require("mongoose");

function Connect() {
  mongoose
    .connect(
      `mongodb+srv://user_surojit:passsurojit@cluster0.3yu8q.mongodb.net/productionDbOne`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    )
    .then(() => {
      console.log("Database Connected");
    })
    .catch((err) => console.log(err));
}

module.exports = {
  Connect,
};
