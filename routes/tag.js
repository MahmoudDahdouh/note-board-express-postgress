const { createNewTag, deleteTag, updateTag, getSingleTag } = require('../controllers/tag')

const router = require('express').Router()

// create new tag
router.post('/', createNewTag)

router.route('/:id')
    // get tag
    .get(getSingleTag)

    // delete tag
    .delete(deleteTag)

    // update tag
    .patch(updateTag)


module.exports = router