const pool = require('../db/connect')
const queries = require('../db/queries')
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
    pool.query(queries.createNewTag, [name, req.user.id], (error, result) => {
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
    pool.query(queries.deleteTag, [id, req.user.id], (error, result) => {
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

// update tag
const updateTag = (req, res) => {
    const { id } = req.params
    const { name } = req.body

    const errors = []
    if (!id) {
        errors.push('Tag id not found !')
    }

    if (!Number.isInteger(Number(id))) {
        errors.push('Tag id is invalid !')
    }

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

    // update Tag
    pool.query(queries.updateTag, [name, id, req.user.id], (error, result) => {
        if (error) {
            console.log(error);
            return res.status(500).json(errorResponse)
        }

        if (result.rows[0]) {
            const tag = result.rows[0]
            res.json({ success: true, code: 200, msg: 'Tag updated successfully !', tag })
        } else {
            res.status(404).json({ success: false, code: 404, msg: 'Tag not found !' })

        }
    })
}

// get single note
const getSingleTag = (req, res) => {
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

    // get tag
    pool.query(queries.getSingleTag, [id, req.user.id], (error, result) => {
        if (error) {
            console.log(error);
            return res.status(500).json(errorResponse)
        }

        if (result.rows[0]) {
            const tag = result.rows[0]
            res.json({ success: true, code: 200, tag })
        } else {
            res.status(404).json({ success: false, code: 404, msg: 'Tag not found !' })

        }
    })
}

// get all tags
const getAllTags = (req, res) => {
    pool.query(queries.getAllTags, [req.user.id], (error, result) => {
        if (error) {
            console.log(error);
            return res.status(500).json(errorResponse)
        }
        const tags = result.rows
        res.json({ success: true, code: 200, msg: 'Success !', tags })
    })
}

// get all notes for tags
const getAllNotesForTag = (req, res) => {
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

    pool.query(queries.getAllNotesForTag, [id], (error, result) => {
        if (error) {
            console.log(error);
            return res.status(500).json(errorResponse)
        }
        const tags = result.rows
        res.json({ success: true, code: 200, msg: 'Success !', tags })

    })
}
module.exports = {
    createNewTag,
    deleteTag,
    updateTag,
    getSingleTag,
    getAllTags,
    getAllNotesForTag
}