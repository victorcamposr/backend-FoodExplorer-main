exports.seed = async (knex) => {

  await knex('roles').del();

  await knex('roles').insert([
    {name: "Admin", description: "Can access the all pages of app"},
    {name: "User", description: "Can access the all pages user of app"},
  ]);
};
