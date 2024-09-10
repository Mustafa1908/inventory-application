const express = require("express");
const videogameController = require("../controllers/videogameController");
const router = express.Router();

router.get("/", videogameController.getAllVideogamesGet);
router.get("/:id", videogameController.getVideogameGet);
router.get("/:id/update", videogameController.getUpdateVideogameGet);
router.post("/updata");

module.exports = router;
