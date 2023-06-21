const AppError = require('../utils/AppError');

function whoCanAccess (acceptRole) {
   return async (request, response, next) => {
      const { role } = request.user;

      const roles = [role];
   
      const roleExists = roles.some((role) => acceptRole.includes(role));

      if (!roleExists) {
         throw new AppError("Apenas o administrador pode acessar está página! ", 401);
      }

      next();
   }
}

module.exports = whoCanAccess;