import "dotenv/config";

import express from "express";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import { allowedOrigins, config } from "./config/index.js";
import { corsMiddleware } from "./middlewares/cors.js";
import { reqLogger } from "./middlewares/reqLogger.js";
import { logger } from "./config/logger.js";
import { errorHandler } from "./middlewares/error.middleware.js";
import path from "path";
import { createServer } from "http";
import { Server } from "socket.io";
import { connectDB } from "./db/ConnectDB.js";
import { SocketAuthenticator } from "./middlewares/auth.js";
import { NEW_MESSAGE, NEW_MESSAGE_ALERT, START_OR_STOP_TYPING, UPDATE_USER_LAST_SEEN, UPDATE_USER_STATUS, USER_CONNECTED } from "./config/events.js";
import { randomUUID } from "crypto";
import { getSockets } from "./utils/socketHelper.js";
import { Message } from "./models/message.js";
import { Chat } from "./models/chat.js";
import { User } from "./models/user.js";
import userRoutes from "./routes/user.js";
import chatRoutes from "./routes/chat.js";
import requestRoutes from "./routes/request.js";
import adminRoutes from "./routes/admin.js";


const app = express();
app.use(
     "/uploads",
     express.static(path.join(process.cwd(), "uploads"))
);


const server = createServer(app);
const io = new Server(server, {
     pingInterval: 10000, // Send a ping every 10 seconds
     pingTimeout: 5000,   // Disconnect if no pong within 5 seconds
     cors: {
          origin: allowedOrigins,
          credentials: true,
     }
});

app.set("io", io);

connectDB();




app.use(corsMiddleware);
app.use(helmet({
     crossOriginOpenerPolicy: false,
     crossOriginEmbedderPolicy: false,
}));
app.use(reqLogger);
app.use(express.json());
app.use(cookieParser());
// app.use("/auth", authRoutes);
// app.use("/user", userRoutes);

app.get("/", (req, res) => {
     res.send("Hello from index.js of user-service");
})

app.get("/health", (req, res) => {
     res.status(200).json({
          message: "ok"
     })
})

app.use("/v1/api/user", userRoutes);
app.use("/v1/api/chat", chatRoutes);
app.use("/v1/api/request", requestRoutes);
app.use("/v1/api/admin", adminRoutes);



export const userSocketIDs = new Map();




io.use((socket, next) => {
     cookieParser()(socket.request, socket.request.res, async (err) => {
          await SocketAuthenticator(err, socket, next);
     })
});

let onlineUsers = {};


io.on("connection", (socket) => {


     const user = socket.user;
     // console.log(user);

     userSocketIDs.set(user._id.toString(), socket.id);
     // console.log(userSocketIDs);

     socket.on(USER_CONNECTED, () => {
          onlineUsers[user._id] = socket.id;
          io.emit(UPDATE_USER_STATUS, { user: user._id, status: 'online', onlineUsers });
     });

     socket.on(NEW_MESSAGE, async ({ chatId, members, message }) => {
          
          const realTimeMessage = {
               content: message,
               _id: randomUUID(),
               sender: {
                    _id: user._id,
                    name: user.name,
               },
               chatId: chatId,
               createdAt: new Date().toISOString(),
          };

          const messageForDb = {
               content: message,
               chatId: chatId,
               sender: user._id
          }
          // console.log(members)

          const membersSocket = getSockets(members);

          // console.log(membersSocket,userSocketIDs);
          // console.log(membersSocket)
          io.to(membersSocket).emit(NEW_MESSAGE, { chatId, message: realTimeMessage, });
          io.to(membersSocket).emit(NEW_MESSAGE_ALERT, { chatId, message,senderName:user.name });

          // console.log("meesage realtime", realTimeMessage);
          try {
               await Message.create(messageForDb);
               const chat = await Chat.findById(chatId);
               chat.lastMsg = message;
               const updatedChat = members.map(({ _id }) => {
                    if (!onlineUsers[_id]) {
                         // console.log(chat)
                         let pendingMember = chat.pendings.find(p => p.member.toString() === _id.toString());
                         // console.log(pendingMember)
                         if (pendingMember) {
                              pendingMember.count = pendingMember.count + 1;
                         } else {
                              chat.pendings.push({ member: _id, count: 1 })
                         }
                    }
               })

               await Promise.all(updatedChat);
               // chat.pendings = [];
               await chat.save();
          } catch (error) {
               console.log(error);
          }
     });

     socket.on(START_OR_STOP_TYPING, ({ members, chatId, typing }) => {
          const membersSocket = getSockets(members);
          io.to(membersSocket).emit(START_OR_STOP_TYPING, { chatId, typing, user: user._id, name: user.name });
     })

     socket.on(UPDATE_USER_STATUS, async ({ status }) => {
          // console.log('emmit :'+status)
          if(status === 'offline'){
               const userId = Object.keys(onlineUsers).find(key => onlineUsers[key] === socket.id);
               if(userId) {
                    delete onlineUsers[userId];
                    io.emit(UPDATE_USER_STATUS, { userId, status: 'offline', onlineUsers,from:'backend' });
               }
          }else{
               onlineUsers[user._id] = socket.id;
               io.emit(UPDATE_USER_STATUS, { userId: user._id, status: 'online', onlineUsers,from:'backend' });
          }
          const dbUser = await User.findById(user._id);
          dbUser.lastSeen = new Date().toISOString();
          await dbUser.save();
          io.emit(UPDATE_USER_LAST_SEEN,{id:user._id.toString(),status:'updated'})
     })

     socket.on("disconnect", async () => {
          // console.log("user disconnected");
          const userId = Object.keys(onlineUsers).find(key => onlineUsers[key] === socket.id);
          if (userId) {
               delete onlineUsers[userId];
               io.emit(UPDATE_USER_STATUS, { userId, status: 'offline', onlineUsers });
          }
          userSocketIDs.delete(user._id.toString());
          const dbUser = await User.findById(user._id);
          dbUser.lastSeen = new Date().toISOString();
          await dbUser.save();
     });
});




app.use(errorHandler)

const startServer = async () => {
     try {
          server.listen(config.PORT, () => {
               logger.info(
                    `${config.SERVICE_NAME} is running on http://localhost:${config.PORT}`
               );
          });

          // Graceful shutdown
          const shutdown = async () => {
               logger.info("Shutting down gracefully...");

               server.close(async () => {
                    try {
                         // Uncomment if you're using Kafka
                         // await disconnectProducer();

                         logger.info("Server closed");
                         process.exit(0);
                    } catch (error) {
                         logger.error("Error during shutdown:", error);
                         process.exit(1);
                    }
               });
          };

          process.on("SIGTERM", shutdown);
          process.on("SIGINT", shutdown);

     } catch (error) {
          logger.error("Failed to Start Server", error);
          process.exit(1);
     }
};

startServer();