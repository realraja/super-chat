import mongoose from "mongoose"
import { config } from "../config/index.js";


export const connectDB = async () =>{
    try {
        const {connection} = await mongoose.connect(config.DATABASE_URL,{
            dbName: config.DATABASE_NAME,
        });
        console.log('Database connected to', connection.name);
    } catch (error) {
        console.log('err===>',error);
        process.exit(1);
    } 
}