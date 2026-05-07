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
			default: "published",
		},
		publishedAt: {
			type: Date,
			default: Date.now,
		},
	},
	{
		timestamps: true,
	},
);

// Function to generate slug from title
function generateSlug(title: string): string {
	return title
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, "-")
		.replace(/^-|-$/g, "");
}

// Pre-save middleware to generate slug
BlogSchema.pre("save", async function (next) {
	if (this.isModified("title")) {
		let baseSlug = generateSlug(this.title);
		let slug = baseSlug;
		let counter = 1;

		// Check if slug already exists
		const existingBlog = await mongoose.models.Blog.findOne({ slug });
		if (existingBlog && existingBlog._id.toString() !== this._id?.toString()) {
			slug = `${baseSlug}-${counter}`;
			counter++;
		}

		this.slug = slug;
	}
	next();
});

export default mongoose.model("Blog", BlogSchema);
