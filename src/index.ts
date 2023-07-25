import express from "express";
import { config } from "dotenv";
import cors from "cors";
import { getCars, storeCars } from "./app/controllers/controllerCars";
import { mongoClient } from "./database/mongo";
import { getLogs } from "./app/controllers/controllerLogs";

const main = async () => {
  config();
  const port = process.env.PORT || 8000;

  const app = express();
  app.use(cors());
  app.use(express.json());

  await mongoClient.connect();

  app.get("/listCars", getCars);
  app.post("/createCar", storeCars);

  app.get("/logs", getLogs);

  app.listen(port, () => console.log(`running on port ${port}!`));
};

main();
