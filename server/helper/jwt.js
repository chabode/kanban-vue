const jwt = require('jsonwebtoken')
const secret_key = 'kanbankampai'

let getToken = (user) => {
    let token = jwt.sign({
        id : user.id, email : user.email
    }, secret_key)
    return token
}

let verifyToken = (token) => {
    let decoded = jwt.decode(token, secret_key)
    return decoded
}

module.exports = {
    getToken,
    verifyToken
}