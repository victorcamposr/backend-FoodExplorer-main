const RoleRepository = require('../repositories/RoleRepository');
const RoleCreateService = require('../services/RoleCreateService');

class RolesController {
   async create(request, response) {
      const { name, description } = request.body;

      const roleRepository = new RoleRepository();
      const roleCreateService = new RoleCreateService(roleRepository);

      await roleCreateService.execute({ name, description });

      return response.status(201).json("Função cadastrada com sucesso!");
   }
}

module.exports = RolesController;