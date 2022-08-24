const pool = require('../db/connect')
const quires = require('../db/quires')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { validateEmail } = require('../utils/HelperFunctions')

/**
 * Login - email or username
 */

const login = (req, res) => {
    const { email, username, password } = req.body
    console.log({ req: req.body });
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
    const { email, password } = req.body

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

    if (!password) {
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
        res.send('login by email')
    }
}

// login by username
const loginByUsername = (req, res) => {
    const { username, password } = req.body
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
        res.send('login by username')
    }
}

module.exports = {
    login
}