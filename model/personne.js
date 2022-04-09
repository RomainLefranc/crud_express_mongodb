const mongoose = require("mongoose");

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
});
const Personne = mongoose.model("Personne", personneSchema);

module.exports = Personne;
