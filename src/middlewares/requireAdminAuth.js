import jwt from "jsonwebtoken";

export const requireAdminAuth = (req, res, next) => {
    const {authorization} = req.headers;

    if(!authorization) return res.status(400).json({message:"Authorization token required"});
    
    const token = authorization.split(" ")[1];

    try {
        const { isAdmin} = jwt.verify(token, process.env.JWT_SECRET);

        if(!isAdmin) throw Error("Unauthorized access, admin only!");
        next();

    } catch (error) {
        res.status(401).json({error: error.message});
    }
}