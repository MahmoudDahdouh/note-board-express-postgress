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


module.exports = {
    loginByEmail,
    isEmailExists,
    loginByUsername,
    isUsernameExists,
    signup
}