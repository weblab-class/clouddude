const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: String,
  googleid: String,
  levelsWon: Number,
  levelsPublished: Number,
  picture: String,
});

// compile model from schema
module.exports = mongoose.model("user", UserSchema);
