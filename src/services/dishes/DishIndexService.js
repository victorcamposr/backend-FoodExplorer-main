const AppError = require("../../utils/AppError");

class DishIndexService {
   constructor(dishRepository) {
      this.dishRepository = dishRepository;
   }

   async execute({ dishName }) {
      const dishesData = await this.dishRepository.index({ dishName });

      if (dishesData.length <= 0) {
         throw new AppError("Nenhum prato foi encontrado!");
      }

      return dishesData;
   }
}

module.exports = DishIndexService;