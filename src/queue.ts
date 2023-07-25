import { Queue, Worker } from "bullmq";
import { redisConfig } from "./config/config";
import { sendWebhook } from "./webhook";

export const newCarQueue = new Queue("newCarQueue", {
  connection: redisConfig,
});

new Worker(
  "newCarQueue",
  async (job) => {
    console.log("Dados do novo carro recebidos:", job.data);
    sendWebhook(job.data);
  },
  {
    connection: redisConfig,
  }
);
