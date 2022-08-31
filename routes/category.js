const { createNewCategory, getSingleCategory, updateCategory, deleteCategory, getAllCategorires, getAllNotesForCategory } = require('../controllers/category')
const { checkToken } = require('../middelwares/auth')
const router = require('express').Router()


router.route('/')
    // create new category
    .post(createNewCategory)

    // get all categories
    .get(getAllCategorires)

router.route('/:id')
    // get singel category
    .get(getSingleCategory)

    // update category
    .patch(updateCategory)

    // delete category
    .delete(deleteCategory)

router.get('/:id/notes', getAllNotesForCategory)

module.exports = router