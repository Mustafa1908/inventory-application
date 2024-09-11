const express = require("express");
const videogameController = require("../controllers/videogameController");
const router = express.Router();

router.get("/", videogameController.getAllVideogamesGet);
router.get("/:id/:videogameId", videogameController.getVideogameGet);
router.get(
  "/:id/:videogameId/update",
  videogameController.getUpdateVideogameGet
);
router.post(
  "/:id/:videogameId/update",
  videogameController.updateVideogamePost
);

module.exports = router;
