import mongoose from "mongoose";

const ForumSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
			trim: true,
		},
		content: {
			type: String,
			required: true,
		},
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		replies: [
			{
				message: {
					type: String,
					required: true,
				},
				user: {
					type: mongoose.Schema.Types.ObjectId,
					ref: "User",
					required: true,
				},
				createdAt: {
					type: Date,
					default: Date.now,
				},
			},
		],
	},
	{ timestamps: true },
);

// Prevent model overwrite in dev (VERY IMPORTANT with ts-node-dev)
const Forum = mongoose.models.Forum || mongoose.model("Forum", ForumSchema);

export default Forum;
