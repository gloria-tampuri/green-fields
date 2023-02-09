import clientPromise from 'lib/mongo';
import { ObjectId } from 'mongodb';

/*Connect to the database
-------------------------------START----------------------------*/
const connectToDatabase = async () => {
    const client = await clientPromise;
    const db = client.db();
    const cropsCollection = db.collection('crops');
    return cropsCollection;
};
/*------------------------------END-----------------------------*/

export default async function handler(req, res) {
    const cropsCollection = await connectToDatabase()
    const {year} = req.query
    if (req.method === 'GET') {
        try {
           const data = await cropsCollection.find({year: year}).toArray()
           res.status(200).json({status: 200, crops: data})
        } catch (error) {
            res.status(500).json({ status: 500, message: error })
        }
    }

}