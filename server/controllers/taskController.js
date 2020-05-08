const { Task,User } = require('../models')

class TaskController {
    static show(req,res,next){
        Task.findAll({
            include : [{model:User}]
        })
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            next(err)
        })
    }
    
    static post(req, res, next){
        const UserId = req.userData.id
        const {title, category} = req.body
        Task.create({
            title : title,
            category : category,
            UserId : UserId
        })
        .then(data => {
            res.status(201).json(data)
        })
        .catch(err => {
            next(err)
        }) 
    }

    static editTask(req, res, next){
        const id = req.params.id
        const {title , category} = req.body
        Task.update({
            title : title,
            category : category
        }, {
            where : {id:id}
        })
        .then(data =>{
            if(data == 1){
                res.status(200).json(data)
            } else {
                next({msg:`Data Not Found`})
            }
        })
        .catch(err => {
            next(err)
        })
    }

    static delete(req, res, next){
        const id = req.params.id
        Task.destroy({
            where : {id:id}
        })
        .then(data => {
            if(data == 1){
                res.status(200).json(data)
            } else {
                next({msg:`Data Not Found`})
            }
        })
        .catch(err => {
            next(err)
        })
    }

    static editCategory(req,res, next){
        const id = req.params.id
        const { category } = req.body
        Task.update({
            category:category
        }, {
            where : {id:id}
        })
        .then(data =>{
            if (data == 1){
                res.status(200).json(data)
            } else {
                next({msg : `Data Not Found`})
            }
        })
        .catch(err => {
            next(err)
        })
    }    
}

module.exports = TaskController