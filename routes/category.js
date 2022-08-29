const { createNewCategory } = require('../controllers/category')
const { checkToken } = require('../middelwares/auth')
const router = require('express').Router()

router.post('/', createNewCategory)


module.exports = router