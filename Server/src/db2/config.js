import mongoose from "mongoose";

const Mongodb = async() =>{
    try {
        mongoose.set('strictQuery',false)
        await mongoose.connect(process.env.Mongo_Url);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.log("MongoDB Connection Error");
    }
}

export default Mongodb;