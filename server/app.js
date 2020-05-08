require('dotenv').config()
const express = require('express')
const app = express()
const PORT = 3000 || process.env.PORT
const cors = require('cors')
const ErrorHandler = require('./middlewares/errorhandler')
const router = require('./routers')

app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cors())
app.use(router)
app.use(ErrorHandler)


app.listen(PORT, () => {
    console.log(`listen to port ${PORT}`)
})
