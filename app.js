require("dotenv").config();
import express from "express";
import { Model } from "objection";
// Knex
import knex from "./config/knex";

// Import all Models
import Models from "./Model";

const app = express();
// Initiate Knex file in Objection Model
Model.knex(knex);

app.get("/", (req, res) => {
  if (process.env.NODE_ENV == "production") {
    return res.send(`Welcome `);
  }
  res.json({
    message: "Welcome. To access Playground, please assure to go to /graphql",
    note:
      "Please assure to put the token on authorization header for protected routes",
    format: {
      authorization: "TOken",
    },
  });
});
app.get("/Test", async (req, res) => {
  const { Users } = Models;
  try {
    const data = await Users.query();
    res.json(data);
  } catch (err) {
    console.error(err);
  }
});

export default app;
