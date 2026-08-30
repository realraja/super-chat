import { Router, json } from "express";
import { AcceptJoinRequest, AllNotifications, SendRequest } from "../controllers/reques.js";
import { isAuthenticated } from "../middlewares/auth.js";


const requestRoutes = Router();
requestRoutes.use(json());




requestRoutes.post('/send',isAuthenticated,SendRequest);
requestRoutes.put('/accept',isAuthenticated,AcceptJoinRequest);
requestRoutes.get('/notifications',isAuthenticated,AllNotifications);


export default requestRoutes;