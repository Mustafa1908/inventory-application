const db = require("../db/queries");

async function getAllVideogameCategory(req, res) {
  let videogameCategories = await db.getAllVideogamesCategories();
  res.render("view_all_videogames_categories", {
    videogameCategories: videogameCategories,
  });
}

module.exports = {
  getAllVideogameCategory,
};
