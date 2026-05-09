// models/Testimony.ts
import mongoose, { Schema } from "mongoose";

const TestimonySchema = new Schema(
	{
		name: {
			type: String,
			required: true,
		},
		event: {
			type: String,
			required: true,
		},
		content: {
			type: String,
			required: true,
		},
		rating: {
			type: Number,
			min: 1,
			max: 5,
			default: 5,
		},
		avatar: {
			type: String,
			default: "",
		},
		likes: {
			type: Number,
			default: 0,
		},
		likedBy: [
			{
				type: Schema.Types.ObjectId,
				ref: "User",
			},
		],
		status: {
			type: String,
			enum: ["pending", "approved"],
			default: "pending",
		},
	},
	{
		timestamps: true,
	},
);

export default mongoose.model("Testimony", TestimonySchema);
