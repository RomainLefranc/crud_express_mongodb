const mongoose = require("mongoose");
const { required } = require("nodemon/lib/config");

const keySchema = new mongoose.Schema({
  id_cours: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  id_personne: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
});
const personne_coursSchema = new mongoose.Schema({
  id: {
    type: keySchema,
    unique: true,
    required: true,
  },
});

const Personne_cours = mongoose.model("personnes_cours", personne_coursSchema);

module.exports = Personne_cours;
