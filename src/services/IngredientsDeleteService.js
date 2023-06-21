class IngredientsDeleteService {
   constructor(ingredientRepository) {
      this.ingredientRepository = ingredientRepository;
   }

   async execute({ ingredient }) {
      await this.ingredientRepository.delete({ ingredient });
   }
}

module.exports = IngredientsDeleteService;