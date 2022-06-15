const express = require('express')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const User = require('../models/user')
//const verifyJWT = require('../verifyJWT')

require('dotenv').config()

const router = express.Router()

const getUserByName = async name => await User.findOne({ name })

const getUserByEmail = async email => await User.findOne({ email })

const setDateLoginUser = async user => await User.findByIdAndUpdate(user._id, {dateLogin: new Date()})

const comparePassword = async user => await bcrypt.hash(user.password, 10)

const authenticateUser = (res, user) => {
    const payload = {
        id: user._id
    }

    jwt.sign(
        payload,
        process.env.JWT_SECRET,
        {expiresIn: 86400},
        (err, token) => {
            if(err) {
                console.error(err)
                return res.status(401).json({ message: "Error authentication"})
            }
            return res.json({
                email: user.email,
                name: user.name,
                token: "Bearer " + token
            })
        }
    )
}

router.post('/api/auth/registration', async (req, res) => {
    const user = req.body
    try {
        if(await getUserByName(user.name)) {
            return res.status(403).json({ message: "This name has took"})
        }
        if(await getUserByEmail(user.email)) {
            return res.status(403).json({ message: "This email has took" })
        }
        user.password = await comparePassword(user)
        User.create(user).then(createdUser => {
            setDateLoginUser(createdUser)
            return authenticateUser(res, createdUser)
        })
    } catch(e) {
        console.error(e)
        return res.status(500).json({ message: "Error server" })
    }
})

module.exports = router