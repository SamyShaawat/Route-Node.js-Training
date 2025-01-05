import { MongoClient } from 'mongodb'

const url = 'mongodb://127.0.0.1:27017';
const client = new MongoClient(url);

const dbName = 'assignment-9.2';

export const db = client.db(dbName);
export const connectionDB = async () => {
  await client.connect()
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((err) => {
      console.log("Error connecting to MongoDB", err);

    })
}