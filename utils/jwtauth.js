const jwt = require("jsonwebtoken");
const JWT_SECRET = "Sunbeam@DMCFeb2025";

function createToken(user) {
    return jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: "1d" });
}

function verifyToken(token) {
    try {
        return jwt.verify(token, JWT_SECRET);
    } catch {
        return null;
    }
}

function jwtAuth(req, res, next) {
    const publicRoutes = ["/users/signin", "/users/signup"];
    if (publicRoutes.includes(req.url)) return next();

    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(403).send("Unauthorized - No token");

    const [_, token] = authHeader.split(" ");
    const decoded = verifyToken(token);
    if (!decoded) return res.status(403).send("Unauthorized - Invalid token");

    req.user = decoded;
    next();
}

module.exports = { createToken, jwtAuth };
