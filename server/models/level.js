const mongoose = require("mongoose");

// const LevelSchema = new mongoose.Schema({
//   // _id : String
//   creator: String,
//   name: String,
//   description: String,
//   start: { x: Number, y: Number },
//   exit: { x: Number, y: Number },
//   platforms: [{ type: String, x: Number, y: Number }],
//   coins: [{ type: String, x: Number, y: Number }],
//   obstacles: [{ type: String, x: Number, y: Number }],
//   funness: Number,
//   difficulty: Number,
// });

const LevelSchema = new mongoose.Schema({
  // _id : String
  creator: String,
  name: String,
  description: String,
  start: { x: Number, y: Number },
  exit: { x: Number, y: Number },
  platforms: [mongoose.Schema.Types.Mixed],
  coins: [mongoose.Schema.Types.Mixed],
  obstacles: [mongoose.Schema.Types.Mixed],
  gravity: Number,
  funness: Number,
  difficulty: Number,
});

// compile model from schema
module.exports = mongoose.model("level", LevelSchema);
