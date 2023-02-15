import clientPromise from 'lib/mongo';

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
    const equipmentsCollection = await connectToDatabase()

    if (req.method === 'GET') {
        try {
            const equipments = await equipmentsCollection.find().toArray();
            res.status(200).json({ status: 200, equipments: equipments })
        } catch (error) {
            res.status(500).json({ status: 500, message: error })
        }
    }
    if (req.method === 'POST') {
        const equipmentsCollection = await connectToDatabase()
        const equipments = req.body;
        try {
            const newCrop = {
                ...equipments,
                createdAt: new Date(),
            }
            await equipmentsCollection.insertOne(newCrop);

            res.status(201).json({ status: 201, message: 'Equipment created!' })
        } catch (error) {
            return res.status(500).json({
                status: 500,
                message: 'Something went wrong, please try again',
            });
        }
    }
    
    if (req.method === "DELETE") {
        const equipmentsCollection = await connectToDatabase()
        await equipmentsCollection.deleteMany({});
        res.status(200).json({ status: 200, message: "Equipments deleted" })
    }

}