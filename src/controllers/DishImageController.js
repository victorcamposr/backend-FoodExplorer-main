const DishRepository = require('../repositories/DishRepository');
const DishImageUpdateService = require('../services/dishes/DishImageUpdateService');
const DiskStorage = require('../providers/DiskStorage');

class DishImageController {
   async update(request, response) {
      const { id } = request.params;
      const dishImageFilename = request.file.filename;

      const dishRepository = new DishRepository();
      const diskStorage = new DiskStorage();
      const dishImageUpdateService = new DishImageUpdateService(dishRepository, diskStorage);

      const dishData = await dishImageUpdateService.execute({ id, dishImageFilename });

      return response.json(dishData);
   }
}

module.exports = DishImageController;