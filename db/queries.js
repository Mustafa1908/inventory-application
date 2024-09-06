const pool = require("./pool");

async function getVideogameGenrePublisher(videogameName) {
  const { rows } = await pool.query(
    `SELECT videogame.id, videogame_name, videogame_description, videogame_price, videogame_release_date, videogame_rating, publisher,  STRING_AGG(videogame_categorie_name, ' ' ORDER BY videogame_categorie_name DESC) AS videogame_genre FROM videogame JOIN videogame_genre ON videogame.id = videogame_genre.id JOIN videogame_publisher ON videogame.id = videogame_publisher.id WHERE videogame_name = '${videogameName}' GROUP BY videogame.id, videogame_genre.id, videogame_publisher.publisher;`
  );
  return rows;
}

async function getAllVideogamesGenresPublishers() {
  const { rows } = await pool.query(
    "SELECT videogame.id, videogame_name, videogame_description, videogame_price, videogame_release_date, videogame_rating, publisher,  STRING_AGG(videogame_categorie_name, ' ' ORDER BY videogame_categorie_name DESC) AS videogame_genre FROM videogame JOIN videogame_genre ON videogame.id = videogame_genre.id JOIN videogame_publisher ON videogame.id = videogame_publisher.id  GROUP BY videogame.id, videogame_genre.id, videogame_publisher.publisher;"
  );
  return rows;
}

async function getVideogameCategorieDescription(videogameCategorie) {
  const { rows } = await pool.query(
    `SELECT videogame_categorie_name, videogame_categorie_description FROM videogame_categorie WHERE videogame_categorie_name = '${videogameCategorie}'`
  );
  return rows;
}

async function getAllVideogamesWithSpecificGenre(videogameGenre) {
  const { rows } = await pool.query(
    `SELECT  videogame_name,  STRING_AGG(videogame_categorie_name, ' ' ORDER BY videogame_categorie_name DESC) AS videogame_genre FROM videogame JOIN videogame_genre ON videogame.id = videogame_genre.id  WHERE videogame_categorie_name = '${videogameGenre}' GROUP BY videogame.id, videogame_genre.id;`
  );
  return rows;
}

async function getAllVideogamesCategoriesAndDescriptions() {
  const { rows } = await pool.query("SELECT * FROM videogame_categorie");
  return rows;
}

async function getAllVideogamesCategories() {
  const { rows } = await pool.query(
    "SELECT videogame_categorie_name, videogame_categorie_image FROM videogame_categorie"
  );
  return rows;
}

async function getCurrentVideogameId() {
  const { rows } = await pool.query("SELECT id FROM videogame");
  return rows;
}

async function insertNewVideogame(newVideogame) {
  console.log(newVideogame[4]);
  await pool.query(
    "INSERT INTO videogame (videogame_name,  videogame_description, videogame_price, videogame_release_date, videogame_rating) VALUES ($1, $2, $3, $4, $5)",
    [
      newVideogame[0],
      newVideogame[1],
      newVideogame[2],
      newVideogame[3],
      newVideogame[4],
    ]
  );
}

async function insertNewVideogameGenre(videogameGenre) {
  for (let i = 0; i < videogameGenre[0].length; i++) {
    await pool.query(
      "INSERT INTO videogame_genre (id, videogame_categorie_name) VALUES ($1, $2)",
      [videogameGenre[1].id, videogameGenre[0][i]]
    );
  }
}

async function insertNewVideogamePublisher(videogamePublisher) {
  await pool.query(
    "INSERT INTO videogame_publisher (id, publisher) VALUES ($1, $2)",
    [videogamePublisher[1].id, videogamePublisher[0]]
  );
}

async function insertNewVideogameCategorie(newVideogameCategorie) {
  await pool.query(
    "INSERT INTO videogame_categorie (videogame_categorie_name, videogame_categorie_description, videogame_categorie_image) VALUES ($1, $2, $3)",
    [
      newVideogameCategorie[0],
      newVideogameCategorie[1],
      newVideogameCategorie[2],
    ]
  );
}

module.exports = {
  getVideogameGenrePublisher,
  getAllVideogamesGenresPublishers,
  getVideogameCategorieDescription,
  getAllVideogamesWithSpecificGenre,
  getAllVideogamesCategoriesAndDescriptions,
  getAllVideogamesCategories,
  getCurrentVideogameId,
  insertNewVideogame,
  insertNewVideogameGenre,
  insertNewVideogamePublisher,
  insertNewVideogameCategorie,
};
