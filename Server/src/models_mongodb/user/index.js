import mongoose from "mongoose";


const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 10
    },
    lastName: {
        type: String,
        required: true,
        maxLength: 10,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    
}, {timestamps: true})

const UserModel = mongoose.model('User', UserSchema);

export default UserModel;