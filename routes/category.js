const { createNewCategory, getSingleCategory, updateCategory } = require('../controllers/category')
const { checkToken } = require('../middelwares/auth')
const router = require('express').Router()

// create new category
router.post('/', createNewCategory)

router.route('/:id')
    // get singel category
    .get(getSingleCategory)

    // update category
    .patch(updateCategory)


module.exports = router