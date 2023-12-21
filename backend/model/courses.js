const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const courseSchema = new Schema({
    "adminId": String,
    "title": String,
    "description": String,
    "price": String,
    "imageLink": String,
    "published": Boolean,
    created_at: {
        type: Date,
        default: Date.now,
    }
    // purchasedCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'course' }]
});

const Course = mongoose.model('Courses', courseSchema);

module.exports = Course;