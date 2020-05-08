const { verifyToken } = require('../helper/jwt')

function authentication(req,res, next){
    const { access_token } = req.headers

    if(!access_token){
        res.status(500).json({msg : `No Token Detected`})
    }
    try{
        let decoded = verifyToken(access_token) 
        req.userData = decoded
        next()
    }
    catch (err){
        next(err)
        res.status(500).json(err)
    }
}

module.exports = authentication