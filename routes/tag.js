const { createNewTag, deleteTag } = require('../controllers/tag')

const router = require('express').Router()

// create new tag
router.post('/', createNewTag)

router.route('/:id')
    // delete tag
    .delete(deleteTag)


module.exports = router