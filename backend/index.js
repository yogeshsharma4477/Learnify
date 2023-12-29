const bodyParser = require('body-parser');
const expess = require('express')
const cors = require('cors')
const userRoute = require('./Routes/user')
const adminRoute = require('./Routes/admin')
const { dbConnect } = require('./db')
require('dotenv').config()
const cluster = require('node:cluster');
const cookieParser = require('cookie-parser')
const os = require("os")
const app = expess()

app.use(bodyParser.json())
app.use(cors({ origin: process.env.ORIGIN_ACCESS.split(',') || [], methods: ["GET", "POST"], credentials: true, }));
app.use(cookieParser())

if (cluster.isPrimary) {
    for (let i = 0; i < os.cpus().length; i++) {
        cluster.fork();
    }
} else {
    dbConnect()
    app.use(userRoute)
    app.use(adminRoute)

    app.listen(3001, () => {
        console.log("course app server started pid : " + process.pid);
    })
}