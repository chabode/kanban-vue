const { User } = require('../models')
const { checkPassword } = require('../helper/bcrypt')
const { getToken } = require('../helper/jwt')

class UserController {
    static register(req, res, next){
        const { email, password } = req.body
        User.create({
            email, password
        })
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            next(err)
        })
    }

    static login(req,res,next){
        const {email,password} = req.body
        User.findOne({
            where: {email:email}
        })
        .then(user => {
            if(!user || !checkPassword(password, user.password)){
                next({status : 400})
            }
            return user
        })
        .then(user => {
            const access_token = getToken(user)
            const email = user.email
            res.status(200).json({access_token,email})
        })
        .catch(err => {
            next(err)
        })
    }
}

module.exports = UserController