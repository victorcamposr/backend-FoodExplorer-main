const IngredientsRepository = require('../repositories/IngredientsRepository');
const IngredientsIndexService = require('../services/IngredientsIndexService');
const IngredientsDeleteService = require('../services/IngredientsDeleteService');

class IngredientsController {
   async index(request, response) {
      const { dishId } = request.params;

      const ingredientsRepository = new IngredientsRepository();
      const ingredientsIndexService = new IngredientsIndexService(ingredientsRepository);

      const dishIngredientsData = await ingredientsIndexService.execute({ dishId });

      return response.json(dishIngredientsData);
   }

   async delete(request, response) {
      const { ingredient } = request.params;

      const ingredientsRepository = new IngredientsRepository();
      const ingredientsDeleteService = new IngredientsDeleteService(ingredientsRepository);

      await ingredientsDeleteService.execute({ ingredient });

      return response.json("Ingrediente deletado com sucesso!");
   }
}

module.exports = IngredientsController;