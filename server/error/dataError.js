const CODE_ERROR = {
    auth: 401,
    forbidden: 403,
    notFound: 404,
    server: 500  
}

const ERROR = {
    auth: 'auth',
    forbidden: 'forbidden',
    notFound: 'notFound',
    server: 'server'
}

const SUBJECT = {
    auth: 'auth',
    email: 'email',
    data: 'data',
    name: 'name',
    server: 'server',
    block: 'block',
    admin: 'admin',
    item: 'item',
    collection: 'collection'
}

module.exports = {
    CODE_ERROR, ERROR, SUBJECT
}