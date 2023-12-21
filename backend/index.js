const bodyParser = require('body-parser');
const expess = require('express')
const { v4: uuidv4 } = require('uuid');
const cors = require('cors')
const userRoute = require('./Routes/user')
const adminRoute = require('./Routes/admin')
// const { run } = require('./db')
require('dotenv').config()
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose');
const app = expess()

app.use(bodyParser.json())
app.use(
    cors({
        origin: process.env.ORIGIN_ACCESS.split(',') || [],
        methods: ["GET", "POST"],
        credentials: true,
    })
);
app.use(cookieParser())


// run().then().catch(e=>console.log(e,"mongo not connected"))
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



app.use(userRoute)
app.use(adminRoute)

app.listen(3001, () => {
    console.log("course app server started");
})