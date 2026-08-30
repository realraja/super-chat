import jwt from 'jsonwebtoken'
import { config } from '../config/index.js';





export const sendToken = (res, user, code, message) => {
    const CookieOptions = {
        maxAge: config.COOKIE_EXPIRE_DAY * 24 * 60 * 60 * 1000,
        sameSite: "strict",
        httpOnly: true,
        secure: false,
    }

    const token = jwt.sign({ id: user._id, name: user.name }, config.JWT_ACCESS_SECRET, {
        expiresIn: config.JWT_ACCESS_SECRET_EXPIRY,
    });

    return res.status(code).cookie("Chat_token", token, CookieOptions).json({ success: true, message: message, user })
}