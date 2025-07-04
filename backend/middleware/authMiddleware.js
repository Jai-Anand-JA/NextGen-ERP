import jwt from "jsonwebtoken";
import Student from "../models/studentModel.js";
import Faculty from "../models/facultyModel.js";
import Admin from "../models/adminModel.js";

export const authMiddleware = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;

        let user;
        if (decoded.role === "Student") {
            user = await Student.findById(decoded.id).select("-password");
        } else if (decoded.role === "Faculty") {
            user = await Faculty.findById(decoded.id).select("-password");
        } else if (decoded.role === "Admin") {
            user = await Admin.findById(decoded.id).select("-password");
        }

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        req.user = user;
        next();
    } catch (error) {
        console.error("Auth middleware error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};


