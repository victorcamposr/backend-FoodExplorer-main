const { verify } = require('jsonwebtoken');
const AppError = require('../utils/AppError');
const Jwt = require('../config/auth');

function ensuredAuthenticated(request, response, next) {
   
   const authHeader = request.headers.authorization;

   if (!authHeader) {
      throw new AppError("JWT Token não informado!", 401);
   }

   const [, token] = authHeader.split(" ");

   const { secret } = Jwt.Config();
   
   try {
      const { role, sub:user_id } = verify(token, secret);

      request.user = {
         id: Number(user_id),
         role: role,
      }

      return next();

   } catch {
      throw new AppError("JWT Token inválido!", 401);
   }
}

module.exports = ensuredAuthenticated;