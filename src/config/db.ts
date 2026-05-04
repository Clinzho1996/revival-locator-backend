import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();

export const connectDB = async () => {
	try {
		await mongoose.connect(process.env.MONGO_URI as string, {
			serverSelectionTimeoutMS: 5000,
			connectTimeoutMS: 5000,
		});

		console.log("MongoDB Connected");
	} catch (err) {
		console.error("MongoDB connection failed:", err);
		process.exit(1);
	}
};
