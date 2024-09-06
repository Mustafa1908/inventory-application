const db = require("../db/queries");

async function getAllVideogameCategories(req, res) {
  let videogameCategories = await db.getAllVideogamesCategories();
  res.render("view_all_videogames_categories", {
    videogameCategories: videogameCategories,
  });
}

async function getVideogameCategorie(req, res) {
  let videogameGenreInformation = await db.getVideogameCategorieDescription(
    req.params.id
  );
  let videogameSpecificGenre = await db.getAllVideogamesWithSpecificGenre(
    req.params.id
  );

  res.render("view_videogame_categorie", {
    videogameGenreInformation: videogameGenreInformation,
    videogameGenreList: videogameSpecificGenre,
  });
}

module.exports = {
  getAllVideogameCategories,
  getVideogameCategorie,
};
