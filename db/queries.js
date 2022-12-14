/**
 * auth
 */

// login by email
const loginByEmail = `SELECT 
                            id, username, first_name, last_name, email, password, user_type,
                            to_char(created_at,'yyyy-mm-dd hh24:mi:ss') created_at,
                            to_char(modified_at,'yyyy-mm-dd hh24:mi:ss') modified_at

                        FROM users WHERE email = $1;`

// login by username
const loginByUsername = `SELECT 
                                id, username, first_name, last_name, email, password, user_type,
                                to_char(created_at,'yyyy-mm-dd hh24:mi:ss') created_at,
                                to_char(modified_at,'yyyy-mm-dd hh24:mi:ss') modified_at

                            FROM users WHERE username = $1;`

// check if username or email is exist
const isEmailExists = 'SELECT s FROM users s WHERE s.email = $1;'
const isUsernameExists = 'SELECT s FROM users s WHERE s.username = $1;'

// signup
const signup = `INSERT INTO users
        (first_name, last_name, username, email, password) 
        VALUES ($1,$2,$3,$4,$5)
        RETURNING id, username, first_name, last_name, email, user_type,
                to_char(created_at,'yyyy-mm-dd hh24:mi:ss') created_at,
                to_char(modified_at,'yyyy-mm-dd hh24:mi:ss') modified_at;`

/**
 * note
 */

// create a new note
const createNote = `INSERT INTO note (title, description, is_public, is_checked, user_id, category_id)
                    VALUES ($1, $2, $3, $4, $5, $6)
                    RETURNING
                        id, user_id, title, description, is_checked, is_public, category_id,
                        (SELECT name FROM category WHERE id = category_id LIMIT 1) AS  category_name,
                        to_char(created_at,'yyyy-mm-dd hh24:mi:ss') created_at,
                        to_char(modified_at,'yyyy-mm-dd hh24:mi:ss') modified_at;`

// insert note tag
const insertNoteTag = `INSERT INTO note_tag  (tag_id, note_id, user_id)
                        VALUES ($1,$2,$3)
                        ;`

// check if the user has the tags
const checkIfTheUserHasTags = `SELECT * FROM tag WHERE id = $1 AND user_id = $2 LIMIT 1;`

// get notes for user
const getNotes = 'SELECT * FROM note WHERE user_id = $1;'

// get public notes by username
const getUserNotes = 'SELECT * FROM note WHERE is_public = true AND username = $1;'

// get single note
const getSingleNote = `SELECT 
                            note.id, note.user_id, title, description, is_checked, is_public,
                            category_id,category.name  AS  category_name,
                            to_char(note.created_at,'yyyy-mm-dd hh24:mi:ss') created_at,
                            to_char(note.modified_at,'yyyy-mm-dd hh24:mi:ss') modified_at
                        FROM note
                        INNER JOIN category
                        ON note.category_id = category.id
                        WHERE note.id = $1;
                        `
// get note's tag
const getNoteTags = `SELECT tag.id, tag.name FROM note_tag INNER JOIN tag ON tag.id = note_tag.tag_id WHERE note_tag.note_id = $1;`

// update note
const updateNote = `UPDATE note
                    SET 
                        title = $1, description = $2,
                        is_public = $3, is_checked = $4
                    WHERE id = $5 AND user_id = $6
                    RETURNING 
                        id, user_id, title, description, is_checked, is_public, category_id,
                        (SELECT name FROM category WHERE id = category_id LIMIT 1) AS  category_name,
                        to_char(created_at,'yyyy-mm-dd hh24:mi:ss') created_at,
                        to_char(modified_at,'yyyy-mm-dd hh24:mi:ss') modified_at;`

// delete note
const deleteNote = `DELETE FROM note
                    WHERE id = $1 AND user_id = $2
                    RETURNING 
                        id, user_id, title, description, is_checked, is_public, category_id,
                        (SELECT name FROM category WHERE id = category_id LIMIT 1) AS  category_name,
                        to_char(created_at,'yyyy-mm-dd hh24:mi:ss') created_at,
                        to_char(modified_at,'yyyy-mm-dd hh24:mi:ss') modified_at;`

/**
 * category
 */

// check if the user has category
const isUserHasCategory = 'SELECT s FROM category s WHERE s.id = $1 AND s.user_id = $2;'

// add new category
const createNewCategory = `INSERT INTO category (name,user_id)
                            VALUES($1,$2)
                            RETURNING id, name, user_id, to_char(created_at,'yyyy-mm-dd hh24:mi:ss') created_at,
                                      to_char(modified_at,'yyyy-mm-dd hh24:mi:ss') modified_at;`

// get signle category
const getSingleCategory = `SELECT 
                                category.id, category.name, COUNT(category_id) AS no_of_notes,
                                category.user_id,
                                to_char(category.created_at,'yyyy-mm-dd hh24:mi:ss') created_at,
                                to_char(category.modified_at,'yyyy-mm-dd hh24:mi:ss') modified_at
                           FROM category 
                           LEFT JOIN note
                           ON note.category_id = category.id
                           GROUP BY category.id
                           HAVING category.id = $1 AND category.user_id = $2;`

// update category
const updateCategory = `UPDATE category
                        SET
                            name = $1 , modified_at = CURRENT_TIMESTAMP
                        WHERE  id = $2 AND user_id = $3
                        RETURNING id, name, user_id, to_char(created_at,'yyyy-mm-dd hh24:mi:ss') created_at,
                                      to_char(modified_at,'yyyy-mm-dd hh24:mi:ss') modified_at;`

// delete category
const deleteCategory = `DELETE FROM category
                        WHERE id = $1 AND user_id = $2
                        RETURNING id, name, user_id, to_char(created_at,'yyyy-mm-dd hh24:mi:ss') created_at,
                            to_char(modified_at,'yyyy-mm-dd hh24:mi:ss') modified_at;`

// get all categoreis
const getAllCategorires = `SELECT 
                                category.id, category.name, COUNT(category_id) AS no_of_notes,
                                category.user_id,
                                to_char(category.created_at,'yyyy-mm-dd hh24:mi:ss') created_at,
                                to_char(category.modified_at,'yyyy-mm-dd hh24:mi:ss') modified_at
                           FROM category 
                           LEFT JOIN note
                           ON note.category_id = category.id
                           GROUP BY category.id
                           HAVING category.user_id = $1;`


// get all notes for all categories
const getAllNotesForCategory = `SELECT 
                                        n.id, n.title, n.description, n.is_checked, n.is_public,
                                        n.user_id, n.category_id,
                                        c.name AS  category_name,
                                        to_char(n.created_at,'yyyy-mm-dd hh24:mi:ss') created_at,
                                        to_char(n.modified_at,'yyyy-mm-dd hh24:mi:ss') modified_at
                                    FROM note n
                                    INNER JOIN category c
                                        ON 
                                            n.user_id = c.user_id AND c.id = $1
                                    WHERE n.category_id = $1 AND n.user_id = $2
                                    ;`

/**
 * tag
 */
// create new tag
const createNewTag = `INSERT INTO tag (name,user_id)
                            VALUES($1,$2)
                            RETURNING id, name, user_id, to_char(created_at,'yyyy-mm-dd hh24:mi:ss') created_at,
                                      to_char(modified_at,'yyyy-mm-dd hh24:mi:ss') modified_at;`

// delete tag
const deleteTag = `DELETE FROM tag
                        WHERE id = $1 AND user_id = $2
                        RETURNING id, name, user_id, to_char(created_at,'yyyy-mm-dd hh24:mi:ss') created_at,
                            to_char(modified_at,'yyyy-mm-dd hh24:mi:ss') modified_at;`

// update tag
const updateTag = `UPDATE tag
                        SET
                            name = $1 , modified_at = CURRENT_TIMESTAMP
                        WHERE  id = $2 AND user_id = $3
                        RETURNING id, name, user_id, to_char(created_at,'yyyy-mm-dd hh24:mi:ss') created_at,
                                      to_char(modified_at,'yyyy-mm-dd hh24:mi:ss') modified_at;`

// get signle category
const getSingleTag = `SELECT 
                                id, name, user_id,
                                (
                                    SELECT COUNT(*) FROM note_tag WHERE tag_id = $1
                                ) AS no_of_notes,
                                to_char(created_at,'yyyy-mm-dd hh24:mi:ss') created_at,
                                to_char(modified_at,'yyyy-mm-dd hh24:mi:ss') modified_at
                            FROM tag 
                            WHERE id = $1 AND user_id = $2;`


// get all tags
const getAllTags = `SELECT 
                        id, name, user_id,
                        (
                            SELECT COUNT(*) FROM note_tag WHERE tag_id = tag.id
                        ) AS no_of_notes,
                        to_char(created_at,'yyyy-mm-dd hh24:mi:ss') created_at,
                        to_char(modified_at,'yyyy-mm-dd hh24:mi:ss') modified_at
                    FROM tag 
                    WHERE user_id = $1;`

const getAllNotesForTag = `SELECT
                                n.id,  n.title, n.description, n.is_checked, n.is_public,
                                n.user_id, n.category_id,
                                c.name AS  category_name,
                                nt.tag_id AS tag_id, t.name AS tag_name,
                                to_char(n.created_at,'yyyy-mm-dd hh24:mi:ss') created_at,
                                to_char(n.modified_at,'yyyy-mm-dd hh24:mi:ss') modified_at
                            FROM note_tag AS nt 
                            INNER JOIN note AS n 
                                ON nt.note_id = n.id
                            INNER JOIN category AS c 
                                ON n.category_id = c.id
                            INNER JOIN tag as t
                                ON nt.tag_id = t.id
                            WHERE nt.tag_id = $1;
                            `


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
    getSingleNote,
    createNote,
    insertNoteTag,
    checkIfTheUserHasTags,
    getNoteTags,
    updateNote,
    deleteNote,

    //category
    isUserHasCategory,
    createNewCategory,
    getSingleCategory,
    updateCategory,
    deleteCategory,
    getAllCategorires,
    getAllNotesForCategory,

    // tag
    createNewTag,
    deleteTag,
    updateTag,
    getSingleTag,
    getAllTags,
    getAllNotesForTag

}