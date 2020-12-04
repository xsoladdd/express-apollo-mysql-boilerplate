exports.up = function (knex) {
  return knex.schema.createTable("users", function (table) {
    table.increments("id");
    table.string("first_name", 255).notNullable();
    table.string("last_name", 255).notNullable();
    table.datetime("date_created").defaultTo(knex.fn.now());
    table.datetime("date_updated").defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("users");
};
