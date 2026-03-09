import mongoose from "mongoose";

const LoginSchema = new mongoose.Schema(
{
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },

    isLoggedIn: {
        type: Boolean,
        default: false,
    },

    token: {
        type: String
    },

    device: {
        type: String
    },

    ipAddress: {
        type: String
    },

    userAgent: {
        type: String
    },

    loginTime: {
        type: Date,
        default: Date.now
    },

    logoutTime: {
        type: Date
    }
},
{ timestamps: true }
);

const Login = mongoose.model("Login", LoginSchema);

export default Login;