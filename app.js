require("dotenv").config();

const path = require("node:path");
const express = require("express");
const app = express();
const indexRouter = require("./routes/indexRouter");
const videogameRouter = require("./routes/videogameRouter");
const videogameCategorieRouter = require("./routes/videogameCategorieRouter");
const assetsPath = path.join(__dirname, "public");

app.use(express.static(assetsPath));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use("/", indexRouter);
app.use("/videogame", videogameRouter);
app.use("/videogame_categorie", videogameCategorieRouter);

const PORT = process.env.PORT || 8080;
app.listen(process.env.PORT, () =>
  console.log(`Express app listening on port ${PORT}!`)
);
