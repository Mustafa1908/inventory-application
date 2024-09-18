const db = require("../db/queries");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const splitStringInArray = require("../utils/splitStringIntoArray");
const splitCheckedOrNotGenreInArray = require("../utils/splitCheckedOrNotGenreInArray");

getAllVideogamesGet = asyncHandler(async (req, res) => {
  let allVideogamesGenresPublishers =
    await db.getAllVideogamesGenresPublishers();
  res.render("view_all_videogames", {
    videogameInformation: allVideogamesGenresPublishers,
  });
});

getVideogameGet = asyncHandler(async (req, res) => {
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
});

getUpdateVideogameGet = asyncHandler(async (req, res) => {
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
});

updateVideogamePost = asyncHandler(async (req, res) => {
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

  updateVideogameGenrePost(req);
  updateVideogamePublisherPost(req);
  await db.updateVideogame(uptadedVideogame);
  res.redirect("/videogame");

  let allVideogamesGenresPublishers =
    await db.getAllVideogamesGenresPublishers();

  res.render("view_all_videogames", {
    videogameInformation: allVideogamesGenresPublishers,
  });
});

updateVideogameGenrePost = asyncHandler(async (req) => {
  let allVideogamesCategoriesInformations =
    await db.getAllVideogamesCategories();
  let allVideogameCategoriesArray = [];
  //Create allVideogamesCategoriesArray
  for (let i = 0; i < allVideogamesCategoriesInformations.length; i++) {
    allVideogameCategoriesArray.push(
      allVideogamesCategoriesInformations[i].videogame_categorie_name
    );
  }

  if (Array.isArray(req.body.videogameGenre) === false) {
    await db.updateVideogameGenre(
      [req.body.videogameGenre],
      req.params.videogameId,
      allVideogameCategoriesArray
    );
  } else {
    await db.updateVideogameGenre(
      req.body.videogameGenre,
      req.params.videogameId,
      allVideogameCategoriesArray
    );
  }
});

updateVideogamePublisherPost = asyncHandler(async (req) => {
  await db.updateVideogamePublisher(
    req.body.videogamePublisher,
    req.params.videogameId
  );
});

getDeleteVideogameGet = asyncHandler(async (req, res) => {
  let videogameInformations = await db.getVideogame(req.params.id);

  res.render("delete_videogame", {
    videogameParams: req.params,
    videogameInformations: videogameInformations,
  });
});

deleteVideogamePost = asyncHandler(async (req, res) => {
  await db.deleteVideogame(req.params.id, req.params.videogameId);

  res.redirect("/videogame");

  let allVideogamesGenresPublishers =
    await db.getAllVideogamesGenresPublishers();
  res.render("view_all_videogames", {
    videogameInformation: allVideogamesGenresPublishers,
  });
});

module.exports = {
  getAllVideogamesGet,
  getVideogameGet,
  getUpdateVideogameGet,
  updateVideogamePost,
  getDeleteVideogameGet,
  deleteVideogamePost,
};
