const { authUser } = require('../auth/auth')
const { CODE_ERROR, ERROR, SUBJECT } = require('../error/dataError')
const { sendErrorToClient } = require('../error/handlerError')


const checkAuth = async (req, res, next) => {
    const token = req.headers["x-access-token"]?.split(' ')[1]
    if(token) {
        const user = await authUser(token)
        if(user.error) {
            return sendErrorToClient(res, user.error, user.type)
        }
        req.user = user
        next()
    } else {
        return sendErrorToClient(res, CODE_ERROR.auth, `${ERROR.auth}.${SUBJECT.auth}`)
    }
}

module.exports = checkAuth