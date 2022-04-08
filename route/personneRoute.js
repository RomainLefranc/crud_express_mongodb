var express = require("express");
var router = express.Router();
const personneController = require("../controller/personneController");

// create get
router.get("/personne/crud/create", personneController.create_get);

// create post
router.post("/personne/crud/create", personneController.create_post);

// read
router.get("/personne/crud/:personneId/read", personneController.read);

// update get
router.get("/personne/crud/:personneId/update", personneController.update_get);

// update post
router.post(
  "/personne/crud/:personneId/update",
  personneController.update_post
);

// delete
router.delete("/personne/crud/:personneId/delete", personneController.delete);

// list
router.get("/personne", personneController.list);

// add cours get
router.get(
  "/personne/:personneId/cours/crud/create",
  personneController.add_cours_get
);

// add cours post
router.post(
  "/personne/:personneId/cours/crud/create",
  personneController.add_cours_post
);

module.exports = router;
