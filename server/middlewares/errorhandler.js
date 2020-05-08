module.exports = function(err,req,res,next){
    let status
    let code
    if(!err.name){
        console.log(err)
        status = 500
        code = 'Internal Server Error'
    } else if(err.name === 'SequelizeValidationError' || err.status==400){
        status = 400
        code = 'VALIDATION_ERROR'
    } else if (err.name === 'Email has been registered'){
        status = 403
        code = 'VALIDATION ERROR'
    }
    
    res.status(status).json(code)
}