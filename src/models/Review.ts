import mongoose, { Schema } from "mongoose";

const ReviewSchema = new Schema({
	user: { type: Schema.Types.ObjectId, ref: "User" },
	event: { type: Schema.Types.ObjectId, ref: "Event" },
	rating: Number,
	comment: String,
});

export default mongoose.model("Review", ReviewSchema);
