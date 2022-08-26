const { createNote } = require('../controllers/note')
const { checkCategoryIsExist } = require('../middelwares/note')

const router = require('express').Router()


router.post('/', [checkCategoryIsExist], createNote)

module.exports = router