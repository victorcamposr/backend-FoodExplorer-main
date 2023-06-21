exports.up = knex => knex.schema.createTable("dishes", table => {
   table.increments("id");

   table.text("name").notNullable();
   table.text("description").notNullable();
   table.text("category").notNullable();
   table.decimal("price").notNullable();

   table.decimal("dishImage");

   table.timestamp("createdAt").defaultTo(knex.fn.now());
   table.timestamp("updatedAt").defaultTo(knex.fn.now());
});

exports.down = knex => knex.schema.dropTable("dishes");
