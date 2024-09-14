const db = require("../db/queries");
const splitStringInArray = require("../utils/splitStringIntoArray");
const splitCheckedOrNotGenreInArray = require("../utils/splitCheckedOrNotGenreInArray");

async function getAllVideogamesGet(req, res) {
  let allVideogamesGenresPublishers =
    await db.getAllVideogamesGenresPublishers();

  res.render("view_all_videogames", {
    videogameInformation: allVideogamesGenresPublishers,
  });
}

async function getVideogameGet(req, res) {
  let videogameGenrePublisher = await db.getVideogameGenrePublisher(
    req.params.id
  );
  let videogameGenre = splitStringInArray.splitStringIntoArray(
    videogameGenrePublisher[0].videogame_genre
  );
  videogameGenrePublisher[0].videoGameGenreArray = videogameGenre;
  let videogameAllGenresId = await db.getMultipleVideogamesCategoriesId(
    videogameGenrePublisher[0].videoGameGenreArray
  );

  res.render("view_videogame", {
    videogameInformation: videogameGenrePublisher,
    videogameParams: req.params,
    videogameAllGenresId: videogameAllGenresId,
  });
}

async function getUpdateVideogameGet(req, res) {
  let allVideogameCategorie = await db.getAllVideogamesCategories();
  let videogameInformation = await db.getVideogame(req.params.id);
  let videogameGenre = splitStringInArray.splitStringIntoArray(
    videogameInformation[0].videogame_genre
  );
  videogameInformation[0].videoGameGenreArray = videogameGenre;
  let checkedOrNotArray =
    await splitCheckedOrNotGenreInArray.splitCheckedOrNotGenreInArray(
      req.params.id
    );

  res.render("update_videogame", {
    videogameCategories: allVideogameCategorie,
    videogameInformation: videogameInformation,
    videogameParams: req.params,
    videogameGenreChecked: checkedOrNotArray,
  });
}

async function updateVideogamePost(req, res) {
  let uptadedVideogame = [
    req.body.videogameName,
    req.body.videogameDescription,
    req.body.videogamePrice,
    req.body.videogameImage,
    req.body.videogameReleaseDate,
    req.body.videogameRating,
    req.body.videogameQuantity,
    req.params.videogameId,
  ];

  await db.updateVideogame(uptadedVideogame);
  res.redirect("/videogame");

  let allVideogamesGenresPublishers =
    await db.getAllVideogamesGenresPublishers();
  res.render("view_all_videogames", {
    videogameInformation: allVideogamesGenresPublishers,
  });
}

async function getDeleteVideogameGet(req, res) {
  let videogameInformations = await db.getVideogame(req.params.id);

  res.render("delete_videogame", {
    videogameParams: req.params,
    videogameInformations: videogameInformations,
  });
}

async function deleteVideogamePost(req, res) {
  await db.deleteVideogame(req.params.id, req.params.videogameId);

  res.redirect("/videogame");

  let allVideogamesGenresPublishers =
    await db.getAllVideogamesGenresPublishers();
  res.render("view_all_videogames", {
    videogameInformation: allVideogamesGenresPublishers,
  });
}

module.exports = {
  getAllVideogamesGet,
  getVideogameGet,
  getUpdateVideogameGet,
  updateVideogamePost,
  getDeleteVideogameGet,
  deleteVideogamePost,
};
