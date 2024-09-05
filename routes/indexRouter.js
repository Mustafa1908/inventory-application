const express = require("express");
const indexController = require("../controllers/indexController");
const router = express.Router();

router.get("/", indexController.getHomePageGet);
router.get("/create_videogame", indexController.getNewVideogameGet);
router.post("/create_videogame", indexController.createVideoGamePost);
router.get(
  "/create_videogame_categorie",
  indexController.getNewVideogameCategorieGet
);
router.post(
  "/create_videogame_categorie",
  indexController.createVideoGameCategoriePost
);

module.exports = router;
