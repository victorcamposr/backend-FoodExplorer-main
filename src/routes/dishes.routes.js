const { Router } = require('express');

const DishesController = require('../controllers/DishesController');
const DishImageController = require('../controllers/DishImageController');
const dishesController = new DishesController();
const dishImageController = new DishImageController();
const ensuredAuthenticated = require('../middlewares/ensuredAuthenticated');
const whoCanAccess = require('../middlewares/ensuredPermissions');
const multer = require('multer');
const multerConfig = require('../config/upload');

const dishesRoutes = new Router();
const upload = multer(multerConfig.MULTER);

dishesRoutes.post("/create-dish", ensuredAuthenticated, whoCanAccess(["Admin"]), dishesController.create);
dishesRoutes.put("/update-dish/:id", ensuredAuthenticated, whoCanAccess(["Admin"]), dishesController.update);

dishesRoutes.patch("/update-dish-image/:id", ensuredAuthenticated, whoCanAccess(["Admin"]), upload.single("dishImage"), dishImageController.update);

dishesRoutes.delete("/delete-dish/:id", ensuredAuthenticated, whoCanAccess(["Admin"]), dishesController.delete);

dishesRoutes.get("/index-dishes", ensuredAuthenticated, dishesController.index);
dishesRoutes.get("/show-dish/:id", ensuredAuthenticated, dishesController.show);


module.exports = dishesRoutes;