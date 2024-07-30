import jwt from "jsonwebtoken";

export const requireAuth = async (req, res, next) => {
    const {authorization} = req.headers;
    if(!authorization) return res.status(400).json({message:"Authorization token required"});
    
    const token = authorization.split(" ")[1];

    try {
        const user = jwt.verify(token, process.env.JWT_SECRET);
        req.user = user;

        next();

    } catch (error) {
        res.status(401).json({error: error.message});
    }
}