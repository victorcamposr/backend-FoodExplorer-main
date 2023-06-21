const { hash } = require('bcrypt');
const AppError = require('../../utils/AppError');

class UserCreateService {
   constructor(userRepository) {
      this.userRepository = userRepository;
   }
   
   async execute({ name, email, password, repeatPassword }) {
      if (!name || !email || !password || !repeatPassword) {
         throw new AppError("Todos os campos são obrigatórios!");
      }

      const userExist = await this.userRepository.checkUserExist(email);
      
      if (userExist) {
         throw new AppError("Este E-mail já foi utilizado!");
      }

      if (password !== repeatPassword) {
         throw new AppError("As senhas não conferem!");
      }

      const SALT_ROUNDS = 8;

      const hashedPassword = await hash(password, SALT_ROUNDS);

      const { userId } = await this.userRepository.create({ name, email, password: hashedPassword });
      
      await this.userRepository.linkUserToRole({ userId });
   }
}

module.exports = UserCreateService;