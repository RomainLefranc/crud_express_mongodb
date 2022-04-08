const mongoose = require("mongoose");

const coursSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});
const Cours = mongoose.model("Cours", coursSchema);

module.exports = Cours;
