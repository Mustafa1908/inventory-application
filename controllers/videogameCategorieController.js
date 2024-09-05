const db = require("../db/queries");

async function getAllVideogameCategory(req, res) {
  let videogameCategories = await db.getAllVideogamesCategories();
  res.render("view_videogame_categorie", {
    videogameCategories: videogameCategories,
  });
}

module.exports = {
  getAllVideogameCategory,
};
