import jwt from "jsonwebtoken";
import User from "../models/User";

export const protect = async (req: any, res: any, next: any) => {
	const token = req.headers.authorization?.split(" ")[1];
	if (!token) return res.status(401).json({ message: "Unauthorized" });

	const decoded: any = jwt.verify(token, process.env.JWT_SECRET as string);
	req.user = await User.findById(decoded.id);
	next();
};

export const authorize =
	(...roles: string[]) =>
	(req: any, res: any, next: any) => {
		if (!roles.includes(req.user.role))
			return res.status(403).json({ message: "Forbidden" });
		next();
	};
