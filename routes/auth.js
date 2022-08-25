const router = require('express').Router()
const { login, signup } = require('../controllers/auth')
const { checkEmailIsExist, checkUsernameIsExist } = require('../middelwares/auth')

router.post('/login', login)
router.post('/signup', [checkEmailIsExist, checkUsernameIsExist], signup)

module.exports = router