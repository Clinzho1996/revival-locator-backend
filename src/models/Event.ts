import mongoose, { Document, Schema } from "mongoose";

export interface IEvent extends Document {
	title: string;
	description: string;
	shortDescription: string;
	category: mongoose.Types.ObjectId;
	banner: string;
	date: Date;
	startTime: string;
	location: {
		venue: string;
		address: string;
		coordinates: [number, number]; // [lng, lat]
	};
	organizer: mongoose.Types.ObjectId;
	attendees: number;
	status: "pending" | "approved";
}

const EventSchema = new Schema(
	{
		title: String,
		description: String,
		shortDescription: String,
		category: { type: Schema.Types.ObjectId, ref: "Category" },
		banner: String,
		date: Date,
		startTime: String,
		location: {
			venue: String,
			address: String,
			coordinates: {
				type: [Number],
				index: "2dsphere",
			},
		},
		organizer: { type: Schema.Types.ObjectId, ref: "User" },
		attendees: { type: Number, default: 0 },
		status: { type: String, default: "pending" },
	},
	{ timestamps: true },
);

export default mongoose.model<IEvent>("Event", EventSchema);
