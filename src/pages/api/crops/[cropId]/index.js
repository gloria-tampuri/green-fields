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
    if (req.method === 'PATCH') {
        try {
            const crop = req.body;
            const cropsCollection = await connectToDatabase()
            const { cropId } = req.query
            await cropsCollection.updateOne({ _id: ObjectId(cropId) }, { $set: { ...crop, updatedAt: new Date() } })
            res.status(200).json({ message: "Crop updated successfully" })
        } catch (error) {
           
            res.status(500).json({ status: 500, message: "Something went wrong" })
        }
    }
    if (req.method === 'GET') {
        try {
            const cropsCollection = await connectToDatabase()
            const { cropId } = req.query
            const crop = await cropsCollection.findOne({ _id: ObjectId(cropId) });
            res.status(200).json({ status: 200, crop: crop })
        } catch (error) {
            res.status(500).json({ status: 500, message: "Something went wrong" })
        }

    }
    if (req.method === 'DELETE') {
        try {
            const cropsCollection = await connectToDatabase()
            const { cropId } = req.query
            await cropsCollection.deleteOne({ _id: ObjectId(cropId) });
            res.status(200).json({ message: "Crop deleted!", status: 200 })
        } catch (error) {
            res.status(500).json({ status: 500, message: "Something went wrong" })
        }
    }
}