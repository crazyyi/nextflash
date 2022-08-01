import connectToDatabase from "../../middleware/connectToDatabase";

async function handler(req, res) {
  let db = await connectToDatabase();
  const { uuid } = req.query
  await db
    .collection("flash_card_data")
    .deleteOne({uuid: uuid}, function(err, obj) {
      if (err) throw err;
      console.log(uuid + " is deleted");
  })

  return res.status(200).json({});
}

export default handler;
