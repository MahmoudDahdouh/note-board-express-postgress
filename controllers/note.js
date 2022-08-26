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

// get all notes
const getAllNotes = (req, res) => {

}

// create a new note
const createNote = (req, res) => {
    const { title, description, category_id } = req.body
    let { is_public, is_checked } = req.body

    const errors = []

    // title
    if (!title || title.trim().length === 0) {
        errors.push('Title is required !')
    }

    if (title && title.trim().length > 100) {
        errors.push('Title is too long !')
    }

    // description
    if (description && description.trim().length > 10000) {
        errors.push('Description is too long !')
    }

    // category_id
    if (!category_id) {
        errors.push('Category id is required !')
    }

    // is_public
    if (!is_public) {
        is_public = false;
    }
    else if (is_public == '1' || is_public.toLowerCase() == 't' || is_public.toLowerCase() == 'true') {
        is_public = true
    } else {
        is_public = false
    }

    // is_checked
    if (!is_checked) {
        is_checked = false;
    }
    else if (is_checked == '1' || is_checked.toLowerCase() == 't' || is_checked.toLowerCase() == 'true') {
        is_checked = true
    } else {
        is_checked = false
    }


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

    pool.query(queries.createNote,
        [title, description, is_public, is_checked, user_id, category_id],
        (error, result) => {
            if (error) {
                console.log({ error });
                return res.status(500).json(errorResponse)
            }
            const note = result.rows[0]
            res.json({ success: true, code: 200, note })
        })
}

// get  single note
const getNote = (req, res) => {

}

// delete singel note
const deleteNote = (req, res) => {

}

// update signel note
const updateNote = (req, res) => {

}

module.exports = {
    getAllNotes,
    createNote,
    getNote,
    deleteNote,
    updateNote,
}