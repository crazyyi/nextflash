import { MongoClient } from "mongodb";
let cachedDb = null;

export default async function connectToDatabase() {
  if (cachedDb) {
    return cachedDb;
  }
  const client = await MongoClient.connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const db = await client.db(process.env.DB_NAME);

  cachedDb = db;
  return db;
}
