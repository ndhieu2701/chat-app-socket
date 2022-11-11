const jwt = require('jsonwebtoken')

const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        // thoi gian het han cua token
        expiresIn: "7d"
    })
}

module.exports = generateToken