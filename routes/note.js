const { createNote, getSingleNote, deleteNote, updateNote, getNotesWithAllCategories: getNotesForAllCategories } = require('../controllers/note')
const { checkCategoryIsExist } = require('../middelwares/note')

const router = require('express').Router()

// create new note
router.post('/', [checkCategoryIsExist], createNote)

router.route('/:id')
    // get single note
    .get(getSingleNote)

    // delete note
    .delete(deleteNote)

// update note
router.patch('/:id', [checkCategoryIsExist], updateNote)

module.exports = router