const express = require('express')
const cors = require('cors')
require('dotenv').config()
const rateLimiter = require('express-rate-limit')

const app = express()
app.use(cors())


const PORT = process.env.PORT || 5000

//RATING: KEEPS THE USERS FROM SPAMMING URL
const limiter = rateLimiter({
    windowMs: 10 * 60 * 1000, //10 MINS
    max: 10
})
app.use(limiter)
app.set('trust proxy', 1)
app.use('/', require('./route'))

app.listen(PORT, () => console.log(`listening at ${PORT}`))


