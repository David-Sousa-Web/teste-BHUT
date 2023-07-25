import { mongoClient } from "../../database/mongo";
import { Request, Response } from "express";
import LogModel from "../models/logmodel";

export const createCarLog = async (carId: string) => {
  try {
    const logData = {
      car_id: carId,
    };
    const logEntry = new LogModel(logData);

    await mongoClient.db.collection("Logs").insertOne(logEntry);

    console.log("Log criado com sucesso para o carro com ID:", carId);
  } catch (error) {
    console.error("Erro ao criar registro de log:", error);
  }
};

export const getLogs = async (req: Request, res: Response) => {
  try {
    const logs = await mongoClient.db.collection("Logs").find({}).toArray();

    res.send(logs);
  } catch (error) {
    console.error("Erro ao obter registros de log:", error);

    return "Erro ao obter registros de log";
  }
};
