const Cours = require("../model/cours");
const Personne = require("../model/personne");
const Personne_cours = require("../model/personne_cours");
const ObjectId = require("mongoose").Types.ObjectId;

exports.update_get = async function (req, res) {
  // récuperation de l'id dans l'url
  const coursId = req.params.coursId;

  // vérification que c'est un id valide
  if (!ObjectId.isValid(coursId)) {
    return res.status(404).send("id invalide");
  }

  const cours = await Cours.findOne({ _id: ObjectId(coursId) }).catch((e) =>
    res.status(500).send(e)
  );
  const personnes = await Personne.find().catch((e) => res.status(500).send(e));

  if (cours) {
    return res.render("cours/update", { cours, personnes });
  }
  return res.status(404).send("Not found");
};

exports.update_post = async function (req, res) {
  // récuperation de l'id dans l'url
  const coursId = req.params.coursId;

  // vérification que c'est un id valide
  if (!ObjectId.isValid(coursId)) {
    return res.status(404).send("id invalide");
  }
  await Cours.updateOne({ _id: ObjectId(coursId) }, { $set: req.body }).catch(
    (e) => res.status(500).send(e)
  );
  return res.redirect(`/cours`);
};

exports.delete = async function (req, res) {
  // récuperation de l'id dans l'url
  const coursId = req.params.coursId;

  // vérification que c'est un id valide
  if (!ObjectId.isValid(coursId)) {
    return res.status(404).send("id invalide");
  }
  await Cours.deleteOne({ _id: ObjectId(coursId) }).catch((e) =>
    res.status(500).send(e)
  );
  return res.status(200).send("ok");
};

exports.create_get = async function (req, res) {
  const personnes = await Personne.find().catch((error) =>
    res.status(500).send(error)
  );
  return res.render("cours/create", { personnes });
};

exports.create_post = async function (req, res) {
  const cours = new Cours(req.body);
  await Cours.create(cours).catch((e) => res.status(500).send(e));
  return res.redirect("/cours");
};

exports.list = async function (req, res) {
  let cours = await Cours.find().catch((e) => res.status(500).send(e));
  return res.render("cours/list", { cours });
};

exports.read = async function (req, res) {
  // récuperation de l'id dans l'url
  const coursId = req.params.coursId;

  // vérification que c'est un id valide
  if (!ObjectId.isValid(coursId)) {
    return res.status(404).send("id invalide");
  }

  let cours = await Cours.aggregate([
    {
      $lookup: {
        from: "personnes_cours",
        localField: "_id",
        foreignField: "id.id_cours",
        as: "join",
      },
    },
    {
      $lookup: {
        from: "personnes",
        localField: "join.id.id_personne",
        foreignField: "_id",
        as: "personnes",
      },
    },
    {
      $match: {
        _id: new ObjectId(coursId),
      },
    },
  ]).catch((e) => res.status(500).send(e));
  if (cours) {
    cours = cours[0];
    return res.render("cours/read", { cours });
  }
  return res.status(404).send("Not found");
};

exports.add_personne_get = async function (req, res) {
  const personnes = await Personne.find().catch((e) => res.status(500).send(e));
  return res.render("cours/add_personne", { personnes });
};

exports.add_personne_post = async function (req, res) {
  // récuperation de l'id dans l'url
  const coursId = req.params.coursId;

  // vérification que c'est un id valide
  if (!ObjectId.isValid(coursId)) {
    return res.status(404).send("id invalide");
  }
  const personne_cours = new Personne_cours({
    id: {
      id_cours: ObjectId(coursId),
      id_personne: ObjectId(req.body.personne),
    },
  });
  await Personne_cours.create(personne_cours).catch((e) =>
    res.status(500).send(e)
  );
  return res.redirect(`/cours/crud/${coursId}/read`);
};
