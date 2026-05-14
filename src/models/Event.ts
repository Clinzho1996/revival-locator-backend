import mongoose, { Document, Schema } from "mongoose";

export interface IEvent extends Document {
	title: string;
	description: string;
	shortDescription?: string;
	category: mongoose.Types.ObjectId;
	banner?: string;
	date: Date;
	startTime?: string;
	time?: string; // Add this for compatibility with frontend
	location: {
		venue: string;
		address: string;
		city?: string;
		state?: string;
		country?: string;
		coordinates?: [number, number]; // [lng, lat]
	};
	organizer: mongoose.Types.ObjectId;
	attendees: number;
	isFree: boolean; // Add this
	price: number; // Add this
	status: "pending" | "approved" | "rejected";
}

const EventSchema = new Schema(
	{
		title: { type: String, required: true },
		description: { type: String, required: true },
		shortDescription: { type: String },
		category: { type: Schema.Types.ObjectId, ref: "Category" },
		banner: { type: String },
		date: { type: Date, required: true },
		startTime: { type: String },
		time: { type: String }, // For frontend compatibility
		location: {
			venue: { type: String },
			address: { type: String, required: true },
			city: { type: String },
			state: { type: String },
			country: { type: String },
			coordinates: {
				type: [Number],
				index: "2dsphere",
			},
		},
		organizer: { type: Schema.Types.ObjectId, ref: "User", required: true },
		attendees: { type: Number, default: 0 },
		isFree: { type: Boolean, default: true }, // Add this
		price: { type: Number, default: 0 }, // Add this
		status: {
			type: String,
			enum: ["pending", "approved", "rejected"],
			default: "pending",
		},
	},
	{ timestamps: true },
);

export default mongoose.model<IEvent>("Event", EventSchema);
