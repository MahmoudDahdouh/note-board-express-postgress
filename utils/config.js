require('dotenv').config()

const { PORT,
    NODE_ENV,
    POSTGRES_USER,
    POSTGRES_HOST,
    POSTGRES_DATABASE,
    POSTGRES_PASSWORD,
    POSTGRES_PORT,
    JWT_TOKEN_SECRET_KEY
} = process.env

const config = {
    port: PORT || 3000,
    nodeEnv: NODE_ENV || 'development',
    pgUser: POSTGRES_USER,
    pgHost: POSTGRES_HOST,
    pgDatabase: POSTGRES_DATABASE,
    pgPassword: POSTGRES_PASSWORD,
    pgPort: POSTGRES_PORT,
    jwtSecretKey: JWT_TOKEN_SECRET_KEY
}

module.exports = config
