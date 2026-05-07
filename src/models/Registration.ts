// models/Registration.ts
import mongoose, { Document, Schema } from "mongoose";

export interface IRegistration extends Document {
	event: mongoose.Types.ObjectId;
	name: string;
	email: string;
	phone?: string;
	createdAt: Date;
}

const RegistrationSchema = new Schema(
	{
		event: { type: Schema.Types.ObjectId, ref: "Event", required: true },
		name: { type: String, required: true },
		email: { type: String, required: true },
		phone: { type: String },
	},
	{ timestamps: true },
);

export default mongoose.model<IRegistration>(
	"Registration",
	RegistrationSchema,
);
