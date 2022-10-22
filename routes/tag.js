const { createNewTag, deleteTag, updateTag, getSingleTag, getAllTags, getAllNotesForTag } = require('../controllers/tag')
const { checkToken } = require('../middelwares/auth')

const router = require('express').Router()
router.use(checkToken)

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

router.get('/:id/notes', getAllNotesForTag)


module.exports = router