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
            const equipmentsCollection = await connectToDatabase()
            const { equipmentId, miscellaneousId } = req.query;
            await equipmentsCollection.updateOne({
                _id: ObjectId(equipmentId)
            }, {
                $pull: {
                    miscellaneous: {
                        miscellaneousId: miscellaneousId
                    }
                }
            });
            res.status(200).json({ message: "equipment updated successfully" })
        } catch (error) {
            res.status(500).json({ status: 500, message: "Something went wrong" })
        }
    }
}
