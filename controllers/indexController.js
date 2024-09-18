const db = require("../db/queries");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

getHomePageGet = (req, res) => {
  res.render("index");
};

getNewVideogameGet = asyncHandler(async (req, res) => {
  let allVideogameCategorie =
    await db.getAllVideogamesCategoriesAndDescriptions();
  res.render("new_videogame", {
    videogameCategories: allVideogameCategorie,
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
    .isLength({ min: 2, max: 80 })
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

createVideoGamePost = [
  validateVideogameMessage,
  asyncHandler(async (req, res) => {
    let allVideogameCategorie =
      await db.getAllVideogamesCategoriesAndDescriptions();
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log("hey");
      return res.status(400).render("new_videogame", {
        title: "Create videogame",
        errors: errors.array(),
        videogameCategories: allVideogameCategorie,
      });
    }

    let newVideogame = [
      req.body.videogameName,
      req.body.videogameDescription,
      req.body.videogamePrice,
      req.body.videogameReleaseDate,
      req.body.videogameRating,
      req.body.videogameQuantity,
      req.body.videogameImage,
    ];
    await db.insertNewVideogame(newVideogame);
    let id = await db.getCurrentVideogameId();
    let videogameGenre = [req.body.videogameGenre, id[id.length - 1]];
    if (Array.isArray(req.body.videogameGenre) === false) {
      videogameGenre[0] = [req.body.videogameGenre];
    }
    let videogamePublisher = [req.body.videogamePublisher, id[id.length - 1]];

    await db.insertNewVideogameGenre(videogameGenre);
    await db.insertNewVideogamePublisher(videogamePublisher);
    res.redirect("/videogame");
  }),
];

getNewVideogameCategorieGet = (req, res) => {
  res.render("new_videogame_categorie", { formValues: "" });
};

//Create form error messages

const videogameCategorieMessage = "must be  between 3 and 20 characters";
const videogameCategorieDescriptionMessage =
  "must be  between 3 and 280 characters";
const videogameCategorieImageUrlMessage = "must be a valid url";
const videogameCategorieImageLengthMessage =
  "must be  between 3 and 20 characters";

const validateVideogameCategorie = [
  body("videogameCategorie")
    .trim()
    .isLength({ min: 3, max: 20 })
    .withMessage(`Videogame categorie name ${videogameCategorieMessage}`),
  body("videogameCategorieDescription")
    .trim()
    .isLength({ min: 30, max: 280 })
    .withMessage(
      `Videogame categorie description ${videogameCategorieDescriptionMessage}`
    ),
  body("videogameCategorieImage")
    .trim()
    .isURL()
    .withMessage(
      `Videogame categorie image ${videogameCategorieImageUrlMessage}`
    )
    .isLength({ min: 6, max: 280 })
    .withMessage(
      `Videogame categorie image ${videogameCategorieImageLengthMessage}`
    ),
];

//

createVideoGameCategoriePost = [
  validateVideogameCategorie,
  asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    let newVideogameCategorie = [
      req.body.videogameCategorie,
      req.body.videogameCategorieDescription,
      req.body.videogameCategorieImage,
    ];
    if (!errors.isEmpty()) {
      return res.status(400).render("new_videogame_categorie", {
        title: "Create videogame categorie",
        errors: errors.array(),
        formValues: newVideogameCategorie,
      });
    }
    await db.insertNewVideogameCategorie(newVideogameCategorie);
    res.redirect("/videogame_categorie");
  }),
];

module.exports = {
  getHomePageGet,
  getNewVideogameGet,
  createVideoGamePost,
  getNewVideogameCategorieGet,
  createVideoGameCategoriePost,
};
