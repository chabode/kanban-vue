const { Task } = require('../models')

function authorization(req,res,next){
    const {id} = req.params
    const userId = req.userData.id

    Task.findByPk(id)
    .then(task => {
        if(!task){
            next({name : `Data Not Found`})
        } else if (task.UserId !== userId){
            next({name : `Forbidden Access`})
        } else {
            next()
        }
    })
    .catch(err => {
        next(err)
    })
}

module.exports = authorization
