import { MongoClient } from "mongodb";
import { uri } from '../config/database.config'

let cachedDb = null;

export default async function connectToDatabase() {
  if (cachedDb) {
    return cachedDb;
  }
  const client = await MongoClient.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const db = await client.db("NextFCDB");

  cachedDb = db;
  return db;
}
