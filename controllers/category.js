const jwt = require('jsonwebtoken')
const pool = require('../db/connect')
const queries = require('../db/queries')
const { jwtSecretKey } = require('../utils/config')
// error response
const errorResponse = {
    success: false,
    code: 500,
    msg: 'Something went wrong, Try again later !'
}

const createNewCategory = (req, res) => {
    const { name } = req.body

    const errors = []

    if (!name || name.trim().length === 0) {
        errors.push("category name is required !")
    }

    if (name && name.trim().length > 50) {
        errors.push('Category name is maximum 50 character !')
    }

    // check error
    if (errors.length > 0) {
        return res.json({
            success: false,
            code: 400,
            msg: errors[0],
            errors
        })
    }

    // create new category
    const token = req.headers.authorization.split(' ')[1]
    const user_id = jwt.verify(token, jwtSecretKey).id

    pool.query(queries.createNewCategory, [name, user_id], (error, result) => {
        if (error) {
            res.status(500).json(errorResponse)
        }

        const category = result.rows[0]
        res.json({ success: true, code: 200, category })
    })


}



module.exports = {
    createNewCategory
}