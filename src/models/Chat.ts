import mongoose, { Schema } from "mongoose";

const ChatSchema = new Schema(
  {
    event: { type: Schema.Types.ObjectId, ref: "Event" },
    user: { type: Schema.Types.ObjectId, ref: "User" },
    message: String,
    parent: { type: Schema.Types.ObjectId, ref: "Chat", default: null }
  },
  { timestamps: true }
);

export default mongoose.model("Chat", ChatSchema);