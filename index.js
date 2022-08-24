const config = require('./utils/config')

const express = require('express')
const app = express()

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }))

// auth
const authRouter = require('./routes/auth.js')
app.use('/api/v1/auth', authRouter)

app.get('/', (req, res) => {
    res.send('Hello world')
})

app.get('*', (req, res) => {
    res.status(404).json({
        success: false,
        code: 404,
        msg: 'Not found !'
    })
})

app.post('*', (req, res) => {
    res.status(404).json({
        success: false,
        code: 404,
        msg: 'Not found !'
    })
})

app.listen(config.port, () => console.log(`App is listening to port http://localhost:${config.port}/`))