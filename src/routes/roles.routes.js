const { Router } = require('express');

const RolesController = require('../controllers/RolesController');
const rolesController = new RolesController();
const ensuredAuthenticated = require('../middlewares/ensuredAuthenticated');
const whoCanAccess = require('../middlewares/ensuredPermissions');

const rolesRoutes = new Router();

rolesRoutes.post('/', ensuredAuthenticated, whoCanAccess(["Admin"]), rolesController.create);

module.exports = rolesRoutes;