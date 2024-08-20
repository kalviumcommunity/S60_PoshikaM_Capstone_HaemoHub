const jwt = require("jsonwebtoken")

const AuthenticateToken = (request, response, next) => {
    const token = request.cookies.token || request.headers['authorization']?.split(' ')[1]

    if(!token) return response.status(401).json({ error : "no token provided"})
    
    jwt.verify(token, process.env.SECRET, (error, user) => {
        if(error) return response.status(403).json({ error : "Invalid token"})
        request.user = user
        next()
    })
}

module.exports = AuthenticateToken