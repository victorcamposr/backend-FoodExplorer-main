const UserRepository = require('../repositories/UserRepository');
const SessionCreateService = require('../services/SessionCreateService');

class SessionsController {
   async create(request, response) {
      const { email, password } = request.body;

      const userRepository = new UserRepository();
      const sessionCreateService = new SessionCreateService(userRepository);

      const userWithToken = await sessionCreateService.execute({ email, password });
      
      return response.json(userWithToken);
   }
}

module.exports = SessionsController;