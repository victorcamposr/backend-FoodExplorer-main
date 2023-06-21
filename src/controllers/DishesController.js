const DishRepository = require('../repositories/DishRepository');
const DishCreateService = require('../services/dishes/DishCreateService');
const DishUpdateService = require('../services/dishes/DishUpdateService');
const DishIndexService = require('../services/dishes/DishIndexService');
const DishShowService = require('../services/dishes/DishShowService');
const DishDeleteService = require('../services/dishes/DishDeleteService');

class DishesController {
   async create(request, response) {
      const { name, description, category, price, ingredients } = request.body;

      const dishRepository = new DishRepository();
      const dishCreateService = new DishCreateService(dishRepository);

      const dishId = await dishCreateService.execute({ name, description, category, price, ingredients });

      return response.status(201).json({
         dishId,
         message: "Novo prato cadastrado com sucesso!"
      });
   }

   async update(request, response) {
      const { id } = request.params;
      const { name, description, category, price, ingredients } = request.body;

      const dishRepository = new DishRepository();
      const dishUpdateService = new DishUpdateService(dishRepository);

      await dishUpdateService.execute({ id, name, description, category, price, ingredients });

      return response.status(201).json("Prato atualizado com sucesso!");
   }

   async index (request, response) {
      const { dishName } = request.query;

      const dishRepository = new DishRepository();
      const dishIndexService = new DishIndexService(dishRepository);

      const dishesData = await dishIndexService.execute({ dishName });

      return response.json(dishesData);
   }

   async show(request, response) {
      const { id } = request.params;

      const dishRepository = new DishRepository();
      const dishShowService = new DishShowService(dishRepository);

      const dishData = await dishShowService.execute({ id });

      return response.json(dishData);
   }

   async delete(request, response) {
      const { id } = request.params;

      const dishRepository = new DishRepository();
      const dishDeleteService = new DishDeleteService(dishRepository);

      await dishDeleteService.execute({ id });

      return response.status(200).json("Prato deletado com sucesso!");
   }
}

module.exports = DishesController;