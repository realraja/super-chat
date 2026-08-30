import { Router, json } from "express";
import { FindUser, Login, Logout, Profile, Register, Search } from "../controllers/user.js";
import { singleAvatar } from "../middlewares/multer.js";
import { isAuthenticated } from "../middlewares/auth.js";


const userRoutes = Router();

userRoutes.use(json());



userRoutes.post('/register',singleAvatar, Register);
userRoutes.post('/login',singleAvatar,Login);

userRoutes.get('/profile',isAuthenticated,Profile);
userRoutes.get('/logout',isAuthenticated,Logout);

userRoutes.get('/search',isAuthenticated,Search);


userRoutes.get('/getuser/:userId',FindUser);




//only for test okay

userRoutes.post('/getuserdata', async(req,res)=>{
    try {
        const users = req.body.users;
        const userDataPromise = users.map(i => User.findById(i,"name"));
        const usersData = await Promise.all(userDataPromise);

        return res.status(200).json({success:true, message:"All data fetched successfully", data:usersData,})
    } catch (error) {
        return res.status(500).json({success:false, message:"error fetching getalldatabasedata"});
    }
});
export default userRoutes;