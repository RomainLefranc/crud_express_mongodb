const Personne_cours = require("../model/personne_cours");
const ObjectId = require("mongoose").Types.ObjectId;

exports.delete = async function (req, res) {
  // récuperation de l'id dans l'url
  const personnes_coursId = req.params.personnes_coursId;

  // vérification que c'est un id valide
  if (!ObjectId.isValid(personnes_coursId)) {
    return res.status(404).send("id invalide");
  }
  await Personne_cours.deleteOne({ _id: ObjectId(personnes_coursId) }).catch((e) => res.status(500).send(e));
  return res.status(200).send("ok");
};
