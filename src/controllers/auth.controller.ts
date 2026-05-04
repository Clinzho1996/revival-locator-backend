import bcrypt from "bcryptjs";
import { Request, Response } from "express";
import User from "../models/User";
import { generateToken } from "../utils/jwt";

export const register = async (req: Request, res: Response) => {
	const { name, email, password } = req.body;

	const existing = await User.findOne({ email });
	if (existing) return res.status(400).json({ message: "User already exists" });

	const hashed = await bcrypt.hash(password, 10);

	const user = await User.create({
		name,
		email,
		password: hashed,
	});

	res.json({ user, token: generateToken(user.id) });
};

export const login = async (req: Request, res: Response) => {
	const { email, password } = req.body;

	const user = await User.findOne({ email });
	if (!user) return res.status(400).json({ message: "Invalid credentials" });

	const isMatch = await bcrypt.compare(password, user.password);
	if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

	res.json({ user, token: generateToken(user.id) });
};
