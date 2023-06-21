const AppError = require('../../utils/AppError');

class DishUpdateService {
   constructor(dishRepository) {
      this.dishRepository = dishRepository;
   }

   async execute({ id:dishId, name, description, category, price, ingredients }) {
      const { dishData, ingredientsData} = await this.dishRepository.show({ dishId });

      if (!dishData) {
         throw new AppError("O prato não foi encontrado!");
      }

      const dishName = name ?? dishData.name;
      const dishDescription = description ?? dishData.description;
      const dishCategory = category ?? dishData.category;
      const dishPrice = price ?? dishData.price;
      
      const ingredientsArray = ingredientsData.map( ingredient => {
         return ingredient.name;
      });

      const dishIngredients = ingredients ?? ingredientsArray;

      await this.dishRepository.update({ dishId, dishName, dishDescription, dishCategory, dishPrice, dishIngredients });
   };
}

module.exports = DishUpdateService;