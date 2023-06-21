const knex = require('../database/knex');

class UserRepository {
   async checkUserExist(email) {
      const userExist = await knex("users").where({ email }).first();

      return userExist;
   };

   async create({ name, email, password }) {
      let userId = await knex("users").insert({ name, email, password });

      userId = userId[0];

      return { userId };
   };

   async linkUserToRole({ userId }) {

      const checkUsers = await knex("users");
      const nameRole = checkUsers.length === 1 ? "Admin" : "User";

      const { id: roleId } = await knex("roles").where({ name: nameRole }).first();
      
      await knex("users_roles").insert({ userId, roleId });
   };

   async findUserRole(email) {
      const { id:userId } = await knex("users").where({ email }).first();
      const { name:userRole } = await knex.from("users_roles").innerJoin("roles", "roleId", "id").where({ userId }).first();
      
      return userRole;
   };

   async show({ userId }) {
      const userData = await knex("users").where({ id: userId }).first();

      return userData;
   };
};

module.exports = UserRepository;