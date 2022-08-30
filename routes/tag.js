const { createNewTag } = require('../controllers/tag')

const router = require('express').Router()

// create new tag
router.post('/', createNewTag)


module.exports = router