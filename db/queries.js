/**
 * auth
 */

// login by email
const loginByEmail = 'SELECT * FROM users WHERE email = $1;'

// login by username
const loginByUsername = 'SELECT * FROM users WHERE username = $1;'

// check if username or email is exist
const isEmailExists = 'SELECT s FROM users s WHERE s.email = $1;'
const isUsernameExists = 'SELECT s FROM users s WHERE s.username = $1;'

// signup
const signup = `INSERT INTO users
        (first_name, last_name, username, email, password) 
        VALUES ($1,$2,$3,$4,$5)
        RETURNING id, username, first_name, last_name, email, user_type, created_at, modified_at;`

/**
 * note
 */

// create a new note
const createNote = `INSERT INTO note (title, description, is_public, is_checked, user_id, category_id)
                    VALUES ($1, $2, $3, $4, $5, $6)
                    RETURNING
                        id, user_id, title, description, is_checked, is_public, category_id,
                        (SELECT name FROM category WHERE id = category_id LIMIT 1) AS  category_name,
                        created_at, modified_at;`

// get notes for user
const getNotes = 'SELECT * FROM note WHERE user_id = $1;'

// get public notes by username
const getUserNotes = 'SELECT * FROM note WHERE is_public = true AND username = $1;'

// get single note
const getNoteById = 'SELECT * FROM note WHERE id = $1'

// update note
const updateNote = `UPDATE note
                    SET 
                    WHERE id = $id;`

// delete note
const deleteNote = 'DELETE FROM note WHERE id = $id;'


/**
 * category
 */

// check if the user has category
const isUserHasCategory = 'SELECT s FROM category s WHERE s.id = $1 AND s.user_id = $2;'

// add new category
const createNewCategory = `INSERT INTO category (name,user_id)
                            VALUES($1,$2)
                            RETURNING *`


/**
 * tag
 */


module.exports = {
    // auth
    loginByEmail,
    isEmailExists,
    loginByUsername,
    isUsernameExists,
    signup,

    // note
    getNotes,
    getUserNotes,
    getNoteById,
    createNote,
    updateNote,
    deleteNote,

    //category
    isUserHasCategory,
    createNewCategory

}