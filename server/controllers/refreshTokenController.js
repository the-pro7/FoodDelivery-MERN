import { createError } from "../error.js";
import jwt from "jsonwebtoken"


export const refreshToken = (req, res, next) => {
    const refreshToken = req.cookies.refreshToken

    if (!refreshToken) {
        return next(createError(401, "Refresh token not provided"))
    }

    //Verify refresh token
    jwt.verify(refreshToken, process.env.JWT_REFRESH_TOKEN, (err, decodedInfo) => {
        if (err) return next(createError(403, "Failed to verify JWT refresh token"))
            
        // If it's verified get the user id and generate a new accessToken
        const newAccessToken = jwt.sign({ id: decodedInfo.id }, process.env.JWT_ACCESS_TOKEN, {
            expiresIn: "15m" // 15 minutes
        })

        return next(res.status(200).json({ message: "Access token refreshed successfully", token: newAccessToken }))
    })
} 