const { Router } = require('express');

const IngredientsController = require('../controllers/IngredientsController');
const ingredientsController = new IngredientsController();
const ensuredAuthenticated = require('../middlewares/ensuredAuthenticated');

const ingredientsRoutes = new Router();

ingredientsRoutes.get("/index-ingredients/:dishId", ensuredAuthenticated, ingredientsController.index);
ingredientsRoutes.delete("/delete-ingredient/:name", ensuredAuthenticated, ingredientsController.delete);

module.exports = ingredientsRoutes;