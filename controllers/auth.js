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
    email = email.trim()

    const errors = []
    if (!email) {
        errors.push('Email is required !')
    }

    if (!validateEmail(email)) {
        errors.push('Email is invalid !')
    }

    if (email.length > 50) {
        errors.push('Email is too long !')
    }

    if (!password || password.length < 6) {
        errors.push('Password must be at least 6 character !')
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
        pool.query(quires.loginByEmail, [email], (error, result) => {
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
    username = username.trim()
    const errors = []

    if (!username || username.length < 5) {
        errors.push('Username must be at least 5 character !')
    }

    if (!password || password.length < 6) {
        errors.push('Password must be at least 6 character !')
    }

    if (errors.length > 0) {
        res.json({
            success: false,
            code: 400,
            msg: errors[0],
            errors
        })
    } else {
        pool.query(quires.loginByUsername, [username], (error, result) => {
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
const signUp = (req,res)=>{

}

module.exports = {
    login,
    signUp
}