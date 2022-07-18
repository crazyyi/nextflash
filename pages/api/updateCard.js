import connectToDatabase from "../../middleware/connectToDatabase";
import { ObjectId } from "mongodb";
import formidable from "formidable";

export const config = {
  api: {
    bodyParser: false,
  },
};

async function handler(req, res) {
  res.status(200);
  let db = await connectToDatabase();

  const form = new formidable.IncomingForm();

  const { id } = req.query;

  form.parse(req, (err, fields, files) => {
    console.log(err, fields, files);
    const query = { _id: new ObjectId(id) };
    db
    .collection("flash_card_data")
    .updateOne(query, { $set: fields }).then((doc) => {
        console.log(doc)
        res.json(doc)
    })
  });
}

export default handler;
