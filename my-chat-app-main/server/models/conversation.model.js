import mongoose from "mongoose";
import Message from "./message.model.js";

const conversationSchema = new mongoose.Schema(
  {
    // participants is with reference to the User model while messages is with reference to the message model
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    messages: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message",
        default: [],
      },
    ],
  },
  // createdAt, updatedAt => message.createdAt, message.updatedAt
  { timestamps: true }
);

const Conversation = mongoose.model("Conversation", conversationSchema);

export default Conversation;
