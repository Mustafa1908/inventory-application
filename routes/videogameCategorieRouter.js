const express = require("express");
const videogameCategorieController = require("../controllers/videogameCategorieController");
const router = express.Router();

router.get("/", videogameCategorieController.getAllVideogameCategories);
router.get("/:id", videogameCategorieController.getVideogameCategorie);
router.post("/:id");
router.post("/updata");
router.post("/delete");

module.exports = router;
