exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("users")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("users").insert([
        { first_name: "Ericson", last_name: "Funtanar" },
        { first_name: "Mark", last_name: "Jacob" },
        { first_name: "Takeshi", last_name: "Bacon" },
        { first_name: "Sin", last_name: "Bad" },
        { first_name: "Poppy", last_name: "Rad" },
      ]);
    });
};
