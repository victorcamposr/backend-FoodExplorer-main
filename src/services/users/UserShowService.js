const AppError = require('../../utils/AppError');

class UserShowService {
   constructor(userRepository) {
      this.userRepository = userRepository;
   }
   
   async execute(userId) {

      const userData = await this.userRepository.show({ userId });
      
      if (!userData) {
         throw new AppError(" O Usuário não foi encontrado! ");
      }
      
      return userData;
   }
}

module.exports = UserShowService;