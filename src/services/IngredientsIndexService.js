class IngredientsIndexService {
   constructor(ingredientRepository) {
      this.ingredientRepository = ingredientRepository;
   }

   async execute({ dishId }) {
      const dishIngredientsData = await this.ingredientRepository.index({ dishId });

      return dishIngredientsData;
   }
}

module.exports = IngredientsIndexService;