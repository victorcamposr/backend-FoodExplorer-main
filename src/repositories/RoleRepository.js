const knex = require('../database/knex');

class RoleRepository {
   async checkRoleExist({ name }) {
      const roleExist = await knex("roles").where({ name }).first();

      return roleExist;
   }

   async create({ name, description }) {
      await knex("roles").insert({ name, description });
   }
}

module.exports = RoleRepository;