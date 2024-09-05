const express = require("express");
const videogameController = require("../controllers/videogameController");
const router = express.Router();

router.get("/", videogameController.getAllVideogamesGet);
router.get("/:id", videogameController.getVideogameGet);
router.post("/:id");
router.post("/updata");
router.post("//delete");

module.exports = router;
