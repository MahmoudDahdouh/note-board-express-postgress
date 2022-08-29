const { createNote, getSingleNote, deleteNote } = require('../controllers/note')
const { checkCategoryIsExist } = require('../middelwares/note')

const router = require('express').Router()


router.post('/', [checkCategoryIsExist], createNote)

router.route('/:id')
    // get single note
    .get(getSingleNote)

    // delete note
    .delete(deleteNote)

module.exports = router