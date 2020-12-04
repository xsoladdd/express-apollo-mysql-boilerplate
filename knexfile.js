require("dotenv").config();

module.exports = {
  development: {
    client: "mysql2",
    connection: {
      database: process.env.DB_DATABASE,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
      directory: "./config/knex/migrations",
    },
    seeds: {
      directory: "./config/knex/seeds/dev",
    },
  },

  production: {
    client: "mysql2",
    connection: {
      database: process.env.DB_DATABASE,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
      directory: "./config/knex/migrations",
    },
    seeds: {
      directory: "./config/knex/seeds/prod",
    },
  },
};
