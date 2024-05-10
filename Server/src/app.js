import "dotenv/config";

import express from "express";
import allRoutes from "./routers/index.js";
import sequelize, { connectDB } from "./db/config.js";
import dbInit from "./db/init.js";
import AuthenticateMiddleware from "./middleware/authenticate.js";
import Mongodb from "./db2/config.js";
import cors from "cors";

const PORT = process.env.PORT;

const app = express();
connectDB();

dbInit()
  .then(() => console.log("DB synced"))
  .catch((err) => console.log("Db not synced", err));

// Mongodb();

app.use(express.json());

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.use("/", allRoutes);

app.listen(PORT, (err) => {
  if (!err) {
    console.log(`Server started at http://localhost: ${PORT}`);
  } else {
    console.log("Something Bad Happens while starting the server");
  }
});

export default app;
