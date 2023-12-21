const { client, connect } = require('../db')
const jwt = require('jsonwebtoken');
const Admin = require('../model/admins');
const User = require('../model/users');

function AdminMiddleware(role) {
    return async (req, res, next) => {
        const token = req?.cookies?.authorization || req.headers['authorization']
        let decoded = jwt.verify(token, process.env.PrivateKey);
        req.id = decoded.id
        let validateUser = null
        if(role == "admin"){
            validateUser = await Admin.findOne({ username: decoded.username })
        }else{
            validateUser = await User.findOne({ username: decoded.username })
        }
        if (validateUser) {
            next()
        } else {
            return res.send({ message: "Invalid Token" })
        }
    }
}

module.exports = AdminMiddleware