import mongoose from "mongoose";


const messageSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
        minLength: 1,
        trim: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,

    }

}, { timestamps: true });

const messageModel = mongoose.model.Message || mongoose.model("Message", messageSchema);


export default messageModel;