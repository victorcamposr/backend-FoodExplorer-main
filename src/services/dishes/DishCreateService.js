const AppError = require('../../utils/AppError');

class DishCreateService {
   constructor(dishRepository) {
      this.dishRepository = dishRepository;
   }

   async execute({ name, description, category, price, ingredients }) {

      if (!name || !description || !category || !price || ingredients[0] == null) {
         throw new AppError("Todos os campos são obrigatórios!");
      } else if (price <= 0) {
         throw new AppError("O valor do prato deve ser maior que 0.00 R$");
      }

      price = price.replace(",", ".");

      const dishId = this.dishRepository.create({ name, description, category, price, ingredients });

      return dishId;
   }

}

module.exports = DishCreateService;