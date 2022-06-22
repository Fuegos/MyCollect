const { CODE_ERROR, ERROR, SUBJECT } = require('../error/dataError')
const { sendErrorToClient } = require('../error/handlerError')

const checkAdmin = (req, res, next) => {
    if(req.user.role === 'admin') {
        next()
    } else {
        return sendErrorToClient(res, CODE_ERROR.forbidden, `${ERROR.forbidden}.${SUBJECT.admin}`)
    }
}


module.exports = checkAdmin