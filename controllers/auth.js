const pool = require('../db/connect')
const quires = require('../db/quires')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { validateEmail } = require('../utils/HelperFunctions')

// error response
const errorResponse = {
    success: false,
    code: 500,
    msg: 'Something went wrong, Try again later !'
}
/**
 * Login - email or username
 */

const login = (req, res) => {
    const { email, username, password } = req.body
    if (email) {
        loginByEmail(req, res)
    } else if (username) {
        loginByUsername(req, res)
    } else {
        res.json({
            success: false,
            code: 400,
            msg: 'Username or email are required !'
        })
    }
}

// login by email
const loginByEmail = (req, res) => {
    let { email, password } = req.body

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

    // password
    if (!password || password.length < 6) {
        errors.push('Password must be at least 6 character !')
    }

    if (password.length > 255) {
        errors.push('Password is too long !')
    }

    // check errors
    if (errors.length > 0) {
        res.json({
            success: false,
            code: 400,
            msg: errors[0],
            errors
        })
    } else {
        pool.query(quires.loginByEmail, [email.trim()], (error, result) => {
            if (error) {
                return res.status(500).json(errorResponse)
            }

            const user = result.rows[0]
            if (!user) {
                res.status(404).json({
                    success: false,
                    code: 404,
                    msg: 'Email or password is wrong !'
                })
            } else {
                res.json({
                    success: true,
                    code: 200,
                    user
                })
            }
        })
    }
}

// login by username
const loginByUsername = (req, res) => {
    let { username, password } = req.body

    const errors = []

    // username
    if (!username || username.trim().length < 5) {
        errors.push('Username must be at least 5 character !')
    }

    if (username && username.trim().length > 50) {
        errors.push('Username is too long !')
    }

    // password
    if (password && password.trim().length > 6) {
        errors.push('Password must be at least 6 character !')
    }

    if (password.length > 255) {
        errors.push('Password is too long !')
    }

    // check errors
    if (errors.length > 0) {
        res.json({
            success: false,
            code: 400,
            msg: errors[0],
            errors
        })
    } else {
        pool.query(quires.loginByUsername, [username.trim()], (error, result) => {
            if (error) {
                return res.status(500).json(errorResponse)
            }

            const user = result.rows[0]
            if (!user) {
                return res.status(404).json({
                    success: false,
                    code: 404,
                    msg: 'Username or password is wrong !'
                })
            } else {
                res.json({
                    success: true,
                    code: 200,
                    user
                })
            }
        })
    }
}


/**
 * Signup
 */
const signup = (req, res) => {
    console.log('start sign up');
    let { username, first_name, last_name, email, password } = req.body

    // validation
    const errors = []

    // first name
    if (!first_name || first_name.trim().length < 5) {
        errors.push('First name must be at least 5 character !')
    }

    if (first_name && first_name.trim().length > 50) {
        errors.push('First name is too long !')
    }

    // last name
    if (!last_name || last_name.trim().length < 5) {
        errors.push('Last name must be at least 5 character !')
    }

    if (last_name && last_name.trim().length > 50) {
        errors.push('Last name is too long !')
    }

    // password
    if (!password || password.trim().length < 6) {
        errors.push('Password must be at least 6 character !')
    }

    if (password && password.trim().length > 255) {
        errors.push('Password is too long !')
    }


    // check errors
    if (errors.length > 0) {
        res.json({
            success: false,
            code: 400,
            msg: errors[0],
            errors
        })
    } else {
        pool.query(quires.signup,
            [first_name.trim(), last_name.trim(), username.trim(), email.trim(), password.trim()],
            (error, result) => {
                if (error) {
                    return res.status(500).json(errorResponse)
                }

                const user = result.rows[0]
                res.status(200).json({
                    success: true,
                    code: 200,
                    user
                })
            }
        )
    }
}

module.exports = {
    login,
    signup
}