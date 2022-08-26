const jwt = require("jsonwebtoken")
const pool = require("../db/connect")
const queries = require("../db/queries")
const { jwtSecretKey } = require("../utils/config")

// error response
const errorResponse = {
    success: false,
    code: 500,
    msg: 'Something went wrong, Try again later !'
}

// check if the user has this category
const checkCategoryIsExist = (req, res, next) => {
    const { category_id } = req.body

    const errors = []

    if (!category_id) {
        errors.push('Category id is required !')
    }

    // check errors
    if (errors.length > 0) {
        return res.json({
            success: false,
            code: 400,
            msg: errors[0],
            errors
        })
    }

    const token = req.headers.authorization.split(' ')[1]
    const user_id = jwt.verify(token, jwtSecretKey).id
    pool.query(queries.isUserHasCategory, [user_id], (error, result) => {
        if (error) {
            res.status(500).json(errorResponse)
        }

        /**
         *             if (result.rowCount > 0) {
                res.status(409).json({
                    success: false,
                    code: 409,
                    msg: 'Email is already exist !'
                })
            } else {
                next()
            }
         */
        if (result.rows[0]) {
            next()
        } else {
            res.status(409).json({
                success: false,
                code: 409,
                msg: 'Category id not found !'
            })
        }
    })

}

module.exports = {
    checkCategoryIsExist
}