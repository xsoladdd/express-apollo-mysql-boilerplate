exports.up = function (knex) {
  return knex.schema.createTable("todo", (table) => {
    table.increments("id");
    table.string("name", 255).notNullable();
    table.boolean("is_finish").defaultTo(false);
    table.integer("user_id").unsigned().references("id").inTable("users");
    table.datetime("date_created").defaultTo(knex.fn.now());
    table.datetime("date_updated").defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("todo");
};
