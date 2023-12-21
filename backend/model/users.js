const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
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
});

const User = mongoose.model('users', userSchema);

module.exports = User;