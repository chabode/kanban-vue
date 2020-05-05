const express = require('express')
const app = express()
const PORT = 3000
const cors = require('cors')

app.use(express.urlencoded({extended:true}))
app.use(cors())

app.listen(PORT, () => {
    console.log(`listen to port ${PORT}`)
})
