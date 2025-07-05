import Admin from "../models/adminModel.js";
import Faculty from "../models/facultyModel.js";
import Student from "../models/studentModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


export const login = async (req, res) => {
    const { email, password } = req.body;

    try {

         if(!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
         }
        // Check if the user is a student
        let user = null;
        user = await Student.findOne({ email });
        if (!user) {
            // Check if the user is a faculty
            user = await Faculty.findOne({ email });
            if (!user) {
                // Check if the user is an admin
                user = await Admin.findOne({ email });
            }
        }
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Check if the password is correct
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid password" });
        }
        // Generate a JWT token
        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", // Use secure cookies in production
            sameSite: "None",
            maxAge: 3600000 // 1 hour
        });

        res.status(200).json({
            message: "Login successful",
            user: {
                id: user._id,
                role: user.role,
            },
        });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const logout = (req, res) => {
    res.clearCookie("token");
    res.status(200).json({ message: "Logout successful" });
}

export const checkAuth = async (req, res) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
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

        res.status(200).json({
            message: "User authenticated",
            user: {
                id: user._id,
                role: user.role,
            },
        });
    }
    catch (error) {
        console.error("Check auth error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}



export const getCurrentUser = async (req, res) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
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

        res.status(200).json(user);
    } catch (error) {
        console.error("Get current user error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}


