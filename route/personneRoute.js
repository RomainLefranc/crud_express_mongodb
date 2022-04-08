var express = require("express");
var router = express.Router();
const personneController = require("../controller/personneController");
// update get
router.get("/personne/crud/:personneId/update", personneController.update_get);

// update post
router.post(
  "/personne/crud/:personneId/update",
  personneController.update_post
);
// read
router.get("/personne/crud/:personneId/read", personneController.read);

// delete
router.get("/personne/crud/:personneId/delete", personneController.delete);

// create get
router.get("/personne/crud/create", personneController.create_get);

// create post
router.post("/personne/crud/create", personneController.create_post);

// list
router.get("/personne", personneController.list);

router.get(
  "/personne/:personneId/cours/crud/create",
  personneController.add_cours_get
);

router.post(
  "/personne/:personneId/cours/crud/create",
  personneController.add_cours_post
);

module.exports = router;
