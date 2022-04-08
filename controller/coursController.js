const { json } = require("express/lib/response");

const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectId;
const dbUrl = "mongodb://localhost:27017";
const dbName = "Romain";
const dbCollection = "cours";

exports.update_get = async function (req, res) {
  const coursId = req.params.coursId;
  if (!ObjectId.isValid(coursId)) {
    return res.status(404).send("id invalide");
  }
  const client = await MongoClient.connect(dbUrl).catch((e) =>
    res.status(500).send(err)
  );
  const db = client.db(dbName);
  const cours = await db
    .collection(dbCollection)
    .findOne({ _id: ObjectId(coursId) })
    .catch((error) => res.status(500).send(error));
  const personnes = await db
    .collection("personnes")
    .find()
    .toArray()
    .catch((error) => res.status(500).send(error));
  if (cours) {
    return res.render("cours/update", { cours, personnes });
  }
  return res.status(404).send("Not found");
};

exports.update_post = async function (req, res) {
  const coursId = req.params.coursId;
  if (!ObjectId.isValid(coursId)) {
    return res.status(404).send("id invalide");
  }
  const client = await MongoClient.connect(dbUrl).catch((e) =>
    res.status(500).send(err)
  );
  const db = client.db(dbName);
  await db
    .collection(dbCollection)
    .updateOne({ _id: ObjectId(coursId) }, { $set: req.body })
    .catch((error) => res.status(500).send(error));
  return res.redirect(`/cours`);
};

exports.delete = async function (req, res) {
  const coursId = req.params.coursId;
  if (!ObjectId.isValid(coursId)) {
    return res.status(404).send("id invalide");
  }
  const client = await MongoClient.connect(dbUrl);
  const db = client.db(dbName);
  await db
    .collection(dbCollection)
    .deleteOne({ _id: ObjectId(coursId) })
    .catch((error) => res.status(500).send(error));
  return res.redirect("/cours");
};

exports.create_get = async function (req, res) {
  const client = await MongoClient.connect(dbUrl);
  const db = client.db(dbName);
  const personnes = await db
    .collection("personnes")
    .find()
    .toArray()
    .catch((error) => res.status(500).send(error));
  return res.render("cours/create", { personnes });
};

exports.create_post = async function (req, res) {
  const client = await MongoClient.connect(dbUrl).catch((e) =>
    res.status(500).send(err)
  );
  const db = client.db(dbName);
  await db
    .collection(dbCollection)
    .insertOne({
      name: req.body.cours,
    })
    .catch((error) => res.status(500).send(error));
  return res.redirect("/cours");
};

exports.list = async function (req, res) {
  const client = await MongoClient.connect(dbUrl).catch((e) =>
    res.status(500).send(err)
  );
  const db = client.db(dbName);
  let cours = await db
    .collection("cours")
    .find()
    .toArray()
    .catch((error) => res.status(500).send(error));
  return res.render("cours/list", { cours });
};

exports.read = async function (req, res) {
  const coursId = req.params.coursId;
  if (!ObjectId.isValid(coursId)) {
    return res.status(404).send("id invalide");
  }
  const client = await MongoClient.connect(dbUrl).catch((e) =>
    res.status(500).send(err)
  );
  const db = client.db(dbName);
  let cours = await db
    .collection("cours")
    .aggregate([
      {
        $lookup: {
          from: "personnes_cours",
          localField: "_id",
          foreignField: "id.cours",
          as: "join",
        },
      },
      {
        $lookup: {
          from: "personnes",
          localField: "join.id.personne",
          foreignField: "_id",
          as: "personnes",
        },
      },
      {
        $match: {
          _id: new ObjectId(coursId),
        },
      },
    ])
    .toArray()
    .catch((error) => res.status(500).send(error));
  if (cours) {
    cours = cours[0];
    return res.render("cours/read", { cours });
  }
  return res.status(404).send("Not found");
};

exports.add_personne_get = async function (req, res) {
  const client = await MongoClient.connect(dbUrl).catch((e) =>
    res.status(500).send(err)
  );
  const db = client.db(dbName);
  const personnes = await db
    .collection("personnes")
    .find()
    .toArray()
    .catch((error) => res.status(500).send(error));
  return res.render("cours/add_personne", { personnes });
};

exports.add_personne_post = async function (req, res) {
  const coursId = req.params.coursId;
  if (!ObjectId.isValid(coursId)) {
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
        cours: ObjectId(coursId),
        personne: ObjectId(req.body.personne),
      },
    })
    .catch((error) => res.status(500).send(error));
  return res.redirect(`/cours/crud/${coursId}/read`);
};
