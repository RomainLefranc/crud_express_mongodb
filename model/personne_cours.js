const mongoose = require("mongoose");

const personne_coursSchema = new mongoose.Schema({
  key: {
    cours: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    personne: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
  },
});
const Personne_cours = mongoose.model("personnes_cours", personne_coursSchema);

module.exports = Personne_cours;
