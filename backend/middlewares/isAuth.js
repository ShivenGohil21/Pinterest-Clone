import jwt from 'jsonwebtoken';
import { User } from '../models/usermodel.js';

export const isAuth = async (req, res, next) => {
    try {
        const token = req.cookies.token;  // Ensure cookies are received

        if (!token)
            return res.status(403).json({ message: "Please Login" });

        const decodedData = jwt.verify(token, process.env.JWT_SEC);

        if (!decodedData)
            return res.status(403).json({ message: "Token Expired" });

        req.user = await User.findById(decodedData.id);
        if (!req.user) return res.status(404).json({ message: "User not found" });

        next();
    } catch (error) {
        res.status(500).json({ message: "Please login" });
    }
};
