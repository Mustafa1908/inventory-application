const db = require("../db/queries");

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
  res.render("view_videogame", {
    videogameInformation: videogameGenrePublisher,
  });
}

module.exports = {
  getAllVideogamesGet,
  getVideogameGet,
};
