import clientPromise from 'lib/mongo';

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

    if (req.method === 'GET') {
        try {
            const crops = await cropsCollection.find().toArray();
            res.status(200).json({ status: 200, crops: crops })
        } catch (error) {
            res.status(500).json({ status: 500, message: error })
        }
    }
    if (req.method === 'POST') {
        const cropsCollection = await connectToDatabase()
        const crops = req.body;
        try {
            const newCrop = {
                ...crops,
                createdAt: new Date(),
            }
            await cropsCollection.insertOne(newCrop);

            res.status(201).json({ status: 201, message: 'Crop created!' })
        } catch (error) {
            return res.status(500).json({
                status: 500,
                message: 'Something went wrong, please try again',
            });
        }
    }
    if (req.method === "DELETE") {
        const cropsCollection = await connectToDatabase()
        await cropsCollection.deleteMany({});
        res.status(200).json({ status: 200, message: "Crops deleted" })
    }

}