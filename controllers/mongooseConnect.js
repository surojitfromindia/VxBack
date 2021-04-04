const mongoose = require("mongoose");

function Connect() {
  mongoose
    .connect(`mongodb://localhost:27017/productionDbOne`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {})
    .catch((err) => console.log(err));
}

module.exports = {
  Connect,
};
