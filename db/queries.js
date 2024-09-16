const { check } = require("express-validator");
const pool = require("./pool");

async function getVideogameGenrePublisher(videogameName) {
  const { rows } = await pool.query(
    `SELECT videogame.id, videogame_name, videogame_description, videogame_price, videogame_image, videogame_quantity,  videogame_release_date, videogame_rating, publisher,  STRING_AGG(videogame_categorie_name, ' ' ORDER BY videogame_categorie_name DESC) AS videogame_genre FROM videogame JOIN videogame_genre ON videogame.id = videogame_genre.id JOIN videogame_publisher ON videogame.id = videogame_publisher.id WHERE videogame_name = '${videogameName}' GROUP BY videogame.id, videogame_genre.id, videogame_publisher.publisher;`
  );
  return rows;
}

async function getAllVideogamesGenresPublishers() {
  const { rows } = await pool.query(
    "SELECT videogame.id, videogame_name,  videogame_description, videogame_price, videogame_image, videogame_release_date, videogame_rating, publisher,  STRING_AGG(videogame_categorie_name, ' ' ORDER BY videogame_categorie_name DESC) AS videogame_genre FROM videogame JOIN videogame_genre ON videogame.id = videogame_genre.id JOIN videogame_publisher ON videogame.id = videogame_publisher.id  GROUP BY videogame.id, videogame_genre.id, videogame_publisher.publisher;"
  );
  return rows;
}

async function getVideogameCategorieDescription(videogameCategorie) {
  const { rows } = await pool.query(
    `SELECT videogame_categorie_name, videogame_categorie_description, videogame_categorie_image FROM  videogame_categorie WHERE videogame_categorie_name = '${videogameCategorie}'`
  );
  return rows;
}

async function getMultipleVideogamesCategoriesId(videogameGenreName) {
  let videogameGenreId = [];
  for (let i = 0; i < videogameGenreName.length; i++) {
    let { rows } = await pool.query(
      `SELECT Id FROM videogame_categorie WHERE videogame_categorie_name = '${videogameGenreName[i]}';
`
    );
    videogameGenreId.push(rows);
  }
  return videogameGenreId;
}

async function getAllVideogamesWithSpecificGenre(videogameGenre) {
  const { rows } = await pool.query(
    `SELECT videogame.id, videogame_name, videogame_image, STRING_AGG(videogame_categorie_name, ' ' ORDER BY videogame_categorie_name DESC) AS videogame_genre FROM videogame JOIN videogame_genre ON videogame.id = videogame_genre.id WHERE videogame_categorie_name = '${videogameGenre}' GROUP BY videogame.id, videogame_genre.id;`
  );
  return rows;
}

async function getAllVideogamesCategoriesAndDescriptions() {
  const { rows } = await pool.query("SELECT * FROM videogame_categorie");
  return rows;
}

async function getAllVideogamesCategories() {
  const { rows } = await pool.query(
    "SELECT id, videogame_categorie_name, videogame_categorie_image FROM videogame_categorie ORDER BY id ASC"
  );
  return rows;
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

async function updateVideogameCategorie(videogameCategorieInformations) {
  const { rows } = await pool.query(
    `SELECT  videogame_categorie_name FROM videogame_categorie WHERE id = ${videogameCategorieInformations[3]};`
  );

  await pool.query(
    `UPDATE videogame_genre 
    SET videogame_categorie_name = '${videogameCategorieInformations[0]}' 
    WHERE videogame_categorie_name = '${rows[0].videogame_categorie_name}';`
  );

  await pool.query(
    `UPDATE videogame_categorie 
    SET videogame_categorie_name = '${videogameCategorieInformations[0]}', 
    videogame_categorie_description = '${videogameCategorieInformations[1]}', 
    videogame_categorie_image = '${videogameCategorieInformations[2]}'
    WHERE id = ${videogameCategorieInformations[3]};`
  );
}

async function deleteVideogameCategorie(
  videogameCategorieName,
  videogameSpecificGenreId
) {
  for (let i = 0; i < videogameSpecificGenreId.length; i++) {
    let { rows } = await pool.query(
      `SELECT id FROM videogame_genre WHERE id = ${videogameSpecificGenreId[i]};`
    );

    if (rows.length === 1) {
      await pool.query(
        `DELETE FROM videogame WHERE id = ${videogameSpecificGenreId[i]};`
      );
      await pool.query(
        `DELETE FROM videogame_publisher WHERE id = ${videogameSpecificGenreId[i]};`
      );
    }
  }

  await pool.query(
    `DELETE FROM videogame_categorie WHERE videogame_categorie_name = '${videogameCategorieName}';`
  );
  await pool.query(
    `DELETE FROM videogame_genre WHERE videogame_categorie_name = '${videogameCategorieName}';`
  );
}

async function getVideogame(videogameName) {
  const { rows } = await pool.query(
    `SELECT videogame.id, videogame_name,  videogame_description, videogame_price, videogame_image, videogame_release_date, videogame_rating, publisher, videogame_quantity,  STRING_AGG(videogame_categorie_name, ' ' ORDER BY videogame_categorie_name ASC) AS videogame_genre FROM videogame JOIN videogame_genre ON videogame.id = videogame_genre.id JOIN videogame_publisher ON videogame.id = videogame_publisher.id WHERE videogame_name = '${videogameName}'  GROUP BY videogame.id, videogame_genre.id, videogame_publisher.publisher;
`
  );
  return rows;
}

async function getCurrentVideogameId() {
  const { rows } = await pool.query("SELECT id FROM videogame");
  return rows;
}

async function insertNewVideogame(newVideogame) {
  await pool.query(
    "INSERT INTO videogame (videogame_name,  videogame_description, videogame_price, videogame_release_date, videogame_rating, videogame_quantity, videogame_image) VALUES ($1, $2, $3, $4, $5 , $6, $7)",
    [
      newVideogame[0],
      newVideogame[1],
      newVideogame[2],
      newVideogame[3],
      newVideogame[4],
      newVideogame[5],
      newVideogame[6],
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

async function updateVideogame(videogameInformations) {
  await pool.query(
    `UPDATE videogame 
    SET videogame_name = '${videogameInformations[0]}',  
    videogame_description = '${videogameInformations[1]}', 
    videogame_price = '${videogameInformations[2]}', 
    videogame_image = '${videogameInformations[3]}', 
    videogame_release_date = '${videogameInformations[4]}', 
    videogame_rating = '${videogameInformations[5]}', 
    videogame_quantity = '${videogameInformations[6]}'
    WHERE id = ${videogameInformations[7]};`
  );
}

async function deleteVideogame(videogameName, videogameId) {
  await pool.query(
    `DELETE   FROM videogame WHERE videogame_name = '${videogameName}';`
  );
  await pool.query(
    `DELETE   FROM videogame_genre WHERE id = '${videogameId}';`
  );
  await pool.query(
    `DELETE   FROM videogame_publisher WHERE id = '${videogameId}';`
  );
}

module.exports = {
  getVideogameGenrePublisher,
  getAllVideogamesGenresPublishers,
  getVideogameCategorieDescription,
  getMultipleVideogamesCategoriesId,
  getAllVideogamesWithSpecificGenre,
  getAllVideogamesCategoriesAndDescriptions,
  getAllVideogamesCategories,
  insertNewVideogameCategorie,
  updateVideogameCategorie,
  deleteVideogameCategorie,
  getVideogame,
  getCurrentVideogameId,
  insertNewVideogame,
  insertNewVideogameGenre,
  insertNewVideogamePublisher,
  updateVideogame,
  deleteVideogame,
};
