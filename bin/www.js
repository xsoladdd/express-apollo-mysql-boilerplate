require("dotenv").config();
import "colors";
import app from "../app";
import { applyGraphqlMiddleware } from "../config/apollo_servers/graphql";

// Ap
applyGraphqlMiddleware(app);

app.listen(process.env.PORT, () => {
  console.log(`Up and running at port ${process.env.PORT}`.green);
});
