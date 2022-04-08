var express = require("express");
var router = express.Router();
const coursController = require("../controller/coursController");

// update get
router.get("/cours/crud/:coursId/update", coursController.update_get);

// update post
router.post("/cours/crud/:coursId/update", coursController.update_post);

// delete
router.get("/cours/crud/:coursId/delete", coursController.delete);

// create get
router.get("/cours/crud/create", coursController.create_get);

// create post
router.post("/cours/crud/create", coursController.create_post);

// list
router.get("/cours", coursController.list);

// read
router.get("/cours/crud/:coursId/read", coursController.read);

router.get(
  "/cours/:coursId/personne/crud/create",
  coursController.add_personne_get
);

router.post(
  "/cours/:coursId/personne/crud/create",
  coursController.add_personne_post
);

module.exports = router;
