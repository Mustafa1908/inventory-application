const express = require("express");
const videogameCategorieController = require("../controllers/videogameCategorieController");
const router = express.Router();

router.get("/");
router.get("/:id");
router.post("/:id");
router.post("/updata");
router.post("/delete");

module.exports = router;
