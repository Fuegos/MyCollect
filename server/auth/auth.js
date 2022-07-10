const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
require('dotenv').config()
const { CODE_ERROR, ERROR, SUBJECT } = require('../error/dataError')
const { getUserById, setDateLoginUser } = require('../mongodb/queries')


const comparePassword = async user => await bcrypt.hash(user.password, 10)

const createToken = async user => {
    try {
        const payload = {
            id: user._id
        }
        const token = await jwt.sign(
            payload,
            process.env.JWT_SECRET,
            {expiresIn: 86400})
        return {
            token: token
        }
    } catch(e) {
        return {
            error: CODE_ERROR.auth,
            type: `${ERROR.auth}.${SUBJECT.auth}`
        }
    }
}

const verifyToken = async token => {
    try {
        const decode = await jwt.verify(token, process.env.JWT_SECRET)
        return {
            id: decode.id
        }
    } catch(e) {
        return {
            error: CODE_ERROR.auth,
            type: `${ERROR.auth}.${SUBJECT.auth}`
        }
    }
}

const createTokenAndAuthUser = async user => {
    const resultCreate = await createToken(user)
    if(resultCreate.error) {
        return resultCreate
    }
    return authUser(resultCreate.token)
}

const authUser = async token => {
    const resultVerify = await verifyToken(token)
    if(resultVerify.error) {
        return resultVerify
    }
    const user = await getUserById(resultVerify.id)
    if(!user) {
        return {
            error: CODE_ERROR.auth,
            type: `${ERROR.auth}.${SUBJECT.auth}`
        }
    }
    if(user.status === 'blocked') {
        return {
            error: CODE_ERROR.forbidden,
            type: `${ERROR.forbidden}.${SUBJECT.block}`
        }
    }
    setDateLoginUser(user)
    return {
        _id: user._id,
        email: user.email,
        name: user.name,
        isAdmin: user.role === 'admin',
        token: "Bearer " + token
    }
}

module.exports = {
    authUser,
    createTokenAndAuthUser,
    comparePassword
}