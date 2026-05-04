import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
	name: string;
	email: string;
	password: string;
	role: "user" | "organizer" | "admin";
	bookmarks: mongoose.Types.ObjectId[];
}

const UserSchema = new Schema<IUser>(
	{
		name: String,
		email: { type: String, unique: true },
		password: String,
		role: { type: String, default: "user" },
		bookmarks: [{ type: Schema.Types.ObjectId, ref: "Event" }],
	},
	{ timestamps: true },
);

export default mongoose.model<IUser>("User", UserSchema);
