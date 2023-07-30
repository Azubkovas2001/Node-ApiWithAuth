const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth");
const films = [
  {
    id: 1,
    category: "siaubo",
    price: 20,
  },
  {
    id: 2,
    category: "siaubo",
    price: 10,
  },
  {
    id: 3,
    category: "veiksmo",
    price: 310,
  },
  {
    id: 4,
    category: "veiksmo",
    price: 210,
  },
];
router.get("/", (req, res) => {
  const priceFrom = parseInt(req.query.priceFrom);
  const priceUnder = parseInt(req.query.priceUnder);
  const category = req.query.category;

  let filteredFilms = films;

  if (category) {
    filteredFilms = filteredFilms.filter((film) => film.category === category);
  }

  if (priceFrom) {
    filteredFilms = filteredFilms.filter((film) => film.price >= priceFrom);
  }
  if (priceUnder) {
    filteredFilms = filteredFilms.filter((film) => film.price < priceUnder);
  }

  res.send(filteredFilms);
});

router.patch("/:id", authMiddleware, (req, res) => {
  const updatedFilm = req.body;
  const filmId = Number(req.params.id);
  const filmIndex = films.findIndex((film) => film.id === filmId);

  if (filmIndex !== -1) {
    films[filmIndex] = {
      ...films[filmIndex],
      ...updatedFilm,
    };
    res.send(films[filmIndex]);
  } else {
    res.status(404).send("Film not found");
  }
});

router.delete("/:id", authMiddleware, (req, res) => {
  const filmId = Number(req.params.id);
  const filmIndex = films.findIndex((f) => f.id === filmId);
  if (filmIndex === -1) {
    return res.status(404).json({ error: "Film not found" });
  }

  const deletedFilm = films.splice(filmIndex, 1);

  res.send(deletedFilm[0]);
});
module.exports = router;
