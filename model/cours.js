const mongoose = require("mongoose");
var sanitizerPlugin = require("mongoose-sanitizer");

const coursSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  versionKey: false,
}).plugin(sanitizerPlugin);
const Cours = mongoose.model("Cours", coursSchema);

module.exports = Cours;
