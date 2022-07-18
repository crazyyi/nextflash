import connectToDatabase from '../../middleware/connectToDatabase';

async function handler(req, res) {
    res.status(200)
    let db = await connectToDatabase()
    let doc = await db.collection('flash_card_data').find({}).limit(30).toArray()
    res.json(doc);
}

export default handler;