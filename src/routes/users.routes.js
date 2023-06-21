const { Router } = require('express');

const ensuredAuthenticated = require('../middlewares/ensuredAuthenticated');
const UsersController = require('../controllers/UsersController');
const usersController = new UsersController();

const usersRoutes = Router();

usersRoutes.post("/create-user", usersController.create);
usersRoutes.get("/show-user", ensuredAuthenticated, usersController.show);

module.exports = usersRoutes;