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


const createNewTag = (req, res) => {
    const { name } = req.body

    const errors = []

    if (!name || name.trim().length === 0) {
        errors.push("Tag name is required !")
    }

    if (name && name.trim().length > 50) {
        errors.push('Tag name is maximum 50 character !')
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

    // create new tag
    const token = req.headers.authorization.split(' ')[1]
    const user_id = jwt.verify(token, jwtSecretKey).id

    pool.query(queries.createNewTag, [name, user_id], (error, result) => {
        if (error) {
            console.log(error);
            res.status(500).json(errorResponse)
        }

        const tag = result.rows[0]
        res.json({ success: true, code: 200, tag })
    })
}

// delete tag
const deleteTag = (req, res) => {
    const { id } = req.params

    const errors = []
    if (!id) {
        errors.push('Tag id not found !')
    }

    if (!Number.isInteger(Number(id))) {
        errors.push('Tag id is invalid !')
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

    // delete tag
    const token = req.headers.authorization.split(' ')[1]
    const user_id = jwt.verify(token, jwtSecretKey).id

    console.log({ id, user_id });

    pool.query(queries.deleteTag, [id, user_id], (error, result) => {
        if (error) {
            console.log(error);
            return res.status(500).json(errorResponse)
        }

        if (result.rows[0]) {
            const tag = result.rows[0]
            res.json({ success: true, code: 200, msg: 'Tag deleted successfully !', tag })
        } else {
            res.status(404).json({ success: false, code: 404, msg: 'Tag not found !' })

        }
    })
}



module.exports = {
    createNewTag,
    deleteTag
}