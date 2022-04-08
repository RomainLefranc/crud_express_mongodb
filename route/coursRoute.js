var express = require("express");
var router = express.Router();
const coursController = require("../controller/coursController");

// create get
router.get("/cours/crud/create", coursController.create_get);

// create post
router.post("/cours/crud/create", coursController.create_post);

// read
router.get("/cours/crud/:coursId/read", coursController.read);

// update get
router.get("/cours/crud/:coursId/update", coursController.update_get);

// update post
router.post("/cours/crud/:coursId/update", coursController.update_post);

// delete
router.delete("/cours/crud/:coursId/delete", coursController.delete);

// list
router.get("/cours", coursController.list);

// add personne get
router.get(
  "/cours/:coursId/personne/crud/create",
  coursController.add_personne_get
);

// add personne post
router.post(
  "/cours/:coursId/personne/crud/create",
  coursController.add_personne_post
);

module.exports = router;
