import clientPromise from 'lib/mongo';

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

    if (req.method === 'GET') {
        try {
            const users = await userCollection.find().toArray();
            res.status(200).json({ status: 200, users: users })
        } catch (error) {
            res.status(500).json({ status: 500, message: error })
        }
    }

}