
const mongoose = require('mongoose');
function dbConnect() {
    const databaseURI = `mongodb+srv://yogeshwarsharma4477:${process.env.mongoPassword}@cluster0.bxhfkak.mongodb.net/learnify`;
    mongoose.connect(databaseURI);
    const db = mongoose.connection;
    db.useDb('lernify');
    db.on('connected', () => {
        console.log(`Connected to MongoDB ${db.name}`);
    });

    db.on('error', (err) => {
        console.error(`MongoDB connection error: ${err}`);
    });

    db.on('disconnected', () => {
        console.log('MongoDB connection disconnected');
    });
}

module.exports = { dbConnect }

// const { MongoClient, ServerApiVersion } = require('mongodb');
// require('dotenv').config()
// const uri = `mongodb+srv://yogeshwarsharma4477:${process.env.mongoPassword}@cluster0.bxhfkak.mongodb.net/?retryWrites=true&w=majority`;
// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   }
// });

// async function run() {
//   try {
//     // Connect the client to the server	(optional starting in v4.7)
//     await client.connect();
//     // Send a ping to confirm a successful connection
//     await client.db("admin").command({ ping: 1 });
//     console.log("Pinged your deployment. You successfully connected to MongoDB!");
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }

// async function connect(collectionName){
//     await client.connect();
//     const db = await client.db("courseApp")
//     const collection  = db.collection(collectionName)
//     return collection
// }

// // run().catch(console.dir);
// module.exports = {
//   run,
//   connect,
//   client
// }