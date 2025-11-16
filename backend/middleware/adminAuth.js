import jwt from "jsonwebtoken";

const adminAuth = (req, res, next) => {
    try {
        let {token} = req.cookies
        if (!token) {
            return res.status(401).json({message: "Unauthorized"})
        }
        let verifyToken = jwt.verify(token, process.env.JWT_SECRET)
        if (!verifyToken) {
            return res.status(401).json({message: "Invalid Token"})
        }
        req.adminEmail = process.env.ADMIN_EMAIL
        next();
    } catch (error) {
        console.log("Admin Authentication error:", error);
        return res.status(500).json({message: "Admin Authentication failed"})
    }
}

export default adminAuth;