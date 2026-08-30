import { Router, json } from "express";
import { Logout, allChats, allMessages, allUsers, getDatshbordStats, verify } from "../controllers/admin.js";
import { isAuthenticatedAdmin } from "../middlewares/auth.js";


const adminRoutes = Router();
adminRoutes.use(json());

adminRoutes.post('/verify',verify);
adminRoutes.get('/logout',Logout);

adminRoutes.use(isAuthenticatedAdmin);
// adminRoutes.get('/');
adminRoutes.get('/users',allUsers);
adminRoutes.get('/chats',allChats);
adminRoutes.get('/messages',allMessages);
adminRoutes.get('/stats',getDatshbordStats);

export default adminRoutes;