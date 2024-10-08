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
    `SELECT  videogame_categorie_name FROM videogame_categorie WHERE id = ${videogameCategorieInformations[0].videogame_categorie_id};`
  );

  await pool.query(
    `UPDATE videogame_genre 
    SET videogame_categorie_name = '${videogameCategorieInformations[0].videogame_categorie_name}' 
    WHERE videogame_categorie_name = '${rows[0].videogame_categorie_name}';`
  );

  await pool.query(
    `UPDATE videogame_categorie 
    SET videogame_categorie_name = '${videogameCategorieInformations[0].videogame_categorie_name}', 
    videogame_categorie_description = '${videogameCategorieInformations[0].videogame_categorie_description}', 
    videogame_categorie_image = '${videogameCategorieInformations[0].videogame_categorie_image}'
    WHERE id = ${videogameCategorieInformations[0].videogame_categorie_id};`
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
    SET videogame_name = '${videogameInformations[0].videogame_name}',  
    videogame_description = '${videogameInformations[0].videogame_description}', 
    videogame_price = '${videogameInformations[0].videogame_price}', 
    videogame_image = '${videogameInformations[0].videogame_image}', 
    videogame_release_date = '${videogameInformations[0].videogame_release_date}', 
    videogame_rating = '${videogameInformations[0].videogame_rating}', 
    videogame_quantity = '${videogameInformations[0].videogame_quantity}'
    WHERE id = ${videogameInformations[0].videogame_id};`
  );
}

async function updateVideogameGenre(
  videogameGenreChecked,
  videogameId,
  allVideogamesCategoriesArray
) {
  const { rows } = await pool.query(
    `SELECT videogame_categorie_name FROM videogame_genre WHERE id = ${videogameId};`
  );
  let removeGenreArray = [];

  //Remove all checked categories from array

  for (let i = 0; i < videogameGenreChecked.length; i++) {
    let genreIndex = allVideogamesCategoriesArray.indexOf(
      videogameGenreChecked[i]
    );
    allVideogamesCategoriesArray.splice(genreIndex, 1);
  }

  //Remove already present genre from array
  for (let i = 0; i < rows.length; i++) {
    if (videogameGenreChecked.includes(rows[i].videogame_categorie_name)) {
      let genreIndex = videogameGenreChecked.indexOf(
        rows[i].videogame_categorie_name
      );
      videogameGenreChecked.splice(genreIndex, 1);
    }
  }

  if (allVideogamesCategoriesArray.length > 0) {
    for (let i = 0; i < allVideogamesCategoriesArray.length; i++) {
      await pool.query(
        `DELETE FROM videogame_genre   WHERE id = ${videogameId} AND videogame_categorie_name = '${allVideogamesCategoriesArray[i]}';`
      );
    }
  }

  if (videogameGenreChecked.length > 0) {
    for (let i = 0; i < videogameGenreChecked.length; i++) {
      await pool.query(
        "INSERT INTO videogame_genre (id, videogame_categorie_name) VALUES ($1, $2)",
        [videogameId, videogameGenreChecked[i]]
      );
    }
  }
}

async function updateVideogamePublisher(videogamePublisher, videogameId) {
  await pool.query(
    `UPDATE videogame_publisher 
    SET publisher = '${videogamePublisher}'  
    WHERE id = ${videogameId};`
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
  updateVideogameGenre,
  updateVideogamePublisher,
  deleteVideogame,
};
