const { User } = require('../models')
const { checkPassword } = require('../helper/bcrypt')
const { getToken } = require('../helper/jwt')
const { OAuth2Client } = require('google-auth-library')
const CLIENT_ID = process.env.CLIENT_ID
const client = new OAuth2Client(CLIENT_ID)

class UserController {
    static register(req, res, next){
        const { email, password } = req.body
        
        User.findOne({
            where : {email}
        })
        .then(user => {
            // console.log(user)
            if (user){
                throw({name:`Email has been registered`})
            } else {
                return User.create({ email, password })
            }
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
            where: {email}
        })
        .then(user => {
            if(!user || !checkPassword(password, user.password)){
                next({status : 400})
            } else {
                const access_token = getToken(user)
                const email = user.email
                res.status(200).json({access_token,email})
            }  
        })
        .catch(err => {
            next(err)
        })
    }

    static googleSignIn(req,res, next){
        const { id_token } = req.body
        let currentEmail
        client.verifyIdToken({
            idToken : id_token,
            audience : CLIENT_ID
        })
        .then((ticket) => {
            const payload = ticket.getPayload()
            currentEmail = payload['email']

            return User.findOne({
                where : {email : currentEmail}
            })
        })
        .then(user => {
            if(user){
                const access_token = getToken(user)
                const email = user.email
                res.status(200).json({access_token, email})
                next()
            } else {
                return User.create({ 
                    email : currentEmail, 
                    password : "fromGoogleSignIn"
                })
            }
        })
        .then(newUser => {
            const access_token = generateToken(newUser)
            const email = newUser.email
            res.status(201).json({access_token, email})
        })
        .catch(err => {
            next(err)
        })
    }
}

module.exports = UserController