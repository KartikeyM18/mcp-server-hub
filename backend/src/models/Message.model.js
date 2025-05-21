import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({

    receiver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    forserver:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Server",
        
    }
 
},{timestamps:true});
const Message = mongoose.model("Message", messageSchema);
export default Message;