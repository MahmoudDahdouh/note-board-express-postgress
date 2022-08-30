const config = require('./utils/config')

const express = require('express')
const app = express()

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }))

// auth
const authRouter = require('./routes/auth.js')
app.use('/api/v1/auth', authRouter)

// note
const noteRouter = require('./routes/note')
app.use('/api/v1/note', noteRouter)

// category
const categoryRouter = require('./routes/category.js')
app.use('/api/v1/category', categoryRouter)

// tag
const tagRouter = require('./routes/tag.js')
app.use('/api/v1/tag', tagRouter)

// index page
app.get('/', (req, res) => {
    res.send('Hello world')
})

app.all('*', (req, res) => {
    res.status(404).json({
        success: false,
        code: 404,
        msg: 'Not found !'
    })
})


app.listen(config.port, () => console.log(`App is listening to port http://localhost:${config.port}/`))