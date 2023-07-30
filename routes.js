const express = require("express");
const filmsController = require("./controllers/films.controller.js");

const routes = (app) => {
  app.use(express.json());
  app.use("/films", filmsController);
};

module.exports = routes;
