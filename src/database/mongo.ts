import { MongoClient as Mongo, Db } from "mongodb";

export const mongoClient = {
  client: undefined as unknown as Mongo,
  db: undefined as unknown as Db,

  async connect(): Promise<void> {
    const url =
      process.env.MONGODB_URL_ATLAS ||
      "mongodb+srv://bhut-test.ssrpiuk.mongodb.net";
    const username = process.env.MONGODB_USERNAME_ATLAS;
    const password = process.env.MONGODB_PASSWORD_ATLAS;

    const client = new Mongo(url, { auth: { username, password } });
    const db = client.db("bhut-test");

    this.client = client;
    this.db = db;

    console.log("connected to mongodb!");
  },
};
