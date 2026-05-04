import mongoose, { Schema } from "mongoose";

const ResourceSchema = new Schema({
	title: String,
	type: { type: String, enum: ["video", "audio", "podcast", "pdf"] },
	url: String,
	uploadedBy: { type: Schema.Types.ObjectId, ref: "User" },
});

export default mongoose.model("Resource", ResourceSchema);
