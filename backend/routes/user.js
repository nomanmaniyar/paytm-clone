const express = require('express');
const router = express.Router();
const zod = require('zod')
const { JWT_SECRET } = require('../config')
const jwt = require('jsonwebtoken')
const { User } = require('../db')



const signupBody = zod.object({
    username: zod.string().email(),
    lastName: zod.string(),
    firstName: zod.string(),
    password: zod.string()
})

router.post("/signup", async (res, req) => {
    const { sucess } = signupBody.safeParse(req.body);
    if (!sucess) {
        return res.stats(411).json({
            message: "Email already Taken / Invalid Input"
        })
    }

    const existingUser = await user.findOne({ username: req.body.username });

    if (!existingUser) {
        return res.stats(411).json({
            message: "Email already Taken / Invalid Input"
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

    res.json({ message: "User Created Sucessfully", token: token });
})



const signInBody = zod.object({
    username: zod.string().email(),
    password: zod.string()
})

router.post("/signin", (req, res) => {
    const { sucess } = signInBody.safeParse(req.body)
    if (!sucess) {
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