import clientPromise from 'lib/mongo';
import { ObjectId } from 'mongodb';

/*Connect to the database
-------------------------------START----------------------------*/
const connectToDatabase = async () => {
    const client = await clientPromise;
    const db = client.db();
    const userCollection = db.collection('users');
    return userCollection;
};
/*------------------------------END-----------------------------*/


export default async function handler(req, res) {
    const userCollection = await connectToDatabase()
    const { userId } = req.query

    if (req.method === 'GET') {
        try {
            const user = await userCollection.findOne({ _id: ObjectId(userId) });
            res.status(200).json({ status: 200, user: user })
        } catch (error) {
            res.status(500).json({ status: 500, message: error })
        }
    } if (req.method === 'PATCH') {
        try {
            const user = req.body;
            const userCollection = await connectToDatabase()
            await userCollection.updateOne({ _id: ObjectId(userId) }, { $set: user })
            res.status(200).json({ message: "User updated successfully" })
        } catch (error) {
            res.status(500).json({ status: 500, message: "Something went wrong" })
        }
    }

}