// models/Chat.ts
import mongoose, { Document, Schema } from "mongoose";

export interface IChat extends Document {
	event: mongoose.Types.ObjectId;
	user: mongoose.Types.ObjectId;
	message: string;
	reactions: {
		user: mongoose.Types.ObjectId;
		emoji: string;
	}[];
}

const ChatSchema = new Schema(
	{
		event: { type: Schema.Types.ObjectId, ref: "Event", required: true },
		user: { type: Schema.Types.ObjectId, ref: "User" },
		message: String,
		reactions: [
			{
				user: { type: Schema.Types.ObjectId, ref: "User" },
				emoji: String,
			},
		],
	},
	{ timestamps: true },
);

export default mongoose.model<IChat>("Chat", ChatSchema);
