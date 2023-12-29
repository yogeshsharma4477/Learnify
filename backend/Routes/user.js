const express = require('express')
const router = express.Router()
const { client, connect } = require('../db')
var jwt = require('jsonwebtoken');
const User = require('../model/users');
const ValidCheckMiddleware = require('../Middleware/authToken');
const { z } = require("zod");

const userSchema = z.object({
    username: z.string().max(10),
    password: z.number().min(6),
    email: z.string().email(),
    phone: z.string().length(10)
});

//zod inference
const SignupParams = z.infer < typeof signupInput >

    // User routes
    router.post('/users/signup', async (req, res) => {
        try {
            const { username = "", password = "", email = "", phone = "", purchasedCourses = [] } = req.body
            let userInputCheck = userSchema.safeParse(req.body);
            if (userInputCheck.success) {
                let isUserExist = await User.findOne({ username })
                if (isUserExist) {
                    return res.send({ result: [], message: "username already exists", token: "" })
                } else {
                    const newUser = new User({ username, password, email, phone, purchasedCourses });
                    let saveUser = await newUser.save();
                    var token = jwt.sign({ username, id: saveUser._id }, process.env.PrivateKey, { expiresIn: '1h' });
                    res.cookie("authorization", JSON.stringify(token), {
                        httpOnly: true,
                        maxAge: 1 * 60 * 60 * 1000
                    });
                    return res.send({ success: true, message: "signup success" })
                }
            } else {
                return res.status(411).send({ success: false, message: "Invalid Input" })
            }
        } catch (error) {
            return res.send({ message: error?.message, success: "false" })
        }
    });

router.post('/users/login', async (req, res) => {
    try {
        const { username = "", password = "" } = req.body
        let validateUser = await User.findOne({ username, password })
        if (validateUser) {
            let token = jwt.sign({ username, id: validateUser._id }, process.env.PrivateKey, { expiresIn: '1h' })
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

router.get('/users/courses', async (req, res) => {
    try {
        let courses = await Course.find({})
        return res.send({ message: "success", result: courses, success: true })
    } catch (error) {
        return res.send({ result: error?.message, message: "false" })
    }
});

router.post('/users/courses/:courseId', async (req, res) => {
    try {
        let selectedCourse = await Course.find({ adminId: req.params.courseId })
        return res.send({ result: selectedCourse, message: "Course updated successfully", success: true })
    } catch (error) {
        return res.send({ result: error?.message, message: error.message, success: false })
    }
});

router.put('/users/purchasedCourses', ValidCheckMiddleware("user"), async (req, res) => {
    try {
        let purchasedCourseId = await User.findOne({ _id: req.id })
        let userEnrolledCourese = await Course.find({ _id: { $in: purchasedCourseId.purchasedCourses } })
        return res.send({ result: userEnrolledCourese, message: "fetch course successfully", success: true })
    } catch (error) {
        return res.send({ result: error?.message, message: "false" })
    }
});

router.post('/users/buyCourse', ValidCheckMiddleware("user"), async (req, res) => {
    try {
        await User.findOneAndUpdate({ _id: req.id }, { $push: { purchasedCourses: req.id } })
        return res.send({ message: "Course subscribed successfully", success: true })
    } catch (error) {
        return res.send({ result: error?.message, message: "false" })
    }
})

module.exports = router;