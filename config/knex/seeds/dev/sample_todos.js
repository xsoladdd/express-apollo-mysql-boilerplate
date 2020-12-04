exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("todo")
    .del()
    .then(function () {
      return knex("todo").insert([{ name: "Make Coffee", user_id: 1 }]);
    });
};
