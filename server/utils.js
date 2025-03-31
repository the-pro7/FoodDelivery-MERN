import mongoose from "mongoose";
import jwt from "jsonwebtoken"


// Custom function to log to the console more nicely 😂
const log = (...args) => console.log("[LOG]:", ...args);

const logErr = (...args) => console.log('[ERROR]:', ...args)

// Function to connect to MongoDB
const connectDB = () => {
    mongoose.set("strictQuery", true); // Handles queries with unknown fields
    if (process.env.MONGODB_URI) {
        mongoose
            .connect(process.env.MONGODB_URI)
            .then(() => log("Connected to Mongo DB"))
            .catch((err) => {
                logErr("failed to connect with mongo");
                logErr(err);
            });
    }
};

const generateTokens = (user) => {
    const accessToken = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_ACCESS_SECRET, {
        expiresIn: "15m"
    })

    const refreshToken = jwt.sign({ id: user._id }, process.env.JWT_REFRESH_SECRET, {
        expiresIn: "30d"
    })

    return {
        accessToken,
        refreshToken
    }
}

// const fethWithAuth

export {
    connectDB,
    log,
    logErr,
    generateTokens
}