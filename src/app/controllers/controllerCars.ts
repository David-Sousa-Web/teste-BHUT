import { api } from "../../lib/api";
import { Request, Response } from "express";
import { AxiosError, isAxiosError } from "axios";
import { createCarLog } from "./controllerLogs";
import { newCarQueue } from "../../queue";

export const getCars = async (req: Request, res: Response) => {
  const response = await api.get("/cars");

  try {
    res.send(response.data);
  } catch (error) {
    res.status(500).send("Erro ao obter a lista de carros.");
  }
};

export const storeCars = async (req: Request, res: Response) => {
  const { title, brand, price, age } = req.body;

  try {
    const newCar = await api.post("/cars", {
      title: title,
      brand: brand,
      price: price,
      age: age,
    });

    res.send(newCar.data);

    await createCarLog(newCar.data._id);

    await newCarQueue.add("newCar", newCar.data);
  } catch (error) {
    if (isAxiosError(error)) {
      const axiosError = error as AxiosError;

      if (axiosError.response) {
        const statusCode = axiosError.response.status;
        const errorMessage = axiosError.response.data;

        res.status(statusCode).json({ error: errorMessage });
      } else {
        res.status(500).send("Erro ao criar um novo carro.");
      }
    } else {
      res.status(500).send("Erro ao criar um novo carro.");
    }
    console.log(error);
  }
};
