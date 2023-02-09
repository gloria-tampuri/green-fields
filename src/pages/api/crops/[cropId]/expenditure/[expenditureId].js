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
            const cropsCollection = await connectToDatabase()
            const { cropId, expenditureId } = req.query;
            await cropsCollection.updateOne({
                _id: ObjectId(cropId)
            }, {
                $pull: {
                    expenditure: {
                        expenditureId: expenditureId
                    }
                }
            });
            res.status(200).json({ message: "Crop updated successfully" })
        } catch (error) {
            res.status(500).json({ status: 500, message: "Something went wrong" })
        }
    }
}
