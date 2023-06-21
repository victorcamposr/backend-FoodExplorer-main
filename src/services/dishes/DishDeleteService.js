const AppError = require('../../utils/AppError');

class DishDeleteService {
   constructor(dishRepository) {
      this.dishRepository = dishRepository;
   }

   async execute({ id:dishId }) {
      await this.dishRepository.delete({ dishId });
   }
}

module.exports = DishDeleteService;