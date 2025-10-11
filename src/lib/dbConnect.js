import mongoose from "mongoose";

export default async function dbConnection(){
    try{
        await mongoose.connect(process.env.MONGO_URI)
        console.log("db connected")
    }catch(err){
        console.log("error in connecting",err)
    }
}