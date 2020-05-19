module.exports = function(err,req,res,next){
    let status
    let code
    let message = []
    if(!err.name){
        console.log(err)
        status = 500
        code = 'Internal Server Error'
    } else if(err.name === 'SequelizeValidationError' || err.status==400){
        status = 400
        for (let i = 0; i<err.errors.length; i++){
            message.push(err.errors[i].message)
        }
        code = message.join(', ')
    } else if (err.name === 'Email has been registered'){
        status = 403
        code = 'Your email already been registered'
    }
    
    res.status(status).json(code)
}