const db = require("../db/queries");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

getAllVideogameCategoriesGet = asyncHandler(async (req, res) => {
  let videogameCategories = await db.getAllVideogamesCategories();

  res.render("view_all_videogames_categories", {
    videogameCategories: videogameCategories,
  });
});

getVideogameCategorieGet = asyncHandler(async (req, res) => {
  let videogameGenreInformation = await db.getVideogameCategorieDescription(
    req.params.id
  );
  let videogameSpecificGenre = await db.getAllVideogamesWithSpecificGenre(
    req.params.id
  );

  res.render("view_videogame_categorie", {
    videogameGenreInformation: videogameGenreInformation,
    videogameGenreList: videogameSpecificGenre,
    videogameCategorieParams: req.params,
  });
});

getUpdateVideogameCategorieGet = asyncHandler(async (req, res) => {
  let videogameGenreInformation = await db.getVideogameCategorieDescription(
    req.params.id
  );

  res.render("update_videogame_categorie", {
    videogameGenreInformation: videogameGenreInformation,
    videogameCategorieParams: req.params,
  });
});

//Create form errors messages

const videogameCategorieMessage = "must be  between 3 and 20 characters";
const videogameCategorieDescriptionMessage =
  "must be  between 3 and 280 characters";
const videogameCategorieImageUrlMessage = "must be a valid url";
const videogameCategorieImageLengthMessage =
  "must be  between 6 and 280 characters";
const passwordMessage = "must be 30";

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
  body("password").equals("30").withMessage(`Password ${passwordMessage}`),
];

updateVideogameCategoriePost = [
  validateVideogameCategorie,
  asyncHandler(async (req, res) => {
    let videogameCategorieInformations = [
      {
        videogame_categorie_name: req.body.videogameCategorie,
        videogame_categorie_description: req.body.videogameCategorieDescription,
        videogame_categorie_image: req.body.videogameCategorieImage,
        videogame_categorie_id: req.params.videogameCategorieId,
      },
    ];
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).render("update_videogame_categorie", {
        title: "Create videogame categorie",
        errors: errors.array(),
        videogameGenreInformation: videogameCategorieInformations,
        videogameCategorieParams: req.params,
      });
    }

    await db.updateVideogameCategorie(videogameCategorieInformations);
    let videogameCategories = await db.getAllVideogamesCategories();

    res.redirect("/videogame_categorie");
    res.render("view_all_videogames_categories", {
      videogameCategories: videogameCategories,
    });
  }),
];

getDeleteVideogameCategorieGet = asyncHandler(async (req, res) => {
  let videogameSpecificGenre = await db.getAllVideogamesWithSpecificGenre(
    req.params.id
  );

  res.render("delete_videogame_categorie", {
    videogameCategorieParams: req.params,
    videogameCategorieLength: videogameSpecificGenre.length,
    videogameInformation: videogameSpecificGenre,
  });
});

//Create deleteVideogameCategorie error messages

const validateDeleteVideogameCategorie = [
  body("password").equals("30").withMessage(`Password ${passwordMessage}`),
];

deleteVideogameCategoriePost = [
  validateDeleteVideogameCategorie,
  asyncHandler(async (req, res) => {
    let videogamesSpecificGenre = await db.getAllVideogamesWithSpecificGenre(
      req.params.id
    );

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).render("delete_videogame_categorie", {
        title: "Delete videogame categorie",
        errors: errors.array(),
        videogameCategorieParams: req.params,
        videogameCategorieLength: videogamesSpecificGenre.length,
        videogameInformation: videogamesSpecificGenre,
      });
    }

    let videogamesSpecificGenreId = [];

    //create videogamesSpecificGenreIndexArray
    for (let i = 0; i < videogamesSpecificGenre.length; i++) {
      videogamesSpecificGenreId.push(videogamesSpecificGenre[i].id);
    }

    await db.deleteVideogameCategorie(req.params.id, videogamesSpecificGenreId);
    let videogameCategories = await db.getAllVideogamesCategories();

    res.redirect("/videogame_categorie");
    res.render("view_all_videogames_categories", {
      videogameCategories: videogameCategories,
    });
  }),
];

module.exports = {
  getAllVideogameCategoriesGet,
  getVideogameCategorieGet,
  getUpdateVideogameCategorieGet,
  updateVideogameCategoriePost,
  getDeleteVideogameCategorieGet,
  deleteVideogameCategoriePost,
};
