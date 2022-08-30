const { createNewTag, deleteTag, updateTag } = require('../controllers/tag')

const router = require('express').Router()

// create new tag
router.post('/', createNewTag)

router.route('/:id')
    // delete tag
    .delete(deleteTag)

    // update tag
    .patch(updateTag)


module.exports = router