import { Chat_token, config } from "../config/index.js";
import { UnauthorizedError } from "../utils/error.js";
import jwt from 'jsonwebtoken';
import { tryCatch } from "./tryCatch.js";


export const isAuthenticated = tryCatch((req,res,next)=>{
    const token = req.cookies[Chat_token];
    if(!token) return next(new UnauthorizedError('Please Login First To Access this Page',401));

    const decoded = jwt.verify(token, config.JWT_ACCESS_SECRET)
    req.id = decoded.id;
    next();
})


export const isAuthenticatedAdmin = tryCatch((req,res,next)=>{
    const token = req.cookies["Chat_Admin_token"];
    if(!token) return next(new UnauthorizedError('Please Login First To Access this Page',401));

    const password = jwt.verify(token, config.JWT_ACCESS_SECRET)
    if(password !== config.ADMIN_SECRET_PASS) return next(new UnauthorizedError('Password has been changed please login again',401));

    next();
})


export const SocketAuthenticator = async(err,socket,next) =>{
    try {
        if(err) return next(err)

        const authToken = socket.request.cookies[Chat_token];

        if(!authToken) return next(new UnauthorizedError('Please login to access this route',401));

        const decodedData = jwt.verify(authToken,config.JWT_ACCESS_SECRET);

       

        socket.user= {_id:decodedData.id, name:decodedData.name};

        return next();
    } catch (error) {
        console.log(error)
        return next(new errorHandler('Please login to access this route',401));
    }
};