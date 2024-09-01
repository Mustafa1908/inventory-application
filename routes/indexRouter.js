const express = require("express");
const router = express.Router();

router.get("/", function (req, res) {
  res.render("index");
});
router.get("/create_videogame");
router.post("/create_videogame");
router.get("/create_categorie");
router.post("/create_categorie");

module.exports = router;
