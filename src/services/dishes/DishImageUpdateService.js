const AppError = require("../../utils/AppError");

class DishImageUpdateService {
   constructor(dishRepository, diskStorage) {
      this.dishRepository = dishRepository;
      this.diskStorage = diskStorage;
   }

   async execute({ id:dishId, dishImageFilename }) {
      const { dishData, ingredientsData } = await this.dishRepository.show({ dishId });
      
      if (dishData.dishImage) {
         await this.diskStorage.deleteFile(dishData.dishImage);
      }

      const filename = await this.diskStorage.saveFile(dishImageFilename);
      dishData.dishImage = filename;

      await this.dishRepository.updateImage({ dishId, dishData });

      return {
         ...dishData,
         ingredientsData
      };
   }
}

module.exports = DishImageUpdateService;