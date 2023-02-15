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
    if(req.method === 'GET'){
       try {
        const year = await equipmentsCollection.distinct("year")
        res.status(200).json(year)
       } catch (error) {
        res.status(500).json({status: 500,message: 'An error occurred.'})
       }
    }
}