import jwt from "jsonwebtoken";

const isAuth = (req, res, next) => {
    try {
        let {token} = req.cookies

        if (!token) {
            return res.status(401).json({ message: "Does not have token" });
        }
        
        let verifyToken = jwt.verify(token, process.env.JWT_SECRET)

        if (!verifyToken) {
            return res.status(401).json({ message: "user is not authenticated" });
        }
        req.userId = verifyToken.userId;
        next();
    } catch (error) {
        console.log("Authentication error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export default isAuth;