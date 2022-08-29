const { createNewCategory, getSingleCategory } = require('../controllers/category')
const { checkToken } = require('../middelwares/auth')
const router = require('express').Router()

// create new category
router.post('/', createNewCategory)

// get singel category
router.get('/:id', getSingleCategory)


module.exports = router