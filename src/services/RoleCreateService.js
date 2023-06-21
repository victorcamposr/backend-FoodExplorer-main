const AppError = require('../utils/AppError');

class RoleCreateService {
   constructor (roleRepository) {
      this.roleRepository = roleRepository;
   }

   async execute({ name, description }) {
      if (!name || !description) {
         throw new AppError("Todos os campos são obrigatórios!");
      }

      const roleExist = await this.roleRepository.checkRoleExist({ name });
      
      if (roleExist) {
         throw new AppError("Está função já existe!");
      }

      await this.roleRepository.create({ name, description });
   }
}

module.exports = RoleCreateService;