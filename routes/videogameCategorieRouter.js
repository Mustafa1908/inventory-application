const express = require("express");
const videogameCategorieController = require("../controllers/videogameCategorieController");
const router = express.Router();

router.get("/", videogameCategorieController.getAllVideogameCategoriesGet);
router.get(
  "/:id/:videogameCategorieId",
  videogameCategorieController.getVideogameCategorieGet
);
router.get(
  "/:id/:videogameCategorieId/update",
  videogameCategorieController.getUpdateVideogameCategorieGet
);
router.post(
  "/:id/:videogameCategorieId/update",
  videogameCategorieController.updateVideogameCategoriePost
);
router.get(
  "/:id/:videogameCategorieId/delete",
  videogameCategorieController.getDeleteVideogameCategorieGet
);
router.post(
  "/:id/:videogameCategorieId/delete",
  videogameCategorieController.deleteVideogameCategoriePost
);

module.exports = router;
