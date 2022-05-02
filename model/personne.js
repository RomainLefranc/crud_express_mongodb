const mongoose = require("mongoose");
var sanitizerPlugin = require("mongoose-sanitizer");

const personneSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  genre: {
    type: String,
    enum: ["homme", "femme", "autre"],
    required: true,
  },
  versionKey: false,
}).plugin(sanitizerPlugin);
const Personne = mongoose.model("Personne", personneSchema);

module.exports = Personne;
