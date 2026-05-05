import mongoose, { Document, Schema } from "mongoose";

export interface ICategory extends Document {
	name: string;
}

const CategorySchema = new Schema({
	name: { type: String, required: true },
	description: { type: String },
	createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<ICategory>("Category", CategorySchema);
