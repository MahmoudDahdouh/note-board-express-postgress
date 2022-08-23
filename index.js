const config = require('./utils/config')

const express = require('express')
const app = express()

app.get('/', (req, res) => {
    console.log({ config });
    res.json(config)
})

app.listen(config.port, () => console.log(`App is listening to port http://localhost:${config.port}/`))