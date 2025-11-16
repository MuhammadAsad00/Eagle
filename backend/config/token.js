import jwt from 'jsonwebtoken';

export const genToken = (userId) => {
    try {
        const token = jwt.sign({userId}, process.env.JWT_SECRET,{expiresIn: '15d'});
        return token;
    } catch (error) {
        console.error("Token faild",error);
    }
} 

export const genAdminToken = (email) => {
    try {
        const token = jwt.sign({email, role: "admin"}, process.env.JWT_SECRET,{expiresIn: '4d'});
        return token;
    } catch (error) {
        console.error("Token failed",error);
    }
}