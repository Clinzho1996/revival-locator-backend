// models/Blog.ts
import mongoose, { Schema } from "mongoose";

const BlogSchema = new Schema(
	{
		title: {
			type: String,
			required: true,
		},
		slug: {
			type: String,
			required: true,
			unique: true,
		},
		content: {
			type: String,
			required: true,
		},
		excerpt: {
			type: String,
			required: true,
		},
		featuredImage: {
			type: String,
			default: "",
		},
		category: {
			type: String,
			enum: [
				"Revival",
				"Worship",
				"Prayer",
				"Testimony",
				"Teaching",
				"Event Recap",
			],
			default: "Revival",
		},
		tags: [
			{
				type: String,
			},
		],
		author: {
			type: Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		readTime: {
			type: Number,
			default: 5,
		},
		views: {
			type: Number,
			default: 0,
		},
		likes: {
			type: Number,
			default: 0,
		},
		status: {
			type: String,
			enum: ["draft", "published"],
			default: "draft",
		},
		publishedAt: {
			type: Date,
		},
	},
	{
		timestamps: true,
	},
);

// Create slug from title before saving
BlogSchema.pre("save", function (next) {
	if (this.isModified("title") && !this.slug) {
		this.slug = this.title
			.toLowerCase()
			.replace(/[^a-z0-9]+/g, "-")
			.replace(/^-|-$/g, "");
	}
	next();
});

export default mongoose.model("Blog", BlogSchema);
