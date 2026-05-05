// controllers/resourceController.ts
import { Request, Response } from "express";
import Resource from "../models/Resource";

export const createResource = async (req: any, res: Response) => {
	try {
		const { title, description, type, fileUrl } = req.body;

		// Validate required fields
		if (!title || !type || !fileUrl) {
			return res.status(400).json({
				success: false,
				message: "Title, type, and fileUrl are required",
			});
		}

		const resource = await Resource.create({
			title,
			description: description || "",
			type,
			fileUrl,
			uploadedBy: req.user._id,
		});

		// Populate uploadedBy user info
		await resource.populate("uploadedBy", "name email");

		return res.status(201).json({
			success: true,
			message: "Resource created successfully",
			data: resource,
		});
	} catch (error) {
		console.error("Create resource error:", error);
		return res.status(500).json({
			success: false,
			message: "Failed to create resource",
		});
	}
};

export const getResources = async (_req: Request, res: Response) => {
	try {
		const resources = await Resource.find()
			.sort({ createdAt: -1 })
			.populate("uploadedBy", "name email");

		return res.json({
			success: true,
			message: "Resources retrieved successfully",
			data: {
				resources,
				total: resources.length,
			},
		});
	} catch (error) {
		console.error("Get resources error:", error);
		return res.status(500).json({
			success: false,
			message: "Failed to retrieve resources",
		});
	}
};

export const getResourceById = async (req: Request, res: Response) => {
	try {
		const resource = await Resource.findById(req.params.id).populate(
			"uploadedBy",
			"name email",
		);

		if (!resource) {
			return res.status(404).json({
				success: false,
				message: "Resource not found",
			});
		}

		return res.json({
			success: true,
			message: "Resource retrieved successfully",
			data: resource,
		});
	} catch (error) {
		console.error("Get resource error:", error);
		return res.status(500).json({
			success: false,
			message: "Failed to retrieve resource",
		});
	}
};

export const updateResource = async (req: Request, res: Response) => {
	try {
		const { title, description, type, fileUrl } = req.body;

		const resource = await Resource.findById(req.params.id);

		if (!resource) {
			return res.status(404).json({
				success: false,
				message: "Resource not found",
			});
		}

		// Update fields
		if (title) resource.title = title;
		if (description !== undefined) resource.description = description;
		if (type) resource.type = type;
		if (fileUrl) resource.fileUrl = fileUrl;

		await resource.save();
		await resource.populate("uploadedBy", "name email");

		return res.json({
			success: true,
			message: "Resource updated successfully",
			data: resource,
		});
	} catch (error) {
		console.error("Update resource error:", error);
		return res.status(500).json({
			success: false,
			message: "Failed to update resource",
		});
	}
};

export const deleteResource = async (req: Request, res: Response) => {
	try {
		const resource = await Resource.findById(req.params.id);

		if (!resource) {
			return res.status(404).json({
				success: false,
				message: "Resource not found",
			});
		}

		await Resource.findByIdAndDelete(req.params.id);

		return res.json({
			success: true,
			message: "Resource deleted successfully",
		});
	} catch (error) {
		console.error("Delete resource error:", error);
		return res.status(500).json({
			success: false,
			message: "Failed to delete resource",
		});
	}
};
