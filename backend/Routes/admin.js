const expess = require('express')
const router = expess.Router()
const { client, connect } = require('../db')
const jwt = require('jsonwebtoken');
const ValidCheckMiddleware = require('../Middleware/authToken');
const Admin = require('../model/admins');
const Course = require('../model/courses');

router.post('/admin/signup', async (req, res) => {
    try {
        const { username = "", password = "", email = "", phone = ""} = req.body
        let isUserExist = await Admin.findOne({ username })
        if (isUserExist) {
            return res.send({ result: [], message: "username already exists", token: "" })
        } else {
            const newAdmin = new Admin({ username, password, email, phone });
            let saveAdmin = await newAdmin.save();
            var token = jwt.sign({ username, id: saveAdmin._id }, process.env.PrivateKey, { expiresIn: '1h' });
            res.cookie("authorization", JSON.stringify(token), {
                httpOnly: true,
                maxAge: 1 * 60 * 60 * 1000
              });
            return res.send({ success: true, message: "signup success" })
        }
    } catch (error) {
        return res.send({ message: error?.message, success: "false" })
    }
});

router.post('/admin/login', async (req, res) => {
    try {
        const name = req.headers['username']
        const password = req.headers['password']
        let validateUser = await Admin.findOne({ username: name, password: password })
        if (validateUser) {
            let token = jwt.sign({ username: name, id: validateUser._id }, process.env.PrivateKey, { expiresIn: '1h' })
            // console.log(token,"token");
            res.cookie("authorization", token, {
                httpOnly: true,
                maxAge: 1 * 60 * 60 * 1000
              });
            return res.send({ success: true, message: "login success" })
        } else {
            return res.send({ success: false, message: "Invalid username or password" })
        }
    } catch (error) {
        return res.send({ result: error.message, message: "false" })
    }
});

router.post('/admin/courses', ValidCheckMiddleware("admin"), async (req, res) => {
    try {
        const { title = "", description = "", price = "", imageLink = "", published = true } = req.body
        const newCourse = new Course({ adminId: req.id, title, description, price, imageLink, published });
        await newCourse.save()
        return res.send({ success: true, message: "Course created successfully" })
    } catch (error) {
        return res.send({ message: error?.message, success: "false" })
    }
});

router.put('/admin/courses/:courseId', ValidCheckMiddleware("admin"), async (req, res) => {
    try {
        const { title = "", description = "", price = "", imageLink = "", published = true } = req.body
        let updateCourse = await Course.findOneAndUpdate({ adminId: req.params.courseId }, { title, description, price, imageLink, published })
        console.log(updateCourse, "updateCourse");
        return res.send({ message: "Course updated successfully" })
    } catch (error) {
        return res.send({ result: error?.message, message: "false" })
    }
});

router.get('/admin/courses', ValidCheckMiddleware("admin"), async (req, res) => {
    try {
        let courses = await Course.find({ "adminId" : req.id})
        return res.send({ message: "success", result: courses, success : true})
    } catch (error) {
        return res.send({ result: error?.message, message: "false" })
    }
});

module.exports = router