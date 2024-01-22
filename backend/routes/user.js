const express = require('express');
const router = express.Router();
const zod = require('zod')
const { JWT_SECRET } = require('../config')
const jwt = require('jsonwebtoken')
const { User } = require('../db')

router.get('/test', (req, res) => {
    res.send("API RUNNING...")
});

const signupBody = zod.object({
    username: zod.string().email(),
    lastName: zod.string(),
    firstName: zod.string(),
    password: zod.string()
})

router.post("/signup", async (req, res) => {
    const { success } = await signupBody.safeParseAsync(req.body);

    if (!success) {
        return res.status(411).json({ "message": "Sucess NOT Email already Taken / Invalid Input" });
    }
    const existingUser = await User.findOne({ username: req.body.username });
    if (existingUser != null) {
        return res.status(411).json({
            "message": " existingUser Email already Taken / Invalid Input"
        })
    }
    const user = await User.create({
        username: req.body.username,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
    })
    const userId = user._id;
    const token = jwt.sign({
        userId
    }, JWT_SECRET)
    return res.json({ "message": "User Created Sucessfully", token: token });
})



const signInBody = zod.object({
    username: zod.string().email(),
    password: zod.string()
})

router.post("/signin", (req, res) => {
    const { success } = signInBody.safeParse(req.body)
    if (!success) {
        return res.status(411).json({
            message: "Email already taken/ Inavlid Input"
        });
    }
    const user = User.findOne({ username: req.body.username, password: req.body.password });

    if (user) {
        const token = jwt.sign({ userId: user._id }, JWT_SECRET);
        res.json({
            token: token
        })
        return;
    }
    res.status(411).json({ message: "Error while logging in" });
})

module.exports = router;