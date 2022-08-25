/**
 * auth
 */

// login by email
const loginByEmail = 'SELECT * FROM users WHERE email = $1;'
const isEmailExists = 'SELECT s FROM users s WHERE s.email = $1'

// login by username
const loginByUsername = 'SELECT * FROM users WHERE username = $1;'
const isUsernameExists = 'SELECT s FROM users s WHERE s.username = $1'


module.exports = {
    loginByEmail,
    isEmailExists,
    loginByUsername,
    isUsernameExists
}