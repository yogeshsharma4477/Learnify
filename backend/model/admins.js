

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const adminSchema = new Schema({
    "username": String,
    "password": String,
    "email": String,
    "phone": String,
    "role":String,
    created_at: {
        type: Date,
        default: Date.now,
    }
    // purchasedCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'course' }]
}, { collection: 'admins', db: 'learnify' });

const Admin = mongoose.model('admins', adminSchema);

module.exports = Admin;