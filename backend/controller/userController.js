import User from "../models/User.js"


export const getCurrentUser = async (req, res) => {
    try {
        const currentUser = await User.findById(req.userId).select("-password -__v");
        if(!currentUser){
            return res.status(404).json({massage: "User not found"});
        }
       res.status(200).json({ user: currentUser });
    } catch (error) {
         console.log(error);
        return res.status(500).json({ message: "getuser error" });
    }
}

export const getAdmin = async (req, res) => {
    try {
        let adminEmail = req.adminEmail;
        if (!adminEmail) {
            return res.status(403).json({message: "Admin not found"});
        }
        res.status(201).json({email: adminEmail, role: "admin"});
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "getadmin error" });
    }
}
