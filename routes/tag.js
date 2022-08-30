const { createNewTag, deleteTag, updateTag, getSingleTag, getAllTags } = require('../controllers/tag')

const router = require('express').Router()

// create new tag
router.post('/', createNewTag)

router.route('/')
    // create new tag
    .post(createNewTag)

    // get all tag
    .get(getAllTags)


router.route('/:id')
    // get tag
    .get(getSingleTag)

    // delete tag
    .delete(deleteTag)

    // update tag
    .patch(updateTag)


module.exports = router