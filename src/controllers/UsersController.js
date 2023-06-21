const UserRepository = require('../repositories/UserRepository');
const UserCreateService = require('../services/users/UserCreateService');
const UserShowService = require('../services/users/UserShowService');

class UsersController {
   async create(request, response) {
      const { name, email, password, repeatPassword } = request.body;

      const userRepository = new UserRepository();
      const userCreateService = new UserCreateService(userRepository);

      await userCreateService.execute({ name, email, password, repeatPassword });
      
      return response.status(201).json("Usuário cadastrado com sucesso!");
   }

   async show(request, response) {
      const { id } = request.user;

      const userRepository = new UserRepository();
      const userShowService = new UserShowService(userRepository);

      const userData = await userShowService.execute( id );
      
      return response.status(200).json(userData);
   }
}

module.exports = UsersController;