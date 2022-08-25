const pool = require('../db/connect')
const quires = require('../db/quires')

// error response
const errorResponse = {
    success: false,
    code: 500,
    msg: 'Something went wrong, Try again later !'
}

// check if the email is already exist in database
const checkEmailIsExist = (req,res,next)=>{
    const {email} = req.body.email
    pool.query(quires.isEmailExists,[email],(error,result)=>{
        if (error) {
            return res.status(500).json(errorResponse)
        }

        if(result.rows[0]){
            res.json({
                success: false,
                code: 409,
                msg: 'Eemail is already exist !'
            })
        }else{
            next()
        }
    })
}

// check if the username is already exist in database
const checkUsernameIsExist = (req,res,next)=>{
    const {username} = req.body.username
    pool.query(quires.isUsernameExists,[username],(error,result)=>{
        if (error) {
            return res.status(500).json(errorResponse)
        }

        if(result.rows[0]){
            res.json({
                success: false,
                code: 409,
                msg: 'Username is already exist !'
            })
        }else{
            next()
        }
    })
}

module.exports = {
    checkEmailIsExist,
    checkUsernameIsExist
}