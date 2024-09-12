const db = require("../db/queries");
const splitStringInArray = require("../utils/splitStringIntoArray");

async function splitCheckedOrNotGenreInArray(videogameId) {
  let allVideogameCategorie = await db.getAllVideogamesCategories();
  let videogameInformation = await db.getVideogame(videogameId);
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

  return genreArray;
}

module.exports = {
  splitCheckedOrNotGenreInArray,
};
