const CODE_ERROR = {
    auth: 401,
    forbidden: 403,
    server: 500  
}

const ERROR = {
    auth: 'auth',
    forbidden: 'forbidden',
    server: 'server'
}

const SUBJECT = {
    auth: 'auth',
    email: 'email',
    data: 'data',
    name: 'name',
    server: 'server',
    block: 'block',
    admin: 'admin'
}

module.exports = {
    CODE_ERROR, ERROR, SUBJECT
}