const db = require("../db/queries");

async function getHomePageGet(req, res) {
  res.render("index");
}

async function getNewVideogameGet(req, res) {
  let allVideogameCategorie =
    await db.getAllVideogamesCategoriesAndDescriptions();
  res.render("new_videogame", {
    videogameCategories: allVideogameCategorie,
  });
}

async function createVideoGamePost(req, res) {
  let newVideogame = [
    req.body.videogameName,
    req.body.videogameDescription,
    req.body.videogamePrice,
    req.body.videogameReleaseDate,
    req.body.videogameRating,
  ];

  await db.insertNewVideogame(newVideogame);
  let id = await db.getCurrentVideogameId();
  let videogameGenre = [req.body.videogameGenre, id[id.length - 1]];
  let videogamePublisher = [req.body.videogamePublisher, id[id.length - 1]];

  await db.insertNewVideogameGenre(videogameGenre);
  await db.insertNewVideogamePublisher(videogamePublisher);
  res.redirect("/videogame");
}

async function getNewVideogameCategorieGet(req, res) {
  res.render("new_videogame_categorie");
}

async function createVideoGameCategoriePost(req, res) {
  let newVideogameCategorie = [
    req.body.videogameCategorie,
    req.body.videogameCategorieDescription,
  ];
  await db.insertNewVideogameCategorie(newVideogameCategorie);
  res.redirect("/videogame_categorie");
}

module.exports = {
  getHomePageGet,
  getNewVideogameGet,
  getNewVideogameCategorieGet,
  createVideoGameCategoriePost,
  createVideoGamePost,
};
