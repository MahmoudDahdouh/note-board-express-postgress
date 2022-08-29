const pool = require('../db/connect')
const quires = require('../db/queries')
const { validateEmail } = require('../utils/HelperFunctions')

// error response
const errorResponse = {
    success: false,
    code: 500,
    msg: 'Something went wrong, Try again later !'
}

// check if there is valid token
const checkToken = (req, res, next) => {

}

// check if the email is already exist in database
const checkEmailIsExist = (req, res, next) => {
    const { email } = req.body

    const errors = []

    // email
    if (!email) {
        errors.push('Email is required !')
    }

    if (email && !validateEmail(email.trim())) {
        errors.push('Email is invalid !')
    }

    if (email && email.trim().length > 50) {
        errors.push('Email is too long !')
    }

    if (errors.length > 0) {
        res.json({
            success: false,
            code: 400,
            msg: errors[0],
            errors
        })
    } else {
        pool.query(quires.isEmailExists, [email], (error, result) => {
            if (error) {
                return res.status(500).json(errorResponse)
            }

            if (result.rowCount > 0) {
                res.status(409).json({
                    success: false,
                    code: 409,
                    msg: 'Email is already exist !'
                })
            } else {
                next()
            }
        })
    }
}

// check if the username is already exist in database
const checkUsernameIsExist = (req, res, next) => {
    const { username } = req.body


    // validation
    const errors = []

    // username
    if (!username || username.trim().length < 3) {
        errors.push('Username must be at least 3 character !')
    }

    if (username && username.trim().length > 50) {
        errors.push('Username is too long !')
    }

    if (username && username.trim().includes(' ')) {
        errors.push('Username can not contains white spaces !')
    }

    if (errors.length > 0) {
        res.json({
            success: false,
            code: 400,
            msg: errors[0],
            errors
        })
    } else {
        pool.query(quires.isUsernameExists, [username], (error, result) => {
            if (error) {
                return res.status(500).json(errorResponse)
            }

            if (result.rows[0]) {
                res.status(409).json({
                    success: false,
                    code: 409,
                    msg: 'Username is already exist !'
                })
            } else {
                next()
            }
        })
    }
}

module.exports = {
    checkToken,
    checkEmailIsExist,
    checkUsernameIsExist
}