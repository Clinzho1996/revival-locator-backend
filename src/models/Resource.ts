// models/Resource.ts
import mongoose, { Schema } from "mongoose";

const ResourceSchema = new Schema(
	{
		title: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			default: "",
		},
		type: {
			type: String,
			enum: ["pdf", "video", "audio", "link", "image", "document"],
			required: true,
		},
		fileUrl: {
			type: String,
			required: true,
		},
		uploadedBy: {
			type: Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
	},
	{
		timestamps: true, // Automatically adds createdAt and updatedAt
	},
);

export default mongoose.model("Resource", ResourceSchema);
