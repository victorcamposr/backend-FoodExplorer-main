exports.up = knex => knex.schema.createTable("users_roles", table => {

   table.integer("userId").references("id").inTable("users").onDelete("CASCADE");
   table.integer("roleId").references("id").inTable("roles");

   table.timestamp("created_at").defaultTo(knex.fn.now());

});

exports.down = knex => knex.schema.dropTable("users_roles");
