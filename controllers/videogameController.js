const db = require("../db/queries");
const splitStringInArray = require("../utils/splitStrinIntoArray");

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

  res.render("view_videogame", {
    videogameInformation: videogameGenrePublisher,
    videogameParams: req.params,
  });
}

async function getUpdateVideogameGet(req, res) {
  let allVideogameCategorie = await db.getAllVideogamesCategories();
  let videogameInformation = await db.getVideogame(req.params.id);
  let videogameGenre = splitStringInArray.splitStringIntoArray(
    videogameInformation[0].videogame_genre
  );
  videogameInformation[0].videoGameGenreArray = videogameGenre;
  let genreArray = [];

  //Create genreArray
  for (let i = 0; i < allVideogameCategorie.length; i++) {
    genreArray.push(["false"]);
  }

  //Check which genre are checked
  for (let i = 0; i < allVideogameCategorie.length; i++) {
    if (
      videogameInformation[0].videoGameGenreArray.includes(
        allVideogameCategorie[i].videogame_categorie_name
      )
    ) {
      genreArray[i] = ["true"];
    }
  }

  res.render("update_videogame", {
    videogameCategories: allVideogameCategorie,
    videogameInformation: videogameInformation,
    videogameCategorieParams: req.params,
    videogameGenreChecked: genreArray,
  });
}

module.exports = {
  getAllVideogamesGet,
  getVideogameGet,
  getUpdateVideogameGet,
};
