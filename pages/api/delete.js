import connectToDatabase from "../../middleware/connectToDatabase";
import { ObjectId } from 'mongodb'

async function handler(req, res) {
  let db = await connectToDatabase();
  const { id } = req.query
  const query = { _id: new ObjectId(id)}
  await db
    .collection("flash_card_data")
    .deleteOne(query, function(err, obj) {
      if (err) throw err;
      console.log(id + " is deleted");
  })

  return res.status(200).json({});
}

export default handler;
