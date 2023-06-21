const { compare } = require('bcrypt');
const { sign } = require('jsonwebtoken');

const Jwt = require('../config/auth');
const AppError = require('../utils/AppError');

class SessionCreateService {
   constructor(userRepository) {
      this.userRepository = userRepository;
   }

   async execute({ email, password }) {
      let user = await this.userRepository.checkUserExist(email);

      if (!user) {
         throw new AppError(" E-mail não está vinculado a um cadastro! ", 401);
      }

      const matchedPassword = await compare(password, user.password);
      
      if (!matchedPassword) {
         throw new AppError(" E-mail e/ou senha incorretos! ", 401);
      }

      const { secret, expiresIn } = Jwt.Config();
      
      const userRole = await this.userRepository.findUserRole(email);

      const token = sign({ role: userRole }, secret, {
         subject: String(user.id),
         expiresIn
      });

      user = {
         ...user,
         role: userRole
      };

      return { user, token };
   }
}

module.exports = SessionCreateService;