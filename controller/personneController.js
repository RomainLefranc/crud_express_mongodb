const Cours = require("../model/cours");
const Personne = require("../model/personne");
const Personne_cours = require("../model/personne_cours");
const ObjectId = require("mongoose").Types.ObjectId;

exports.update_get = async function (req, res) {
  // récuperation de l'id dans l'url
  const personneId = req.params.personneId;

  // vérification que c'est un id valide
  if (!ObjectId.isValid(personneId)) {
    return res.status(404).send("id invalide");
  }
  const personne = await Personne.findOne({ _id: ObjectId(personneId) }).catch(
    (e) => res.status(500).send(e)
  );
  if (personne) {
    return res.render("personne/update", { personne });
  }
  return res.status(404).send("Not found");
};

exports.update_post = async function (req, res) {
  // récuperation de l'id dans l'url
  const personneId = req.params.personneId;

  // vérification que c'est un id valide
  if (!ObjectId.isValid(personneId)) {
    return res.status(404).send("id invalide");
  }
  await Personne.updateOne(
    { _id: ObjectId(personneId) },
    { $set: req.body }
  ).catch((e) => res.status(500).send(e));
  return res.redirect(`/personne`);
};

exports.delete = async function (req, res) {
  // récuperation de l'id dans l'url
  const personneId = req.params.personneId;

  // vérification que c'est un id valide
  if (!ObjectId.isValid(personneId)) {
    return res.status(404).send("id invalide");
  }
  await Personne.deleteOne({ _id: ObjectId(personneId) }).catch((e) =>
    res.status(500).send(e)
  );
  return res.status(200).send("ok");
};

exports.create_get = function (req, res) {
  return res.render("personne/create");
};

exports.create_post = async function (req, res) {
  const personne = new Personne(req.body);
  await Personne.create(personne).catch((e) => res.status(500).send(e));
  return res.redirect("/personne");
};

exports.list = async function (req, res) {
  const personnes = await Personne.find().catch((e) => res.status(500).send(e));
  return res.render("personne/list", { personnes });
};

exports.read = async function (req, res) {
  // récuperation de l'id dans l'url
  const personneId = req.params.personneId;

  // vérification que c'est un id valide
  if (!ObjectId.isValid(personneId)) {
    return res.status(404).send("id invalide");
  }
  let personne = await Personne.aggregate([
    {
      $lookup: {
        from: "personnes_cours",
        localField: "_id",
        foreignField: "id.id_personne",
        as: "join",
      },
    },
    {
      $lookup: {
        from: "cours",
        localField: "join.id.id_cours",
        foreignField: "_id",
        as: "cours",
      },
    },
    {
      $match: {
        _id: new ObjectId(personneId),
      },
    },
  ]).catch((e) => res.status(500).send(e));
  if (personne) {
    personne = personne[0];
    return res.render("personne/read", { personne });
  }
  return res.status(404).send("Not found");
};

exports.add_cours_get = async function (req, res) {
  const cours = await Cours.find().catch((e) => res.status(500).send(e));
  return res.render("personne/add_cours", { cours });
};

exports.add_cours_post = async function (req, res) {
  // récuperation de l'id dans l'url
  const personneId = req.params.personneId;

  // vérification que c'est un id valide
  if (!ObjectId.isValid(personneId)) {
    return res.status(404).send("id invalide");
  }
  const personne_cours = new Personne_cours({
    id: {
      id_cours: ObjectId(req.body.cours),
      id_personne: ObjectId(personneId),
    },
  });
  await Personne_cours.create(personne_cours).catch((e) =>
    res.status(500).send(e)
  );
  return res.redirect(`/personne/crud/${personneId}/read`);
};
