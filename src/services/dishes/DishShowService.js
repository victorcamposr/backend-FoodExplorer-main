const AppError = require('../../utils/AppError');

class DishShowService {
   constructor(dishRepository) {
      this.dishRepository = dishRepository;
   }

   async execute({ id:dishId }) {
      const { dishData, ingredientsData } = await this.dishRepository.show({ dishId });

      if (!dishData) {
         throw new AppError("O prato não foi encontrado!");
      }

      dishData.price = String(dishData.price).replace(".", ",");

      return {
         ...dishData,
         ingredientsData
      };
   }
}

module.exports = DishShowService;