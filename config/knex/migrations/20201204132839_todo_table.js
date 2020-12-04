exports.up = function (knex) {
  return knex.schema.createTable("todo", (table) => {
    table.increments("id");
    table.string("name", 255).notNullable();
    table.boolean("is_finish").defaultTo(false);
    table.integer("user_id").notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("todo");
};
