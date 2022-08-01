import connectToDatabase from "../../middleware/connectToDatabase";

async function handler(req, res) {
  let db = await connectToDatabase();
  let doc = await db
    .collection("flash_card_data")
    .insertOne(
      Object.assign(req.body)
    );
  res.status(201).json(doc);
}

export default handler;
