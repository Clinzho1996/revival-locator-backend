import { Request, Response } from "express";
import Resource from "../models/Resource";

export const createResource = async (req: any, res: Response) => {
	const resource = await Resource.create({
		...req.body,
		uploadedBy: req.user._id,
	});

	return res.status(201).json({
		success: true,
		message: "Resource created successfully",
		data: resource,
	});
};

export const getResources = async (_req: Request, res: Response) => {
	const resources = await Resource.find();

	return res.json({
		success: true,
		message: "Resources retrieved successfully",
		data: {
			resources,
			total: resources.length,
		},
	});
};

export const deleteResource = async (req: Request, res: Response) => {
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
};
