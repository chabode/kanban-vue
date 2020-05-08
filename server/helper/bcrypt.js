const bcrypt = require('bcryptjs')

let generatePassword = (value) => {
    let salt = bcrypt.genSaltSync(10)
    let hash = bcrypt.hashSync(value, salt)
    return hash
}

let checkPassword = (value, hash) => {
    return bcrypt.compareSync(value, hash)
}

module.exports = {
    generatePassword,
    checkPassword
}