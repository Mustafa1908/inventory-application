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

//Create new videogame form error messages
const videogameNameMessageErrorMessage = "must be  between 1 and 80 characters";
const videogameDescriptionErrorMessage =
  "must be  between 30 and 300 characters";
const videogamePublisherErrorMessage = "must be  between 3 and 120 characters";
const videogamePriceErrorMessage = "must be a number";
const videogameQuantityErrorMessage = "must be an integer(5, 7, 10, 13, ...)";
const videogameRatingErrorMessage = "must be a number";
const videogameDateErrorMessage = "must be a valid date";
const videogameImageUrlErrorMessage = "must be a valid url";
const videogameImageLengthErrorMessage = "must be  between 3 and 20 characters";
const videogameGenreErrorMessage = "must be checked";

const validateVideogameMessage = [
  body("videogameName")
    .trim()
    .isLength({ min: 1, max: 80 })
    .withMessage(`Videogame  name ${videogameNameMessageErrorMessage}`),
  body("videogameDescription")
    .trim()
    .isLength({ min: 30, max: 300 })
    .withMessage(`Videogame  Description ${videogameDescriptionErrorMessage}`),
  body("videogamePublisher")
    .trim()
    .isLength({ min: 3, max: 120 })
    .withMessage(`Videogame  Publisher ${videogamePublisherErrorMessage}`),
  body("videogameQuantity")
    .trim()
    .isNumeric()
    .withMessage(`Videogame  Quantity ${videogameQuantityErrorMessage}`),
  body("videogamePrice")
    .trim()
    .isFloat()
    .withMessage(`Videogame  Price ${videogamePriceErrorMessage}`),
  body("videogameRating")
    .trim()
    .isNumeric()
    .withMessage(`Videogame  Rating ${videogameRatingErrorMessage}`),
  body("videogameReleaseDate")
    .trim()
    .isDate()
    .withMessage(`Videogame  Date ${videogameDateErrorMessage}`),
  body("videogameImage")
    .trim()
    .isURL()
    .withMessage(`Videogame categorie image ${videogameImageUrlErrorMessage}`)
    .isLength({ min: 6, max: 280 })
    .withMessage(
      `Videogame categorie image ${videogameImageLengthErrorMessage}`
    ),
  body("videogameGenre")
    .trim()
    .isLength({ min: 1 })
    .withMessage(`At least one videogame genre ${videogameGenreErrorMessage}`),
];

updateVideogamePost = [
  validateVideogameMessage,
  asyncHandler(async (req, res) => {
    let uptadedVideogame = [
      {
        videogame_name: req.body.videogameName,
        videogame_description: req.body.videogameDescription,
        videogame_price: req.body.videogamePrice,
        videogame_image: req.body.videogameImage,
        videogamea_release_date: req.body.videogameReleaseDate,
        videogame_rating: req.body.videogameRating,
        videogame_quantity: req.body.videogameQuantity,
        publisher: req.body.videogamePublisher,
        videogame_id: req.params.videogameId,
      },
    ];
    let allVideogameCategorie = await db.getAllVideogamesCategories();
    let checkedOrNotArray =
      await splitCheckedOrNotGenreInArray.splitCheckedOrNotGenreInArray(
        req.params.id
      );
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).render("update_videogame", {
        title: "Create videogame",
        errors: errors.array(),
        videogameCategories: allVideogameCategorie,
        videogameInformation: uptadedVideogame,
        videogameParams: req.params,
        videogameGenreChecked: checkedOrNotArray,
      });
    }

    updateVideogameGenrePost(req);
    updateVideogamePublisherPost(req);
    await db.updateVideogame(uptadedVideogame);
    res.redirect("/videogame");

    let allVideogamesGenresPublishers =
      await db.getAllVideogamesGenresPublishers();

    res.render("view_all_videogames", {
      videogameInformation: allVideogamesGenresPublishers,
    });
  }),
];

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
