const pool = require('../db/connect')
const queries = require('../db/queries')
// error response
const errorResponse = {
    success: false,
    code: 500,
    msg: 'Something went wrong, Try again later !'
}

// create new category
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
    pool.query(queries.createNewCategory, [name, req.user.id], (error, result) => {
        if (error) {
            res.status(500).json({ error, errorResponse })
        }

        const category = result.rows[0]
        res.json({ success: true, code: 200, category })
    })
}

// get single category
const getSingleCategory = (req, res) => {
    const { id } = req.params

    const errors = []

    if (!id) {
        errors.push('Category id not found !')
    }

    if (!Number.isInteger(Number(id))) {
        errors.push('Category id is invalid !')
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

    // get category
    pool.query(queries.getSingleCategory, [id, req.user.id], (error, result) => {
        if (error) {
            console.log(error);
            return res.status(500).json(errorResponse)
        }

        if (result.rows[0]) {

            const category = result.rows[0]
            res.json({ success: true, code: 200, category })
        } else {
            res.status(404).json({ success: false, code: 404, msg: 'Category not found !' })

        }
    })

}

// update category
const updateCategory = (req, res) => {
    const { id } = req.params
    const { name } = req.body

    const errors = []
    if (!id) {
        errors.push('Category id not found !')
    }

    if (!Number.isInteger(Number(id))) {
        errors.push('Category id is invalid !')
    }

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

    // update category
    pool.query(queries.updateCategory, [name, id, req.user.id], (error, result) => {
        if (error) {
            console.log(error);
            return res.status(500).json(errorResponse)
        }

        if (result.rows[0]) {
            const category = result.rows[0]
            res.json({ success: true, code: 200, msg: 'Category updated successfully !', category })
        } else {
            res.status(404).json({ success: false, code: 404, msg: 'Category not found !' })

        }
    })

}


// delete category
const deleteCategory = (req, res) => {
    const { id } = req.params

    const errors = []
    if (!id) {
        errors.push('Category id not found !')
    }

    if (!Number.isInteger(Number(id))) {
        errors.push('Category id is invalid !')
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

    // delete category
    pool.query(queries.deleteCategory, [id, req.user.id], (error, result) => {
        if (error) {
            console.log(error);
            return res.status(500).json(errorResponse)
        }

        if (result.rows[0]) {
            const category = result.rows[0]
            res.json({ success: true, code: 200, msg: 'Category deleted successfully !', category })
        } else {
            res.status(404).json({ success: false, code: 404, msg: 'Category not found !' })

        }
    })
}

// get all categories
const getAllCategorires = (req, res) => {
    pool.query(queries.getAllCategorires, [req.user.id], (error, result) => {
        if (error) {
            console.log(error);
            return res.status(500).json(errorResponse)
        }
        const categories = result.rows
        res.json({ success: true, code: 200, msg: 'Success !', categories })

    })

}

// get all notes for category
const getAllNotesForCategory = async (req, res) => {
    const { id } = req.params

    const errors = []

    if (!id) {
        errors.push('Category id not found !')
    }

    if (!Number.isInteger(Number(id))) {
        errors.push('Category id is invalid !')
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
    try {
        // start transaction

        await pool.query('BEGIN;')

        let category = (await pool.query(queries.getSingleCategory, [id, req.user.id])).rows[0]


        let notes = (await pool.query(queries.getAllNotesForCategory, [id, req.user.id])).rows
        console.log({ notes, category });
        // COMMIT
        pool.query('COMMIT;')

        res.json({ success: true, code: 200, msg: 'Success !', category, notes })

    } catch (error) {
        await pool.query('ROLLBACK;')
        return res.status(500).json(errorResponse)
    }
}
module.exports = {
    createNewCategory,
    getSingleCategory,
    updateCategory,
    deleteCategory,
    getAllCategorires,
    getAllNotesForCategory

}