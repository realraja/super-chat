import { Router, json } from "express";
import { Chat } from "../models/chat.js";
import {
  AddAdmin,
  AddMembers,
  CreateGroup,
  DeleteGroup,
  GetChatDetails,
  GetMyChats,
  GetMyGroups,
  LeaveGroup,
  NewChat,
  RemoveAdmin,
  RemoveMembers,
  RenameGroup,
  SendAttachment,
  checkIsFriend,
  deletePendings,
  getMessage,
} from "../controllers/chat.js";
import { isAuthenticated } from "../middlewares/auth.js";
import { attachmentMulter } from "../middlewares/multer.js";

const chatRoutes = Router();

chatRoutes.use(json());



chatRoutes.use(attachmentMulter)

chatRoutes.post("/new", isAuthenticated, CreateGroup);
chatRoutes.post("/new/chat", isAuthenticated, NewChat);
chatRoutes.get("/my", isAuthenticated, GetMyChats);
chatRoutes.get("/my/group", isAuthenticated, GetMyGroups);
chatRoutes.put("/admin/add", isAuthenticated, AddAdmin);
chatRoutes.put("/admin/remove", isAuthenticated, RemoveAdmin);
chatRoutes.put("/add", isAuthenticated, AddMembers);
chatRoutes.put("/remove", isAuthenticated, RemoveMembers);
chatRoutes.delete("/leave/:chatId", isAuthenticated, LeaveGroup);








chatRoutes.use(isAuthenticated);
chatRoutes.post("/message", SendAttachment); // send attachment test it after okay

chatRoutes.get("/message/:id", getMessage);
chatRoutes.delete("/delete-pending/:id", deletePendings);

//get chat details ,rename,delete
chatRoutes.route("/:id").get(GetChatDetails).put(RenameGroup).delete(DeleteGroup);
chatRoutes.route("/check-friend/:id").get(checkIsFriend);

export default chatRoutes;
