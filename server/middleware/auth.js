import jwt from "jsonwebtoken";

export const verifyToken = async (req, res, next) => {
    try {

        // Get the token from the Authorization header

        let token = req.header('Authorization');

        // Checking to see if a token is provided

        if (!token) return res.status(403).send('Access Denied');

        // Check if the token begins with 'Bearer', and then remove the Bearer prefix

        if(token.startsWith('Bearer')) token = token.slice(7, token.length).trimLeft();

        // Verifying the token with the jwt secret string

        const verified = jwt.verify(token, process.env.JWT_SECRET);

        // Set the verified user in the req obj

        req.user = verified;

        next();

    } catch (e) {

        res.status(500).json({ error: e.message});
        
    };
};