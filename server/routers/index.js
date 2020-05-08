const router = require('express').Router()
const UserController = require('../controllers/userController')
const taskRouter = require('./task')

router.get('/', (req,res) => {
    res.send('Masuk di index js')
})
router.post('/login', UserController.login)
router.post('/register', UserController.register)
router.post('/googlesign', UserController.googleSignIn)
router.use('/task', taskRouter)

module.exports = router