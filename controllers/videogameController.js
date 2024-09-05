const db = require("../db/queries");

async function getAllVideogamesGet(req, res) {
  let allVideogamesGenresPublishers =
    await db.getAllVideogamesGenresPublishers();
  console.log(allVideogamesGenresPublishers);
  res.render("view_videogame", {
    videogameInformation: allVideogamesGenresPublishers,
  });
}

module.exports = {
  getAllVideogamesGet,
};
