const { createNote, getSingleNote } = require('../controllers/note')
const { checkCategoryIsExist } = require('../middelwares/note')

const router = require('express').Router()


router.post('/', [checkCategoryIsExist], createNote)

router.route('/:id')
    // get single note
    .get(getSingleNote)

module.exports = router