import User from "../models/user.model.js";
import Login from "../models/login.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// REGISTER
export const registerUser = async (req, res) => {
    try {

        const { username, email, password } = req.body;

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                message: "User already exists"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const avatar = req.files?.avatar?.[0]?.path || "";
        const coverImage = req.files?.coverImage?.[0]?.path || "";

        const user = await User.create({
            username,
            email,
            password: hashedPassword,
            avatar,
            coverImage
        });

        res.status(201).json({
            message: "User registered successfully",
            user
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};


// LOGIN
export const loginUser = async (req, res) => {
    try {

        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if (!isPasswordCorrect) {
            return res.status(401).json({
                message: "Invalid credentials"
            });
        }

        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        await Login.create({
            userId: user._id,
            isLoggedIn: true,
            token
        });

        res.status(200).json({
            message: "Login successful",
            token,
            user
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};


// LOGOUT
export const logoutUser = async (req, res) => {
    try {

        const { userId } = req.body;

        await Login.updateMany(
            { userId },
            { isLoggedIn: false }
        );

        res.status(200).json({
            message: "Logged out successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};