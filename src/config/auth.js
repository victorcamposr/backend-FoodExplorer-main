class Jwt {
   static Config() {
      return {
         secret: process.env.AUTH_SECRET || "default",
         expiresIn: process.env.AUTH_EXPIRES_IN || "1d",
      }
   };
}

module.exports = Jwt;