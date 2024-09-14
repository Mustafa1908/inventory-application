const db = require("../db/queries");

async function getAllVideogameCategoriesGet(req, res) {
  let videogameCategories = await db.getAllVideogamesCategories();

  res.render("view_all_videogames_categories", {
    videogameCategories: videogameCategories,
  });
}

async function getVideogameCategorieGet(req, res) {
  let videogameGenreInformation = await db.getVideogameCategorieDescription(
    req.params.id
  );
  let videogameSpecificGenre = await db.getAllVideogamesWithSpecificGenre(
    req.params.id
  );

  res.render("view_videogame_categorie", {
    videogameGenreInformation: videogameGenreInformation,
    videogameGenreList: videogameSpecificGenre,
    videogameCategorieParams: req.params,
  });
}

async function getUpdateVideogameCategorieGet(req, res) {
  let videogameGenreInformation = await db.getVideogameCategorieDescription(
    req.params.id
  );

  res.render("update_videogame_categorie", {
    videogameGenreInformation: videogameGenreInformation,
    videogameCategorieParams: req.params,
  });
}

async function updateVideogameCategoriePost(req, res) {
  let videogameCategorieInformations = [
    req.body.videogameCategorie,
    req.body.videogameCategorieDescription,
    req.body.videogameCategorieImage,
    req.params.videogameCategorieId,
  ];

  await db.updateVideogameCategorie(videogameCategorieInformations);
  let videogameCategories = await db.getAllVideogamesCategories();

  res.redirect("/videogame_categorie");
  res.render("view_all_videogames_categories", {
    videogameCategories: videogameCategories,
  });
}

async function getDeleteVideogameCategorieGet(req, res) {
  let videogameSpecificGenre = await db.getAllVideogamesWithSpecificGenre(
    req.params.id
  );

  res.render("delete_videogame_categorie", {
    videogameCategorieParams: req.params,
    videogameCategorieLength: videogameSpecificGenre.length,
  });
}

async function deleteVideogameCategoriePost(req, res) {
  let videogamesSpecificGenre = await db.getAllVideogamesWithSpecificGenre(
    req.params.id
  );
  let videogamesSpecificGenreId = [];

  //create videogamesSpecificGenreIndexArray
  for (let i = 0; i < videogamesSpecificGenre.length; i++) {
    videogamesSpecificGenreId.push(videogamesSpecificGenre[i].id);
  }
  console.log(videogamesSpecificGenreId);
  await db.deleteVideogameCategorie(req.params.id, videogamesSpecificGenreId);
  let videogameCategories = await db.getAllVideogamesCategories();

  res.redirect("/videogame_categorie");
  res.render("view_all_videogames_categories", {
    videogameCategories: videogameCategories,
  });
}

module.exports = {
  getAllVideogameCategoriesGet,
  getVideogameCategorieGet,
  getUpdateVideogameCategorieGet,
  updateVideogameCategoriePost,
  getDeleteVideogameCategorieGet,
  deleteVideogameCategoriePost,
};
