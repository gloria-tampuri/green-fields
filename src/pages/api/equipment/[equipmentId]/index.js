import clientPromise from 'lib/mongo';
import { ObjectId } from 'mongodb';

/*Connect to the database
-------------------------------START----------------------------*/
const connectToDatabase = async () => {
    const client = await clientPromise;
    const db = client.db();
    const equipmentsCollection = db.collection('equipments');
    return equipmentsCollection;
};
/*------------------------------END-----------------------------*/

export default async function handler(req, res) {
    if (req.method === 'PATCH') {
        try {
            const equipment = req.body;
            const equipmentsCollection = await connectToDatabase()
            const { equipmentId } = req.query
            await equipmentsCollection.updateOne({ _id: ObjectId(equipmentId) }, { $set: { ...equipment, updatedAt: new Date() } })
            res.status(200).json({ message: "equipment updated successfully" })
        } catch (error) {
           
            res.status(500).json({ status: 500, message: "Something went wrong" })
        }
    }
    if (req.method === 'GET') {
        try {
            const equipmentsCollection = await connectToDatabase()
            const { equipmentId } = req.query
            const equipment = await equipmentsCollection.findOne({ _id: ObjectId(equipmentId) });
            res.status(200).json({ status: 200, equipment: equipment })
        } catch (error) {
            res.status(500).json({ status: 500, message: "Something went wrong" })
        }

    }
    if (req.method === 'DELETE') {
        try {
            const equipmentsCollection = await connectToDatabase()
            const { equipmentId } = req.query
            await equipmentsCollection.deleteOne({ _id: ObjectId(equipmentId) });
            res.status(200).json({ message: "Equipment deleted!", status: 200 })
        } catch (error) {
            res.status(500).json({ status: 500, message: "Something went wrong" })
        }
    }
}