const router = require('express').Router()
const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')
const TaskController = require('../controllers/taskController')

router.use(authentication)
router.get('/', TaskController.show)
router.post('/', TaskController.post)
router.put('/:id', authorization, TaskController.editTask)
router.patch('/:id', authorization, TaskController.editCategory)
router.delete('/:id', authorization, TaskController.delete)

module.exports = router