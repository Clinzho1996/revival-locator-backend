import { Request, Response } from "express";
import Category from "../models/Category";

export const createCategory = async (req: Request, res: Response) => {
	const category = await Category.create(req.body);

	return res.status(201).json({
		success: true,
		message: "Category created successfully",
		data: category,
	});
};

export const getCategories = async (_req: Request, res: Response) => {
	const categories = await Category.find();

	return res.json({
		success: true,
		message: "Categories retrieved successfully",
		data: {
			categories,
			total: categories.length,
		},
	});
};

export const updateCategory = async (req: Request, res: Response) => {
	const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
	});

	if (!category) {
		return res.status(404).json({
			success: false,
			message: "Category not found",
		});
	}

	return res.json({
		success: true,
		message: "Category updated successfully",
		data: category,
	});
};

export const deleteCategory = async (req: Request, res: Response) => {
	const category = await Category.findById(req.params.id);

	if (!category) {
		return res.status(404).json({
			success: false,
			message: "Category not found",
		});
	}

	await Category.findByIdAndDelete(req.params.id);

	return res.json({
		success: true,
		message: "Category deleted successfully",
	});
};
