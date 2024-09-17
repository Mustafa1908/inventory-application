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

createVideoGamePost = asyncHandler(async (req, res) => {
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
});

getNewVideogameCategorieGet = (req, res) => {
  res.render("new_videogame_categorie");
};

//Create form error messages

const videogameCategorieMessage = "must be  between 3 and 20 characters";
const videogameCategorieDescriptionMessage =
  "must be  between 3 and 280 characters";
const videogameCategorieImageMessage = "must be  between 3 and 20 characters";

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
    .isLength({ min: 6, max: 280 })
    .withMessage(`Videogame categorie image ${videogameCategorieImageMessage}`),
];

//

createVideoGameCategoriePost = [
  validateVideogameCategorie,
  asyncHandler(async (req, res) => {
    console.log("hey");
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("new_videogame_categorie", {
        title: "Create videogame categorie",
        errors: errors.array(),
        formData: req,
      });
    }
    let newVideogameCategorie = [
      req.body.videogameCategorie,
      req.body.videogameCategorieDescription,
      req.body.videogameCategorieImage,
    ];
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
