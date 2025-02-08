import mongoose from 'mongoose';


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "name is required"],
        lowercase: true,
        minLength: [3, "min length of name is 3"],
        maxLength: 10
    },
    email: {
        type: String,
        required: [true, "email is required"],
        lowercase: true,
        unique: true,
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    },
    password: {
        type: String,
        required: [true, "password is required"],
        minLength: 8
    },
    phone: {
        type: String,
        required: [true, "phone is required"],
    },
    gender: {
        type: String,
        required: [true, "gender is required"],
        enum: ["Male", "Female"]
    },
    confirmed: {
        type: Boolean,
        default: false
    },
    role:{
        type: String,
        enum: ["admin","user"],
        default: "user"
    }
},
    {
        timestamps: true,
        autoCreate: true,
    }
);

const userModel = mongoose.model.User || mongoose.model("User", userSchema);


export default userModel;

