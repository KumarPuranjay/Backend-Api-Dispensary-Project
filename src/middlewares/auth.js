const jwt = require("jsonwebtoken")
const auth = (req, res, next) => {

    // let token = req.headers.authorization;
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1];
    // if (token) {
    //     token =  token.split(" ")[1];
    //     req.token = token
    //     next()
    // }
    // else {
    //     res.status(401).json({ message: "Unauthorized User" });
    // }
    if (!token) return res.status(401).json({ message: 'Unauthorized' });
    try {
        const decoded = jwt.verify(token, 'secret');
        req.user = decoded;
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({ message: "Unauthorized User" });
    }
}

module.exports = auth; 