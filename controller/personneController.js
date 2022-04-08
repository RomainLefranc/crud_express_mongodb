const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectId;
const dbUrl = "mongodb://localhost:27017";
const dbName = "Romain";

exports.update_get = async function (req, res) {
  const personneId = req.params.personneId;
  if (!ObjectId.isValid(personneId)) {
    return res.status(404).send("id invalide");
  }
  const client = await MongoClient.connect(dbUrl).catch((e) =>
    res.status(500).send(err)
  );
  const db = client.db(dbName);
  const personne = await db
    .collection("personnes")
    .findOne({ _id: ObjectId(personneId) })
    .catch((error) => res.status(500).send(error));
  if (personne) {
    return res.render("personne/update", { personne });
  }
  return res.status(404).send("Not found");
};

exports.update_post = async function (req, res) {
  const personneId = req.params.personneId;
  if (!ObjectId.isValid(personneId)) {
    return res.status(404).send("id invalide");
  }
  const client = await MongoClient.connect(dbUrl).catch((e) =>
    res.status(500).send(err)
  );
  const db = client.db(dbName);
  await db
    .collection("personnes")
    .updateOne({ _id: ObjectId(personneId) }, { $set: req.body })
    .catch((error) => res.status(500).send(error));
  return res.redirect(`/personne`);
};

exports.delete = async function (req, res) {
  const personneId = req.params.personneId;
  if (!ObjectId.isValid(personneId)) {
    return res.status(404).send("id invalide");
  }

  const client = await MongoClient.connect(dbUrl).catch((e) =>
    res.status(500).send(err)
  );
  const db = client.db(dbName);
  await db
    .collection("personnes")
    .deleteOne({ _id: ObjectId(personneId) })
    .catch((error) => res.status(500).send(error));
  return res.redirect("/personne");
};

exports.create_get = function (req, res) {
  return res.render("personne/create");
};

exports.create_post = async function (req, res) {
  const client = await MongoClient.connect(dbUrl).catch((e) =>
    res.status(500).send(err)
  );
  const db = client.db(dbName);
  await db
    .collection("personnes")
    .insertOne(req.body)
    .catch((error) => res.status(500).send(error));
  return res.redirect("/personne");
};

exports.list = async function (req, res) {
  const client = await MongoClient.connect(dbUrl).catch((e) =>
    res.status(500).send(err)
  );
  const db = client.db(dbName);
  const personnes = await db
    .collection("personnes")
    .find()
    .toArray()
    .catch((error) => res.status(500).send(error));
  return res.render("personne/list", { personnes });
};

exports.read = async function (req, res) {
  const personneId = req.params.personneId;
  if (!ObjectId.isValid(personneId)) {
    return res.status(404).send("id invalide");
  }
  const client = await MongoClient.connect(dbUrl).catch((e) =>
    res.status(500).send(err)
  );
  const db = client.db(dbName);
  let personne = await db
    .collection("personnes")
    .aggregate([
      {
        $lookup: {
          from: "personnes_cours",
          localField: "_id",
          foreignField: "id.personne",
          as: "join",
        },
      },
      {
        $lookup: {
          from: "cours",
          localField: "join.id.cours",
          foreignField: "_id",
          as: "cours",
        },
      },
      {
        $match: {
          _id: new ObjectId(personneId),
        },
      },
    ])
    .toArray()
    .catch((error) => res.status(500).send(error));
  if (personne) {
    personne = personne[0];
    return res.render("personne/read", { personne });
  }
  return res.status(404).send("Not found");
};

exports.add_cours_get = async function (req, res) {
  const client = await MongoClient.connect(dbUrl).catch((e) =>
    res.status(500).send(err)
  );
  const db = client.db(dbName);
  const cours = await db
    .collection("cours")
    .find()
    .toArray()
    .catch((error) => res.status(500).send(error));
  return res.render("personne/add_cours", { cours });
};

exports.add_cours_post = async function (req, res) {
  const personneId = req.params.personneId;
  if (!ObjectId.isValid(personneId)) {
    return res.status(404).send("id invalide");
  }

  const client = await MongoClient.connect(dbUrl).catch((e) =>
    res.status(500).send(err)
  );
  const db = client.db(dbName);
  await db
    .collection("personnes_cours")
    .insertOne({
      id: {
        cours: ObjectId(req.body.cours),
        personne: ObjectId(personneId),
      },
    })
    .catch((error) => res.status(500).send(error));
  return res.redirect(`/personne/crud/${personneId}/read`);
};
