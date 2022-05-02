const mongoose = require("mongoose");
const { required } = require("nodemon/lib/config");
var sanitizerPlugin = require("mongoose-sanitizer");

const keySchema = new mongoose.Schema({
  id_cours: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  id_personne: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  _id: false,
});
const personne_coursSchema = new mongoose.Schema({
  id: {
    type: keySchema,
    unique: true,
    required: true,
  },
  versionKey: false,
}).plugin(sanitizerPlugin);

const Personne_cours = mongoose.model("personnes_cours", personne_coursSchema);

module.exports = Personne_cours;
