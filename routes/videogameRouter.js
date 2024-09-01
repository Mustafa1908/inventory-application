const express = require("express");
const videogameController = require("../controllers/videogameController");
const router = express.Router();

router.get("", videogameController.getAllVideogames);
router.get("/:id");
router.post("/:id");
router.post("/updata");
router.post("//delete");

module.exports = router;
