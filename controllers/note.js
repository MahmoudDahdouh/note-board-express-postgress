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
const createNote = async (req, res) => {
    const { title, description, category_id, tags } = req.body
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

    // tags
    if (tags && typeof tags == 'object') {
        console.log(tags);
        for (const tag of tags) {
            if (!Number.isInteger(Number(tag))) {
                errors.push('invalid tag id')
            }
        }
    }
    if (tags && typeof tags != 'object') {
        errors.push('tags array is invalid - use tags[] instead !')
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

    try {
        // start transaction
        await pool.query('BEGIN;')

        // create new note
        let note = (await pool.query(queries.createNote, [title, description, is_public, is_checked, user_id, category_id])).rows[0]

        // set note's tags
        if (tags) {
            for (const tag of tags) {
                // check if the tag is exist
                const result = await pool.query(queries.checkIfTheUserHasTags, [Number(tag.trim()), user_id])
                if (result.rows[0]) {
                    await pool.query(queries.insertNoteTag, [Number(tag.trim()), note.id, user_id])
                }
            }
        }

        // COMMIT
        await pool.query('COMMIT;')

        res.json({ success: true, code: 200, note })

    } catch (error) {
        await pool.query('ROLLBACK;')
        return res.status(500).json(errorResponse)
    }

}

// get  single note
const getSingleNote = async (req, res) => {
    const { id } = req.params

    const errors = []

    if (!id) {
        errors.push('Note id not found !')
    }

    if (!Number.isInteger(Number(id))) {
        errors.push('Note id is invalid !')
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

    // get note
    const token = req.headers.authorization.split(' ')[1]
    const user_id = jwt.verify(token, jwtSecretKey).id

    try {
        // start transaction
        await pool.query('BEGIN;')

        const note = (await pool.query(queries.getSingleNote, [id])).rows[0]
        const tags = (await pool.query(queries.getNoteTags, [id])).rows

        note['tags'] = tags
        res.json({ success: true, code: 200, note })

        // COMMIT
        await pool.query('COMMIT;')

    } catch (error) {
        console.log(error);
        await pool.query('ROLLBACK;')
        return res.status(500).json(errorResponse)

    }
}

// delete note
const deleteNote = (req, res) => {
    const { id } = req.params

    const errors = []
    if (!id) {
        errors.push('Note id not found !')
    }

    if (!Number.isInteger(Number(id))) {
        errors.push('Note id is invalid !')
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

    // delete note
    const token = req.headers.authorization.split(' ')[1]
    const user_id = jwt.verify(token, jwtSecretKey).id

    pool.query(queries.deleteNote, [id, user_id], (error, result) => {
        if (error) {
            console.log(error);
            return res.status(500).json(errorResponse)
        }

        if (result.rows[0]) {
            const category = result.rows[0]
            res.json({ success: true, code: 200, msg: 'Note deleted successfully !', category })
        } else {
            res.status(404).json({ success: false, code: 404, msg: 'Note not found !' })

        }
    })

}

// update note
const updateNote = (req, res) => {
    const { id } = req.params
    const { title, description, category_id } = req.body
    let { is_public, is_checked } = req.body

    const errors = []

    // id
    if (!id) {
        errors.push('Note id not found !')
    }

    if (!Number.isInteger(Number(id))) {
        errors.push('Note id is invalid !')
    }

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

    // update category
    const token = req.headers.authorization.split(' ')[1]
    const user_id = jwt.verify(token, jwtSecretKey).id

    pool.query(queries.updateNote,
        [title, description, is_public, is_checked, id, user_id],

        (error, result) => {
            if (error) {
                console.log(error);
                return res.status(500).json(errorResponse)
            }

            if (result.rows[0]) {
                const category = result.rows[0]
                res.json({ success: true, code: 200, msg: 'Note updated successfully !', category })
            } else {
                res.status(404).json({ success: false, code: 404, msg: 'Note not found !' })

            }
        })
}

module.exports = {
    getAllNotes,
    createNote,
    getSingleNote,
    deleteNote,
    updateNote,
}