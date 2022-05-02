var express = require("express");
var router = express.Router();
const personnes_coursController = require("../controller/personnes_coursController");

// delete
router.delete("/personnes_cours/crud/:personnes_coursId/delete", personnes_coursController.delete);

module.exports = router;
