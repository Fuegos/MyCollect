const sendErrorToClient = (res, error, type) => {
    res.status(error).json({ type: `server.error.${type}` })
}

module.exports = {
    sendErrorToClient
}